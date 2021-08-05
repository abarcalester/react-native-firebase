import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import firebase from '../database/firebase'

import Styles from './Styles'

const Login = (props) => {
    const [login, setLogin] = useState({
        correo: '',
        pass: ''
    })
    const [isVaildField, setValidField] = useState()
    const [isValidEmail, setValidEmail] = useState()
    const [isValidPass, setValidPass] = useState()
    const [passMessage, setPassMessage] = useState()

    const handleChanges = (name, value) => {
        setLogin({...login, [name]: value})
        formValidation(name, value)
    }

    const formValidation = (type=null, value) => {
        if (type === 'correo') {
            const regex = /^[a-zA-Z0-9_-]+@\w+\.[a-z]{3,}$/g
            const validEmail = regex.test(value)
            validEmail == false ? setValidEmail(validEmail) : setValidEmail(validEmail) 
        }

        if (type === 'pass') {
            value.length < 6 ? setValidPass(false) : setValidPass(true)
        }
    }

    const signIn= () => {
        const emptyValues = Object.values(login).every(field => {
            return field !== ''
        })

        if (emptyValues) {
            
            setValidField(true)
        }  else {
            setValidField(false)
            setPassMessage('Todos los campos son requeridos, prueba de nuevo')
            alert('Todos los campos son requeridos, prueba otra vez')
        }

        if (isValidEmail, isValidPass) {
            firebase.auth().signInWithEmailAndPassword(login.correo, login.pass)
            .then((userCredential) => {
                props.navigation.navigate('UserList', {
                    userId: userCredential.user.uid
                })
            })
            .catch((error) => {
                setValidField(false)
                setPassMessage('La contraseña o el correo son incorrectos, omita el mensaje e intente de nuevo')
                console.log(error);
            })
        }
    }
    
    return (
        <ScrollView>
            <View>
                <TextInput
                    placeholder="Correo eléctronico"
                    style={Styles.textInput}
                    onChangeText={(value) => { handleChanges('correo', value) }}
                />
            </View>
            {
                isValidEmail == false ?
                <View>
                    <Text style={Styles.alert}>
                        Por favor ingrese un formato de correo válido
                    </Text>
                </View> : null
            }
            <View>
                <TextInput
                    placeholder="Contraseña"
                    style={Styles.textInput}
                    secureTextEntry={true}
                    onChangeText={(value) => { handleChanges('pass', value) }}
                />
            </View>
            {
                isValidPass == false ?
                <View>
                    <Text style={Styles.alert}>
                        La contraseña debe tener una logitud mayor a 6 carácteres
                    </Text>
                </View> : null
            }
            {
                isVaildField == false ?
                <View>
                    <Text style={Styles.noalert}>
                        { passMessage }
                    </Text>
                </View> : null
            }
            <Button 
                title="Entrar"
                style={Styles.submitButtonTop}
                onPress={() => { signIn()} }
            />
            <Button 
                title="Regístrate"
                style={Styles.submitButton}
                onPress={() => {props.navigation.navigate('Register')}}
            />
        </ScrollView>
    )
}


export default Login