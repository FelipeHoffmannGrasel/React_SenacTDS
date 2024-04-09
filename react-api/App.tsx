import axios from "axios";
import { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	FlatList,
	TextInput,
	Text,
	Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "./src/components/Card";

interface Repos {
	name: string;
	description: string;
	language: string;
}

export default function App() {
	const [repositories, setRepositories] = useState<Repos[]>([]);
	const [user, setUser] = useState("");

	/*
	const getRepositories = async () => {
	    await axios
		.get("https://api.github.com/users/rafaelkasper/repos")
		    .then(function (response) {
		        setRepositories(response.data);
		});
	};
  */

	const getRepositories = async () => {
		console.log(`https://api.github.com/users/${user}/repos`);
		try {
			const response = await axios.get(
				`https://api.github.com/users/${user}/repos`
			);
			setUser("");
			setRepositories(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	/*
	useEffect(() => {
	    getRepositories();
	}, []);
    */

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<TextInput
					style={styles.input}
					onChangeText={setUser}
					value={user}
					placeholder="Digite um usuário"
				/>
				<Pressable onPress={getRepositories}>
					<Text style={styles.text}>Buscar</Text>
				</Pressable>
				<FlatList
					data={repositories}
					renderItem={({ item }) => (
						<Card
							title={item.name}
							description={item.description}
							language={item.language}
						/>
					)}
					keyExtractor={(item) => item.name}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		height: 40,
		marginTop: 50,
		borderWidth: 1,
		padding: 10,
		width: "90%",
	},
	text: {
		fontSize: 16,
		margin: 10,
		color: "#fff",
		backgroundColor: "purple",
	},
});
