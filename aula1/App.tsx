import { View, Text, StyleSheet } from 'react-native'
import Home from './src/screens/Home';

const App = () => {
	return (
		<View style={styles.container}>
			<Home>
				
			</Home>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	}
})

export default App;