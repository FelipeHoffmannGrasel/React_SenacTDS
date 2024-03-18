import { View, Text, StyleSheet, FlatList } from "react-native"
import Card from "../components/Card";
import Header from "../components/Header";

const Home = () => {
    const users = [
        {
            id: '1',
            name: 'bla',
            job: 'blabla',
        },
        {
            id: '2',
            name: 'blabla',
            job: 'bla',
        }
    ]

    return (
        <View>
            <Header name='Fulano' job='Developer' />
            <Header name='Ciclano' job='Developer' />
            <FlatList
                data={users}
                renderItem={({ item }) => <Card name={item.name} job={item.job} />}
                keyExtractor={( item ) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25
    }
})

export default Home;