import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, HelperText, Provider as PaperProvider, TextInput } from 'react-native-paper'
import { KeyboardAvoidingView } from 'react-native'
import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native'

export default function UpdateTask({ route }) {
    const navigator = useNavigation()
    const todoRef = firebase.firestore().collection('tasks')
    const [title, setTitle] = useState(route.params.title)
    const [description, setDescription] = useState(route.params.description)

    const updateTask = () => {
        if (title.length > 0 && description.length > 0) {
            todoRef
                .doc(route.params.id)
                .update({
                    title: title,
                    description: description,
                })
                .then(() => {
                    console.log('success!')
                    navigator.navigate('Dashboard')
                })
                .catch(error => { console.log(error.message) })
        }
    }

    const titleValidity = () => {
        if (title.length == 0)
            return true
        else
            return false
    }
    const descriptionValidity = () => {
        if (description.length == 0)
            return true
        else
            return false
    }

    return (
        <PaperProvider>
            <View style={styles.container} >
                <Text style={styles.header} >Update Task</Text>
                <KeyboardAvoidingView>
                    <TextInput mode='outlined' multiline={true} style={[styles.textInput]} label='Title' onChangeText={(text) => setTitle(text)} value={title} outlineColor='#0074B7' activeOutlineColor='#0074B7' />
                    <HelperText type='error' visible={titleValidity()} > Please add a valid title for the task </HelperText>
                    <TextInput mode='outlined' multiline={true} style={[styles.textInput]} label='Description' onChangeText={(text) => setDescription(text)} value={description} outlineColor='#0074B7' activeOutlineColor='#0074B7' />
                    <HelperText type='error' visible={descriptionValidity()} > Please add a valid description for the task </HelperText>
                    <Button icon={'plus'} style={{ marginHorizontal: 40 }} mode='contained' buttonColor='#003B73' onPress={() => { updateTask() }} > Update Task </Button>
                </KeyboardAvoidingView>
            </View>
        </PaperProvider>
    )
}