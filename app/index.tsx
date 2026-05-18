import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const userData = await AsyncStorage.getItem("user");

    if (!userData) {
      Alert.alert("Error", "No existe un usuario registrado");
      return;
    }

    const user = JSON.parse(userData);

    if (email === user.email && password === user.password) {
      Alert.alert("Bienvenida", "Login correcto");

      router.push("/home");
    } else {
      Alert.alert("Error", "Correo o contraseña incorrectos");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/basket.png")}
        style={styles.image}
      />

      <View style={styles.card}>
        <Text style={styles.title}>The Most Worth Grocery App</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text>Don't have an account? </Text>

          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCD8C3",
    justifyContent: "flex-end",
  },

  card: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    height: "65%",
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#6F7751",
    textAlign: "center",
    marginBottom: 40,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 30,
    fontSize: 20,
    paddingVertical: 10,
  },

  button: {
    backgroundColor: "#6F7751",
    padding: 18,
    borderRadius: 40,
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },

  signupText: {
    color: "#6F7751",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  image: {
    width: 260,
    height: 260,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 40,
  },
});
