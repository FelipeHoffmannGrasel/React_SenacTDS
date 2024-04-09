import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Login from "../screens/Login"

export type StackParamList = {
    login: undefined;
    succefull: Login;
    failure: Login;

};

export type LoginStackProps = NativeStackScreenProps<
    StackParamList,
    'succefull'
>;
