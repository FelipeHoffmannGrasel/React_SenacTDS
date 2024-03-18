import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Product } from './product';

export type StackParamList = {
    Product: undefined;
    Details: Product;
}

export type ProductStackProps = NativeStackScreenProps<
    StackParamList, 
    "Product"
>;

export type DetailsStackProps = NativeStackScreenProps<
    StackParamList,
    "Details"
>;