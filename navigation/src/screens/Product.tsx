import { View, Text, StyleSheet, Button } from "react-native"
import { ProductStackProps } from "../types/Navigation"
import { Product as ProductType } from "../types/product"

const Product = ({ navigation }: ProductStackProps) => {
    const productItem: ProductType = {
        id: 'slkdjr453',
        name: 'Notebook',
        description: 'Macbook i9 16gb',
        cost: 12000.5
    }
    
    const goDetails = () => {
        navigation.navigate('Details', productItem)
    }

    return (
        <View style={styles.container}>
            <Text>Product</Text>
            <Button title="Detalhes" onPress={goDetails} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Product;