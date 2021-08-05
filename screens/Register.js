import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import firebase from '../database/firebase'

import Styles from './Styles'

const Register = (props) => {
    
    const [isValidEmail, setValidEmail] = useState()
    const [isValidDate, setValidDate] = useState()
    const [isValidPass, setValidPass] = useState()
    const [isEmptyValues, setEmptyValues] = useState()

    const [register, setRegister] = useState({
        nombre: '',
        apellido: '',
        apellido2: '',
        nacimiento: '',
        correo: '',
        telefono: '',
        pass: ''
    })

    const handleChanges = (name, value) => {
        setRegister({...register, [name]: value})

        // Calling to formValidation to get updated input value
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

        if(type === 'nacimiento') {
            const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/g
            const validDate = regex.test(value)
            validDate == false ? setValidDate(validDate) : setValidDate(validDate) 
            
        }

        const emptyValue = Object.values(register).every(field => {
            return field === ''
        })
        emptyValue ? setEmptyValues(false) : setEmptyValues(true)
        
        
    }

    const createUser = () => {
        if (isValidDate === true & isValidEmail === true & isValidPass === true & isEmptyValues === true) { 
            firebase.auth().createUserWithEmailAndPassword(register.correo, register.pass)
            .then((userCredential) => {
                props.navigation.navigate('UserList', {
                    userId: userCredential.user.uid
                })
            })
            .catch(function (error) {
                let message;
                switch (error.message) {
                    case 'The email address is already in use by another account.':
                        message = 'El correo está siendo utilizado por otra cuenta.'
                        break;
                
                    default:
                        break;
                }
                alert(message)
            })
        }   
    }

    return (
        <ScrollView>
            <View>
                <TextInput
                    placeholder="Nombre"
                    style={Styles.textInput}
                    onChangeText={ (value) => { handleChanges('nombre', value) } }
                />
            </View>
            <View>
                <TextInput
                    placeholder="Primer apellido"
                    style={Styles.textInput}
                    onChangeText={ (value) => { handleChanges('apellido', value) } }
                />
            </View>
            <View>
                <TextInput
                    placeholder="Segundo apellido"
                    style={Styles.textInput}
                    onChangeText={ (value) => { handleChanges('apellido2', value) } }
                />
            </View>
            <View>
                <TextInput
                    placeholder="Fecha de nacimiento en formato dd-mm-yyyy"
                    style={Styles.textInput}
                    onChangeText={ (value) => { handleChanges('nacimiento', value) } }
                />
            </View>
            {
                isValidDate == false ?
                <View>
                    <Text style={Styles.alert}>
                        Por favor respete el formato e ingrese una fecha a partir del año 1900
                    </Text>
                </View> : null
            }
            <View>
                <TextInput
                    placeholder="Correo"
                    style={Styles.textInput}
                    onChangeText={ (value) => { handleChanges('correo', value)} }
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
                    placeholder="Teléfono"
                    style={Styles.textInput}
                    onChangeText={ (value) => { handleChanges('telefono', value) } }
                />
            </View>
            <View>
                <TextInput
                    placeholder="Contraseña"
                    style={Styles.textInput}
                    secureTextEntry={true}
                    onChangeText={ (value) => { 
                        handleChanges('pass', value) 
                    } }
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
            <Button 
                title="Registrar"
                style={Styles.submitButtonTop}
                onPress={ () => { createUser()} }
            />
            <Button 
                title="Volver"
                style={Styles.submitButton}
                onPress={() => props.navigation.navigate('Login')}
            />
        </ScrollView>
    )
}

export default Register
