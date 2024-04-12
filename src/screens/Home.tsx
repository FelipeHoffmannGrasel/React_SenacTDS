import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../contexts/UserContext";
import { Task } from "../types/Task";
import { FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import CategoryItem from "../components/CategoryItem";
import ItemCard from "../components/ItemCard";
import { categories } from "../utils/data";

const Home = () => {
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [taskInput, setTaskInput] = useState("");
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    // Função para salvar tarefas em AsyncStorage
    const storeTasks = async (tasks: Task[]) => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Error storing tasks:', error);
        }
    };

    // Função para recuperar tarefas de AsyncStorage
    const getTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks !== null) {
                setTaskList(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error('Error retrieving tasks:', error);
        }
    };

    // Função para chamar getTasks e recuperar os valores
    const getData = async () => {
        await getTasks();
    };

    useEffect(() => {
        getData();
    }, []);

    // Função para adicionar uma nova tarefa
    const handleAddTask = () => {
        if (taskInput.trim() !== "") {
            const newTaskList = [...taskList];
            const newTask: Task = {
                id: Date.now().toString(), // Gera um ID único para a nova tarefa
                title: taskInput,
                completed: false,
                category: categoryValue || "uncategorized" // Define a categoria como "uncategorized" se não houver categoria selecionada
            };
            newTaskList.push(newTask);
            storeTasks(newTaskList);
            getData(); // Atualiza a lista de tarefas
            setTaskInput(""); // Limpa o input
        }
    };

    // Função para remover uma tarefa
    const handleRemoveTask = (id: string) => {
        const filtered = taskList.filter(task => task.id !== id);
        storeTasks(filtered);
        getData(); // Atualiza a lista de tarefas
    };

    // Função para marcar uma tarefa como concluída
    const handleDoneTask = (id: string) => {
        const clonedList = [...taskList];
        const index = clonedList.findIndex(task => task.id === id);
        if (index !== -1) {
            clonedList[index].completed = true;
            storeTasks(clonedList);
            getData(); // Atualiza a lista de tarefas
        }
    };

    // Função para filtrar tarefas por categoria
    const handleSelectedCategory = (type: string) => {
        setSelectedCategory(type);
        switch (type) {
            case 'all':
                setFilteredTasks(taskList.filter(task => !task.completed));
                break;
            case 'done':
                setFilteredTasks(taskList.filter(task => task.completed));
                break;
            default:
                setFilteredTasks(taskList.filter(task => task.category === type));
                break;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new task..."
                    value={taskInput}
                    onChangeText={setTaskInput}
                />
                <DropDownPicker
                    // style={styles.dropdown}
                    open={open}
                    value={categoryValue}
                    items={categories.filter(
                        (c) => c.value !== "all" && c.value !== "done"
                    )}
                    setOpen={setOpen}
                    setValue={setCategoryValue}
                    placeholder="Escolha uma categoria"
                    theme="DARK"
                    placeholderStyle={{
                        color: "#ccc",
                        fontSize: 16,
                    }}
                    listItemLabelStyle={{
                        color: "#fff",
                        fontSize: 16,
                        paddingLeft: 15,
                    }}
                    dropDownContainerStyle={{
                        backgroundColor: "#11212D",
                    }}
                    selectedItemContainerStyle={{
                        backgroundColor: "#1c2541",
                    }}
                    selectedItemLabelStyle={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#fff",
                    }}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                    <FontAwesome5 name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.categoryList}>
                <FlatList
                    data={categories}
                    horizontal
                    renderItem={({ item }) => (
                        <CategoryItem
                            category={item}
                            selectedCategory={selectedCategory}
                            handleSelectCategory={handleSelectedCategory}                         
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            <FlatList
                data={filteredTasks}
                renderItem={({ item }) => (
                    <ItemCard
                        task={item}
                        handleDoneTask={handleDoneTask}
                        handleRemoveTask={handleRemoveTask}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    addButton: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: 40,
        height: 40,
    },
    categoryList: {
        marginBottom: 20,
    },
});

export default Home;
