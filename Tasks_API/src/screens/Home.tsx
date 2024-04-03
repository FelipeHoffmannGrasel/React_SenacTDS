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
import * as SQLite from "expo-sqlite";

const Home = () => {
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [taskInput, setTaskInput] = useState("");
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    function openDatabase() {
        const db = SQLite.openDatabase("db.db");
        return db
    }

    const db = openDatabase();

    // Função para recuperar tarefas de AsyncStorage
    const getTasks = async () => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from tasks where completed = 0;`,
                [],
                (_, { rows: { _array } }) => {
                    setTaskList(_array)
                }
            )
        })
    };

    const getTasksByCategory = (category: string) => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from tasks where completed = 0 and category = ?;`,
                [category],
                (_, { rows: { _array } }) => {
                    setTaskList(_array);
                }
            )
        })
    }

    const getCompletedTasks = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from tasks where completed = 1;`,
                [],
                (_, { rows: { _array } }) => {
                    setTaskList(_array);
                }
            )
        })
    }

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists tasks (id integer primary key not null, completed int, title text, category text)"
            )
        })
        getTasks();
    }, []);

    // Função para adicionar uma nova tarefa
    const handleAddTask = () => {
        if (taskInput !== "" && categoryValue) {
            db.transaction((tx) => {
                tx.executeSql(
                    `insert into tasks (completed, title, category) values (0, ?, ?)`,
                    [taskInput, categoryValue], 
                )
                tx.executeSql(
                    `select * from tasks where completed = 0;`,
                    [],
                    (_, { rows: { _array } }) => {
                        setTaskList(_array)
                    }
                )
            })
        }

        setTaskInput("");
        setCategoryValue(null);
    };

    // Função para remover uma tarefa
    const handleRemoveTask = (id: number) => {
        db.transaction((tx) => {
            tx.executeSql(`delete from tasks where id = ?;`, [id])
            tx.executeSql(
                `select * from tasks where completed = 0;`,
                [],
                (_, { rows: { _array } }) => {
                    setTaskList(_array);
                }
            )
        })
    };

    // Função para marcar uma tarefa como concluída
    const handleDoneTask = (id: number) => {
        db.transaction((tx) => {
            tx.executeSql(`update tasks set completed = ? where id = ?`, [1, id])
            tx.executeSql(
                `select * from tasks where completed = 0;`, 
                [],
                (_, { rows: { _array } }) => {
                    setTaskList(_array);
                })
        })
    };

    // Função para filtrar tarefas por categoria
    const handleSelectedCategory = (type: string) => {
        setSelectedCategory(type);
        switch (type) {
            case 'all':
                getTasks();
                break;
            case 'done':
                getCompletedTasks();
                break;
            default:
                getTasksByCategory(type);
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
