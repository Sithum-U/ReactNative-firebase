import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconButton, Provider as PaperProvider } from 'react-native-paper'
import styles from '../styles/styles'
import { firebase } from '../config'
import { FlatList } from 'react-native'
import { Pressable } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

export default function GetTasks() {
    const [tasks, setTasks] = useState([]);
    const todoRef = firebase.firestore().collection('tasks');
    const navigator = useNavigation();

    // get tasks from firebase
    const getData = async () => {
        todoRef
            .onSnapshot(
                querySnapshot => {
                    const tasks = []
                    querySnapshot.forEach(doc => {
                        const { title, description } = doc.data()
                        tasks.push({
                            id: doc.id,
                            title,
                            description
                        })
                    })
                    setTasks(tasks)
                }
            )
    }

    // delete document from collection in firebase
    const deleteTask = (tasks) => {
        todoRef
            .doc(tasks.id)
            .delete()
            .then(() => {
                alert('Deleted successfully')
            })
            .catch(error => alert(error));
    }

    // useEffect hook is used when fetching data from the firebase database
    useEffect(() => {
        getData()
    }, []);

    return (
        <PaperProvider>
            <View style={styles.container} >
                <Text style={styles.header} >Get All Tasks</Text>
                <FlatList data={tasks} numColumns={1} renderItem={({ item }) => (
                    <Pressable style={{ backgroundColor: '#60A3D9', borderRadius: 10, marginTop: 10, padding: 10, borderColor: 'whitesmoke', borderWidth: 1 }} onPress={() => navigator.navigate("UpdateTask", { id: item.id, title: item.title, description: item.description })} >
                        <View>
                            <Text style={{ fontSize: 28, fontWeight: 'bold', alignSelf: 'center' }} > {item.title} </Text>
                            <Text style={{ fontSize: 17, fontWeight: '400' }} > {item.description} </Text>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} >
                                <FontAwesome name='edit' size={32} color='#003B73' />
                                <MaterialCommunityIcons name='delete' size={32} color='#003B73' onPress={() => deleteTask(item)} />
                            </View>
                        </View>
                    </Pressable>
                )} />
            </View>
        </PaperProvider>
    )
}