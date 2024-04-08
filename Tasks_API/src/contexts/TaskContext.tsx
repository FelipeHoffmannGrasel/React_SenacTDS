import { ReactNode, createContext, useState } from "react";

import { Task } from "../types/Task";
import React from "react"
import * as SQLite from "expo-sqlite";
import moment from "moment";
import * as ImagePicker from "expo-image-picker"


type TaskContextProps = {
  getTasks:() => any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getTasksByCategory: (category: string) => any;
  getCompletedTasks: () => any;
  handleAddTask: (image:string) => void;
  handleRemoveTask: (id: number ) => any;
  handleDoneTask: (id:number) => any;
  taskList: Task[];
  categoryValue: string | null;
  selectedCategory: string;
  handleSelectCategory: (type: string) => void;
  db: SQLite.SQLiteDatabase;
  taskInput: string;
  setTaskInput: (value: string) => void;
  setCategoryValue: React.Dispatch<React.SetStateAction<null>>;
  dateInput: Date;
  setDateInput: (value: Date) => void;
  getTasksByDate: (date: string) => void;

  pickImage: (id:number) => void;
  takePhoto: (id: number) => void;
  images: string[];
  setImages: (value: string[]) => void;
  taskSelected: string;
};

type TaskProviderProps = {
  children: ReactNode;
};

export const TaskContext = createContext<TaskContextProps>(
  {} as TaskContextProps
);

export const TaskContextProvider = ({ children }: TaskProviderProps) => {
  
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [categoryValue, setCategoryValue] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [taskInput, setTaskInput] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [dateInput, setDateInput] = useState(new Date());
  const [dateSelected, setDateSelected] = useState("");
  const [taskSelected, setTaskSelected] = useState("")
  const [images, setImages] = useState<string[]>([])


  
  const openDatabase = () => {
    const db = SQLite.openDatabase("db.db");
    return db;
  };

  const db = openDatabase();

    
  const getTasks = async () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 0;`,
        [],
        (_, { rows: { _array } }) => {
          setTaskList(_array)
        }
      );
    });
  };

  const getTasksByCategory = (category: string) => {
    db.transaction((tx) => {
      let sqlQuery;
      let params;
  
      if (dateSelected) {
      
        sqlQuery = `select * from tasks where completed = 0 and category = ? and date = ?;`;
        params = [category, dateSelected];
      } else {
      
        sqlQuery = `select * from tasks where completed = 0 and category = ?;`;
        params = [category];
      }
  
      tx.executeSql(
        sqlQuery,
        params,
        (_, { rows: { _array } }) => {
          setTaskList(_array);
        }
      );
    });
  };
  
  

  

  const getCompletedTasks = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 1;`,
        [],
        (_, { rows: { _array } }) => {
          setTaskList(_array)
        }
      );
    });
  };

  const getTasksByDate = (date: string) => {
    setDateSelected(date);
    const query =
      categoryValue === "all"
        ? `select * from tasks where completed = 0 and date = ?;`
        : `select * from tasks where completed = 0 and date = ? and category = ?;`;
    db.transaction((tx) => {
      tx.executeSql(
        query,
        selectedCategory === "all" ? [date] : [date, selectedCategory],
        (_, { rows: { _array } }) => {
          setTaskList(_array);
        }
      );
    });

    
  };


  const handleAddTask = async (image) => {
    if (taskInput !== "" && categoryValue) {
      db.transaction((tx) => {
        tx.executeSql(
          "insert into tasks (completed, title, category, date, images) values (0, ?, ?, ?,?)",
          [taskInput, categoryValue, moment(dateInput).format("YYYY-MM-DD"),image]
        );
        tx.executeSql(
          `select * from tasks where completed = 0;`,
          [],
          (_, { rows: { _array } }) => {
            setTaskList(_array);
          }
        );
      });
    }

    setTaskInput("");
    setCategoryValue(null);
  };

  const handleRemoveTask = (id: number) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM tasks WHERE id = ?;", [id]);
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 0;`,
        [],
        (_, { rows: { _array } }) => {
          setTaskList(_array)
        }
      );
    });
  };

  const handleDoneTask = (id: number) => {
    db.transaction((tx) => {
      tx.executeSql("UPDATE tasks SET completed = ? WHERE id = ? ;", [1, id]);
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 0;`,
        [],
        (_, { rows: { _array } }) => {
            setTaskList(_array)
        }
      );
    });
  };


  const handleSelectCategory = (type: string) => {
    setSelectedCategory(type);
    console.log("Categoria selecionada:", type);

    switch (type) {
      case "all":
        getTasks();
        break;
      case "done":
        getCompletedTasks();
        break;
      default:
        getTasksByCategory(type);
    }
  };


  const handleAddImage = async(file: string[], id: number) =>{
    db.transaction((tx)=>{
      tx.executeSql(
        "update tasks set images = ? where id = ?;",
        [file.toString(),
        id]
      );

      tx.executeSql(
        "select * from tasks where completed = 0;",
        [],
        (_, { rows: { _array }})=> {
          setTaskList(_array);
        }
      )
    })
  }

  const handleImage = (file:string, id: number) => {
    let newImages = [ ... images];
    newImages.push(file);
    setImages( newImages);
    handleAddImage(newImages, id);
  }

  const pickImage = async (id: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [16, 9],
      base64: true,
    })

    if (!result.canceled &&  result.assets[0].base64) {
      handleImage(result.assets[0].base64, id)
    }
  }

  const takePhoto = async(id: number) => {
    let data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [16, 9],
      base64: true
    });

    if(!data.canceled && data.assets[0].base64) {
      handleImage(data.assets[0].base64, id);
    }
  }

  return (
    <TaskContext.Provider
      value={{
        getTasks,
        getTasksByCategory,
        getCompletedTasks,
        handleAddTask,
        handleRemoveTask,
        handleDoneTask,
        taskList,
        categoryValue,
        handleSelectCategory,
        selectedCategory,
        db,
        taskInput,
        setTaskInput,
        setCategoryValue,
        open,
        setOpen,
        dateInput,
      setDateInput,
      getTasksByDate,
      pickImage,
      takePhoto,
      images,
      setImages,
      taskSelected
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};