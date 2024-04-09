import { View, Text, StyleSheet, Button } from "react-native"
import { DetailsStackProps } from "../types/Navigation";
import { Product } from "../types/product";
import { useRoute } from "@react-navigation/native";

const Details = ({ navigation }: DetailsStackProps) => {
    const route = useRoute();
    const {name, description, cost} = route.params as Product

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text>Details</Text>
                <Text>Nome: {name}</Text>
                <Text>Descrição: {description}</Text>
                <Text>Custo: {cost}</Text>
                <Button title="Voltar" onPress={() => navigation.goBack()}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        borderWidth: 3,
        padding: 20,
        width: '90%',
    },
    title: {
        fontSize: 20,
    },
    description: {

    }
})

export default Details;