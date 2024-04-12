import { Text, TouchableOpacity } from "react-native";
import { Category } from "../types/Task";
import React from "react";

interface Props {
    category: Category;
    handleSelectCategory: (name: string) => void;
    selectedCategory: string;
}

const CategoryItem = ({ category, handleSelectCategory, selectedCategory }: Props) => {
    return (
        <TouchableOpacity onPress={() => handleSelectCategory(category.value)}>
            <Text>{ category.label }</Text>
        </TouchableOpacity>
    )
}

export default CategoryItem