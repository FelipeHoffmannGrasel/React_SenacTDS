import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TaskContextProvider } from './src/contexts/TaskContext'; // Importe o provedor do contexto de tarefas
import { Routes } from './src/routes';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <RootSiblingParent>
                <TaskContextProvider>                   
                    <Routes />
                </TaskContextProvider>
            </RootSiblingParent>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
