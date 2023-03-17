import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import styles from '../styles/styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config'

export default function Dashboard() {
    const navigation = useNavigation();
    const todoRef = firebase.firestore().collection('tasks');
    const [tasks, setTasks] = useState([]);

    const getTasks = todoRef.onSnapshot(snapshot => {
        const tasks = []
        snapshot.forEach(doc => {
            tasks.push(doc.data())
        })
        setTasks(tasks);
    })

    useEffect(() => {
        getTasks
    }, [])
    return (
        <PaperProvider>
            <View style={styles.dashboard_container} >
                <View style={{ display: 'flex', flexDirection: 'row' }} >
                    <MaterialCommunityIcons name="view-dashboard" size={52} color="#60A3D9" />
                    <Text style={styles.header}> Dashboard</Text>
                    <Text> {tasks.length} </Text>
                </View>
                {/* <Button icon='view-dashboard' mode='contained' buttonColor='#003B73' >Dashboard</Button> */}
                <Button icon='view-list' mode='contained' buttonColor='#003B73' onPress={() => navigation.navigate('GetTasks')} >Task List</Button>
                <Button icon='playlist-plus' mode='contained' buttonColor='#003B73' onPress={() => navigation.navigate('AddTask')} >Add Task</Button>
                <Button icon='playlist-remove' mode='contained' buttonColor='#003B73' >Delete Tasks</Button>
                <Button icon='playlist-edit' mode='contained' buttonColor='#003B73' >Edit Tasks</Button>
            </View>
        </PaperProvider>
    )
}
