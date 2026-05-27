import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { CartItem, productImages } from "../data/products";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Obtiene los productos guardados previamente en el carrito
  const loadCart = async () => {
    const raw = await AsyncStorage.getItem("cart");
    const cart: CartItem[] = raw ? JSON.parse(raw) : [];
    setCartItems(cart);
  };

  // Carga el carrito cuando la pantalla se abre
  useEffect(() => {
    loadCart();
  }, []);

  // Guarda los cambios del carrito en AsyncStorage
  const saveCart = async (items: CartItem[]) => {
    setCartItems(items);
    await AsyncStorage.setItem("cart", JSON.stringify(items));
  };

  // Aumenta o disminuye la cantidad de productos en el carrito
  const changeQuantity = async (id: string, type: "add" | "remove") => {
    const updated = cartItems
      .map((item) => {
        if (item.id !== id) return item;

        const nextQuantity =
          type === "add" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: nextQuantity };
      })
      .filter((item) => item.quantity > 0);

    await saveCart(updated);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0,
  );

  // Valida el carrito y genera la orden de compra
  const handleOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert("Carrito vacío", "Agrega productos antes de continuar");
      return;
    }

    Alert.alert("Orden creada", "Tu pedido fue generado correctamente");
    saveCart([]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Order</Text>

      <Text style={styles.section}>Cart</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No products added yet</Text>
        </View>
      ) : (
        cartItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={productImages[item.imageKey]} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subtitle}>{item.promoPrice}</Text>

              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => changeQuantity(item.id, "remove")}
                >
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyNumber}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => changeQuantity(item.id, "add")}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.itemTotal}>
              ${(item.finalPrice * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))
      )}

      <View style={styles.summary}>
        <Text style={styles.section}>Payment</Text>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  content: {
    paddingTop: 50,
    paddingHorizontal: 18,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#4C4C4C",
    textAlign: "center",
    marginBottom: 18,
  },
  section: {
    fontSize: 20,
    fontWeight: "800",
    color: "#4C4C4C",
    marginTop: 10,
    marginBottom: 12,
  },
  emptyBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: "#777",
    fontSize: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#4C4C4C",
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#6F7751",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginTop: -1,
  },
  qtyNumber: {
    width: 28,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#4C4C4C",
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "800",
    color: "#4C4C4C",
    minWidth: 70,
    textAlign: "right",
  },
  summary: {
    marginTop: 18,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4C4C4C",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#6F7751",
  },
  orderButton: {
    backgroundColor: "#6F7751",
    paddingVertical: 16,
    borderRadius: 18,
    marginBottom: 12,
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 14,
    borderRadius: 18,
  },
  backButtonText: {
    color: "#4C4C4C",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
});
