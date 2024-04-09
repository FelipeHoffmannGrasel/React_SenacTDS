import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "../screens/User";
import Home from "../screens/Home";
import { colors } from "../Colors/colors";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity,Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import Criar from "../screens/AddTask";
import React from "react"
import TaskDetails from "../screens/TaskDetails";

const Stack = createNativeStackNavigator();

export const HomeRoutes = () => {

  const navigation = useNavigation<any>()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: { 
            backgroundColor: '#252525',
            
          }, 
          
          headerTitleStyle: { color: 'white' }, 

          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                
                navigation.navigate('Criar');
              }}
              style={{ marginRight: 15 }}
            >
            <Text style={{color:'white'}}>Criar</Text>
            </TouchableOpacity>
          ),
         
        }}  
        
        
      />
       <Stack.Screen
        name="Criar"
        component={Criar}
        options={{
          headerTitle: "Criar",
          headerTintColor:'white',
          headerStyle: {
            backgroundColor: colors.cor2,
          },
        }}
      />

      <Stack.Screen
        name="Detalhes"
        component={TaskDetails}
        options={{
          headerTitle: "Detalhes",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: colors.cor2
          }
        }}
        /> 
    </Stack.Navigator>

  );
};

const Tab = createBottomTabNavigator();

export const AppRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: colors.cor3,
        tabBarInactiveBackgroundColor: colors.cor2,
      }}
    >
      <Tab.Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="home" size={30} color={colors.cor6} />
          ),
          headerTransparent: true,
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="person" size={30} color={colors.cor6} />
          ),
          headerTransparent: true,
        }}
      />
    </Tab.Navigator>
  );
};