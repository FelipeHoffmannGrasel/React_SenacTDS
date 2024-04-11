import { SafeAreaView } from "react-native-safe-area-context"
import { Text, TouchableOpacity, View ,StyleSheet, TextInput, Alert} from "react-native"

import DropDownPicker from "react-native-dropdown-picker"
import React, { useContext, useState } from "react"
import { categories } from "../utils/data"
import { Feather } from '@expo/vector-icons';
import { TaskContext } from "../contexts/TaskContext"
import DateTimePicker from "@react-native-community/datetimepicker";
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const Criar = () => {

  const {
    taskInput,
    setTaskInput,
    setCategoryValue,
    categoryValue,
    handleAddTask,
    setOpen,
    open,
    dateInput,
    setDateInput,
  } = useContext(TaskContext);

  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDateInput(currentDate);
  };

  
  const showMode = (currentMode: React.SetStateAction<"date" | "time">) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

 
    return(

        <SafeAreaView style={{ backgroundColor: '#252525', flex: 1 }}>
            {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateInput}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
            <View style={styles.textinput}>
        <TextInput
          style={styles.input}
          onChangeText={setTaskInput}
          value={taskInput}
          placeholder='Vamos Comecar?'
          placeholderTextColor={'#252525'}
        />
        <View
          style={{ flexDirection: "row", width: "85%", alignItems: "center" }}
        >
          <DropDownPicker 
            open={open}
            value={categoryValue}
            items={categories.filter(
              (c) => c.value != "all" && c.value != "done"
            )}
            setOpen={setOpen}
            setValue={setCategoryValue}
            placeholder="Escolha uma categoria"
            theme="LIGHT"
            placeholderStyle={{
              color: '#252525',
              fontSize: 18,
              fontWeight: "800",
              fontFamily: 'LuckiestGuy_400Regular', 


            }}
            listItemLabelStyle={{
              color: '#252525',
              fontSize: 18,
              paddingLeft: 15,
            }}
            dropDownContainerStyle={{
              backgroundColor: '#252525',
            }}
            selectedItemContainerStyle={{
              backgroundColor: '#252525',
            }}
            selectedItemLabelStyle={{
              fontWeight: "bold",
              fontSize: 18,
              color: '#252525',
            }}
            labelStyle={{ 
              color: '#252525', 
              fontSize:18,
              fontWeight: "800",
              
            }}
            style={{
              backgroundColor: "transparent",
              borderColor: '#252525',
            }} textStyle={{ 
              fontSize: 18,
              fontFamily: 'LuckiestGuy_400Regular', 
              color: 'black'
            }}
            

            ArrowDownIconComponent={() => (
              <Feather name="arrow-down-circle" size={24} color="white" />
            )}
            ArrowUpIconComponent={() => (
              <Feather name="arrow-up-circle" size={24} color="white" />
            )}zIndex={999}
          

            
          />

      
          <Foundation style={{paddingLeft:15}} name="calendar" size={60} color="white"  onPress={showDatePicker} />
          
        </View>
        <Ionicons name="add-circle-sharp" size={60} color="green" style={{alignSelf:'center'}} onPress={() => {
            
          Alert.alert('Tudo certo')
          handleAddTask('')} 
        }
          />
      
      </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textinput: {
      width: "95%",
      alignSelf: "center",
      gap: 15,
      marginBottom: 10,
    }, input: {
      borderBottomWidth: 1,
      borderLeftWidth: 4,
      borderRightWidth: 4,
      borderTopWidth: 1,
   
      width: "100%",
      paddingLeft: 15,
      borderRadius: 4,
      height: 50,
      borderColor: '#252525',
      borderStyle: "solid",
  
      fontWeight: "800",
      fontSize: 17,
      color: '#252525',
    }
  });


export default Criar