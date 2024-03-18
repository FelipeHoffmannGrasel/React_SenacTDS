import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackParamList } from "../types/Navigation"
import Product from "../screens/Product"
import Details from "../screens/Details"

const Stack = createNativeStackNavigator<StackParamList>()

export const StackRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Product" component={Product}/>
            <Stack.Screen name="Details" component={Details}/>
        </Stack.Navigator>
    )
}