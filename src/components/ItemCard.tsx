import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../types/Task";
import { categories } from "../utils/data";
import { registerRootComponent } from "expo";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

interface Props {
    task: Task;
    handleRemoveTask: (id: number) => void;
    handleDoneTask: (id: number) => void;
}

const ItemCard = ({ task, handleRemoveTask, handleDoneTask }: Props) => {
    const navigation = useNavigation<any>();
    const category = categories.filter((c) => c.value == task.category)

    const handleDelete = () => {
        Alert.alert("Tarefas", `Tem certeza que deseja excluir essa tarefa?`, 
        [
            {
                text: "Nãooooo",
                style: "cancel"
            },
            {
                text: "Simmmm",
                onPress: () => handleRemoveTask(task.id)
            }
        ])
    }

    const LeftAction = () => {
        return (
            <View style={styles.swipeLeft}>
                <MaterialIcons
                    name="done"
                    size={20}
                    color="#fff"
                    onPress={() => handleDoneTask(task.id)}
                />
            </View>
        )
    }

    const RightAction = () => {
        return (
            <View style={styles.swipeRight}>
                <MaterialIcons
                    name="delete"
                    size={20}
                    color="#fff"
                    onPress={handleDelete}
                />
            </View>
        )
    }

    const handleDetails = () => {
navigation.navigate('TaskDetails', task.id)
    }

    return (
        <TouchableOpacity onPress={handleDetails}>
        <Swipeable renderLeftActions={LeftAction} renderRightActions={RightAction}>
            <View style={styles.container}>
                <View
                    style={{
                        borderStyle: "solid",
                        height: "100%",
                        borderLeftWidth: 6,
                        borderColor: category[0].color,
                        marginRight: 10,
                    }}
                />
                <Text style={styles.title}>{ task.title }</Text>
            </View>
        </Swipeable>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        marginLeft: 10,
    },
    swipeLeft: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    swipeRight: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 20,
    },
});

export default ItemCard;
