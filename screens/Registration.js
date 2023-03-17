import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, HelperText, TextInput, Provider as PaperProvider } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import styles from '../styles/styles';

export default function Registration() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
    const confirmation = (password, confirmPassword) => {
        if (password === confirmPassword) return true
        else return false
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <KeyboardAvoidingView>
                    <Text style={styles.header} > Register </Text>
                    <TextInput mode='outlined' style={styles.textInput} label='Email' value={email} onChangeText={text => setEmail(text)} activeUnderlineColor="#0074B7" outlineColor='#0074B7' activeOutlineColor='#0074B7' />
                    <HelperText type='error' visible={emailValidation(email)} > Please provide valid email address </HelperText>
                    <TextInput mode='outlined' style={styles.textInput} label='Password' value={password} onChangeText={text => setPassword(text)} activeUnderlineColor="#0074B7" outlineColor='#0074B7' activeOutlineColor='#0074B7' />
                    <HelperText type='error' visible={passwordValidation(password)} > Password should contain at least 8 characters </HelperText>
                    <TextInput mode='outlined' style={styles.textInput} label='Confirm Password' value={confirmPassword} onChangeText={text => setConfirmPassword(text)} activeUnderlineColor="#0074B7" outlineColor='#0074B7' activeOutlineColor='#0074B7' />
                    <HelperText type='error' visible={passwordValidation(confirmPassword)} > Password should contain at least 8 characters </HelperText>
                    <Button icon={'login'} mode='contained' buttonColor='#003B73' accessible={!(emailValidation && passwordValidation && confirmation)} onPress={() => confirmation(password, confirmPassword) ? alert('Registration successful!') : alert('Registration failed!')} >Register</Button>
                </KeyboardAvoidingView>
            </View>
        </PaperProvider>
    )
}
