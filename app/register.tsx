import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState<string | null>(null);

  // Abre la cámara y guarda la imagen seleccionada

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Debes aceptar permisos de cámara");

      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Guarda el usuario en almacenamiento local
  const handleRegister = async () => {
    // Validar que ningún campo esté vacío
    if (
      !username.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim()
    ) {
      Alert.alert("Campos incompletos", "Todos los campos son obligatorios");

      return;
    }

    // Cifrado basico de contrasena
    const encryptedPassword = btoa(password);

    const user = {
      username,
      email,
      phone,
      password: encryptedPassword,
      image,
    };

    await AsyncStorage.setItem("user", JSON.stringify(user));

    Alert.alert("Éxito", "Usuario registrado correctamente");

    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create{"\n"}Account</Text>

      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.plus}>+</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Phone number"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCD8C3",
    paddingTop: 80,
  },

  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#6F7751",
    marginLeft: 30,
  },

  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  placeholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  plus: {
    fontSize: 50,
    color: "#6F7751",
  },

  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },

  form: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 40,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
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
});
