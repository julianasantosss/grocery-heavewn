import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CartItem,
  categories,
  Category,
  Product,
  productImages,
  products,
} from "../data/products";

export default function HomeScreen() {
  const [username, setUsername] = useState("User");
  const [selectedCategory, setSelectedCategory] = useState<Category>("ALL");
  const [search, setSearch] = useState("");

  // Carga user guardado en AsyncStorage para mostrar el nombre en pantalla
  useEffect(() => {
    const loadUser = async () => {
      const currentUserRaw = await AsyncStorage.getItem("currentUser");
      const fallbackUserRaw = await AsyncStorage.getItem("user");

      const raw = currentUserRaw ?? fallbackUserRaw;

      if (raw) {
        const user = JSON.parse(raw);
        setUsername(user.username || "User");
      }
    };

    loadUser();
  }, []);

  // Filtra los productos según la categoría seleccionada y el texto buscado
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "ALL" || product.category === selectedCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  // Agrega productos al carrito y aumenta la cantidad si ya existe
  const addToCart = async (product: Product) => {
    const raw = await AsyncStorage.getItem("cart");
    const cart: CartItem[] = raw ? JSON.parse(raw) : [];

    const index = cart.findIndex((item) => item.id === product.id);

    if (index >= 0) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    await AsyncStorage.setItem("cart", JSON.stringify(cart));

    router.push("/cart");
  };

  // Renderiza cada tarjeta de producto en la lista principal
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image
        source={productImages[item.imageKey]}
        style={styles.productImage}
      />

      <View style={styles.cardInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.price}>{item.promoPrice}</Text>
        <Text style={styles.smallPrice}>${item.finalPrice.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello,{"\n"}
          {username}
        </Text>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {username ? username.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>
      </View>

      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <Text style={styles.sectionTitle}>Category</Text>

      {/* Lista horizontal de categorías para filtrar productos */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        renderItem={({ item }) => {
          const selected = selectedCategory === item.key;

          return (
            <Pressable
              onPress={() => setSelectedCategory(item.key)}
              style={[
                styles.categoryButton,
                selected && styles.categoryButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selected && styles.categoryTextActive,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />

      <Text style={styles.sectionTitle}>Promos</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3EA",
    paddingTop: 50,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "800",
    color: "#4C4C4C",
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#B9C4A2",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#3C3C3C",
  },
  search: {
    backgroundColor: "#E9E9E9",
    borderRadius: 22,
    paddingHorizontal: 16,
    height: 44,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4C4C4C",
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingBottom: 15,
    gap: 10,
  },
  categoryButton: {
    backgroundColor: "#D9D9D9",
    height: 42,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
    minWidth: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryButtonActive: {
    backgroundColor: "#6F7751",
  },
  categoryText: {
    color: "#4C4C4C",
    fontWeight: "700",
    fontSize: 13,
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingBottom: 30,
    gap: 14,
  },
  card: {
    backgroundColor: "#FFF9EF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: 62,
    height: 62,
    resizeMode: "contain",
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#4C4C4C",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6F7751",
    marginTop: 2,
  },
  smallPrice: {
    fontSize: 12,
    color: "#CC5B5B",
    marginTop: 2,
  },
  addButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#6F7751",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    marginTop: -2,
  },
});
