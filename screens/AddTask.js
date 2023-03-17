import { View, Text, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../config'
import { Keyboard } from 'react-native';
import styles from '../styles/styles';
import { Button, HelperText, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

export default function AddTask() {
    // will be adding data to the 'tasks' collection
    const todoRef = firebase.firestore().collection('tasks');
    const [addTitle, setAddTitle] = useState('');
    const [addDescription, setAddDescription] = useState('');

    // adding a new field
    const addField = () => {
        // checking whether new field data exist
        // if addTitle.length is not larger than 0, addTitle won't be uploaded to the database
        // same goes for addDescription, as well
        if (addTitle && addTitle.length > 0 && addDescription && addDescription.length > 0) {
            // getting timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                title: addTitle,
                description: addDescription,
                createdAt: timestamp
            }
            todoRef
                .add(data)
                .then(() => {
                    // releasing the state of new field
                    setAddTitle('');
                    setAddDescription('');
                    // releasing the keyboard
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    // showing an alert containing the error
                    alert(error);
                })
        }
    }

    const titleValidity = () => {
        if (addTitle.length == 0)
            return true
        else
            return false
    }
    const descriptionValidity = () => {
        if (addTitle.length == 0)
            return true
        else
            return false
    }

    return (
        <PaperProvider>
            <View style={styles.container} >
                <Text style={styles.header} >Add New Task</Text>
                <KeyboardAvoidingView>
                    <TextInput mode='outlined' multiline={true} style={[styles.textInput]} label='Title' onChangeText={(text) => setAddTitle(text)} value={addTitle} outlineColor='#0074B7' activeOutlineColor='#0074B7' />
                    <HelperText type='error' visible={titleValidity()} > Please add a valid title for the task </HelperText>
                    <TextInput mode='outlined' multiline={true} style={[styles.textInput]} label='Description' onChangeText={(text) => setAddDescription(text)} value={addDescription} outlineColor='#0074B7' activeOutlineColor='#0074B7' />
                    <HelperText type='error' visible={descriptionValidity()} > Please add a valid description for the task </HelperText>
                    <Button icon={'plus'} style={{ marginHorizontal: 40 }} mode='contained' buttonColor='#003B73' onPress={addField} > Add Task </Button>
                </KeyboardAvoidingView>
            </View>
        </PaperProvider>
    )
}