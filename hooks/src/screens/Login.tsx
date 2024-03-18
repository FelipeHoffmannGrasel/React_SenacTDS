import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
		if (username === "" && password === "")
			Alert.alert("Alerta", "Você não está logado!", [
				{ text: "OK", onPress: () => console.log("OK") },
			]);
	}, []);

    const login = async () => {        
		if (username === "User" && password === "123") {
			const userData = {
				username: username,
				password: password,
			};

			const userJson = JSON.stringify(userData);

			await AsyncStorage.setItem("user", userJson);

			Alert.alert("Alerta", "Você está logado!", [
				{ text: "OK", onPress: () => console.log(userJson) },
			]);
		} else {
			Alert.alert("Alerta", "Prencha os dados corretamente!", [
				{ text: "OK", onPress: () => console.log("Error") },
			]);
		}
	};

    return (
        <View>
            <Text style={styles.title}>LOGIN</Text>

            <TextInput 
            style={styles.textInput}
            onChangeText={setUsername}
            value={username}
            placeholder="Insira seu nome:"
            />

            <TextInput 
            style={styles.textInput}
            onChangeText={setPassword}
            value={password}
            placeholder="Insira sua senha:"
            secureTextEntry
            />

            <Pressable style={styles.pressable} onPress={login}>
                <Text style={styles.text}>Confirma</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textInput: {
        height: 40, 
        width: 200, 
        marginBottom: 10, 
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    }, 
    pressable: {
        padding: 10, 
        width: 80,
        backgroundColor: 'blue', 
        borderRadius: 5,
        alignSelf: 'center'
    },
    text: {
        color: 'white'
    },
    title: {
        color: 'black',
        fontSize: 25,
        margin: 10,
        textAlign: 'center'
    }
})

export default Login;