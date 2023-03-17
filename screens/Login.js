import { View, Text, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Provider as PaperProvider, Button, HelperText } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core';
import styles from "../styles/styles"
import { firebase } from '../config'

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailValidation = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.length !== 0)
            return !re.test(String(email).toLowerCase());
        else
            return false
    };
    const passwordValidation = (password) => {
        if (password.length !== 0 && password.length < 8)
            return true
        else
            return false
    }

    const loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error) {
            alert(error.message)
        }
    }

    const navigation = useNavigation();

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.header} > Login </Text>
                <KeyboardAvoidingView>
                    <TextInput mode='outlined' label={'Email address'} keyboardType='email-address' placeholder='Email' value={email} onChangeText={text => setEmail(text)} style={styles.textInput} outlineColor='#0074B7' activeOutlineColor='#0074B7' />
                    <HelperText type='error' visible={emailValidation(email)} > Please provide valid email address </HelperText>
                    <TextInput mode='outlined' label={'Password'} secureTextEntry={true} placeholder='Password' value={password} onChangeText={text => setPassword(text)} style={styles.textInput} outlineColor='#0074B7' activeOutlineColor='#0074B7' />
                    <HelperText type='error' visible={passwordValidation(password)} > Password should contain at least 8 characters </HelperText>
                    <Button icon={'login'} mode='contained' buttonColor='#003B73' onPress={() => loginUser(email, password)
                        // { navigation.navigate('Registration')}
                    } >Login</Button>
                </KeyboardAvoidingView>
            </View>
        </PaperProvider>
    )
}
