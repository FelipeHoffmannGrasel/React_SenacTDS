import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { TaskContext } from '../contexts/TaskContext';

const TaskDetails: React.FC = () => {
    const {takePhoto, pickImage, images} = useContext(TaskContext)
  const route = useRoute<any>();
  const { id } = route.params;

  return (
    <View>
      <Text>Task ID: {id}</Text>
      <TouchableOpacity onPress={() => takePhoto(id)}>
        <Text>Tirar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pickImage(id)}>
        <Text>Escolher da Galeria</Text>
      </TouchableOpacity>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: `data:image/jpeg;base64,${item}` }}
          />
        )}
      />
    </View>
  );
};

export default TaskDetails;