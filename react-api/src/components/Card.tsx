import { FC } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface Props {
    title: string;
    description: string;
    language: string;
}

const Card: FC<Props> = ({ title, description, language }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>
                {description ? description : "Sem descrição"}
            </Text>
            <Text style={styles.content}>{language}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        borderRadius: 5,
        margin: 5,
        width: "95%",
        padding: 20,
        backgroundColor: "#1C1C1C",
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    content: {
        color: "#fff",
        fontSize: 16,
    },
});

export default Card;
