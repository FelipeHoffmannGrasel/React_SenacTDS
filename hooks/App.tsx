import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import Login from './src/screens/Login';

export default function App() {
	let [fontsLoaded, fontError] = useFonts({
		Inter_900Black,
	});

	if (!fontsLoaded && !fontError) {
		return null; 
	}

	return (
		<View style={styles.container}>
			<Login/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		fontFamily: 'Inter_900Black'
	},
});
