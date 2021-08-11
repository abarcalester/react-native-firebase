import React, { useEffect, useState } from 'react'
import { ScrollView, View, TextInput, Text} from 'react-native'
import { Button } from 'react-native-elements'
import firebase from '../database/firebase'

import Styles from './Styles'

const CreationScreen = (props) => {
    let arrDuplicatesInDate = [] 
    let arrDuplicatesInTime = [] 

    const [state, setState] = useState({
        nombre: '',
        codigo: '',
        fecha: '',
        hora: ''
    })
    const [isValidName, setValidName] = useState()
    const [isValidCode, setValidCode] = useState()
    const [isValidDate, setValidDate] = useState()
    const [isValidHour, setValidHour] = useState()
    const [inDate, setInDate] = useState()
    const [inTime, setInTime] = useState()
    const [duplicate, setDuplicate] = useState()
    

    const handleChanges = (name, value) => {
        setState({...state, [name]: value})
        formValidation(name, value)
    }

    const formValidation = (type=null, value) => {
        if (type === 'nombre') {
            const regex = /[a-zA-Z0-9_-]{5,}/g
            const validRegex = regex.test(value)
            validRegex == false ? setValidName(validRegex) : setValidName(validRegex) 
        }

        if (type === 'codigo') {
            const regex = /^[1-9]+0?$/g
            const validRegex = regex.test(value)
            validRegex == false ? setValidCode(validRegex) : setValidCode(validRegex) 
        }

        if(type === 'fecha') {
            const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/g
            const validDate = regex.test(value)
            !validDate ? setValidDate(validDate) : setValidDate(validDate) 

            // Encontrar duplicados en las lista descargada del servidor sobre los objetos, con respecto a la fechas y hora
            const someInDate = arrDuplicatesInDate.some(arrDuplicatesInDate => {
                return arrDuplicatesInDate === value
            })

            !someInDate ? setInDate(someInDate) : setInDate(someInDate)
        }

        if(type === 'hora') {
            const regex =  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/g
            const validHour = regex.test(value)
            !validHour? setValidHour(validHour) : setValidHour(validHour) 

            // Encontrar duplicados en las lista descargada del servidor sobre los objetos, con respecto a la fechas y hora
            const someInTime = arrDuplicatesInTime.some(arrDuplicatesInTime => {
                return arrDuplicatesInTime === value
            })
            !someInTime ? setInTime(someInTime) : setInTime(someInTime)
        }
    }

    const verifyDuplicates  = () => {
        inDate === true & inTime === true ? setDuplicate(true) : setDuplicate(false)
    }


    const addToList = () => {

        if (
            isValidName === true & isValidCode === true & 
            isValidDate === true & isValidHour === true
        ) {
            props.navigation.navigate('UserList')
        }
    }

    return (
        <ScrollView>
            <View>
                <TextInput
                    placeholder="Nombre del servicio"
                    style={Styles.textInput}
                    onChangeText={(value) => { handleChanges('nombre', value) }}
                />
            </View>
            {
                isValidName == false ?
                <View>
                    <Text style={Styles.alert}>
                        Indique un nombre mayor a una logintud de 5 sin utilizar carácteres especiales, solo (0-9_)
                    </Text>
                </View> : null
            }
            <View>
                <TextInput
                    placeholder="Código del servicio"
                    style={Styles.textInput}
                    onChangeText={ (value) => { handleChanges('codigo', value) }}
                />
            </View>
            {
                isValidCode == false ?
                <View>
                    <Text 
                        style={Styles.alert}
                    >
                        Solo se permiten las cifras númericas, recuerde que es un código de servicio
                    </Text>
                </View> : null
            }
            <View>
            </View>
            <View>
                <TextInput
                    placeholder="Fecha de nacimiento en formato dd-mm-yyyy"
                    style={Styles.textInput}
                    onChangeText={ (value) => { handleChanges('fecha', value) } }
                    onBlur={() => verifyDuplicates()}
                />
            </View>
            {
                isValidDate == false ?
                <View>
                    <Text style={Styles.alert}>
                        Por favor respete el formato e ingrese una fecha cercana del año presente
                    </Text>
                </View> : null
            }
            <View>
                <TextInput
                    placeholder="Hora de la cita en formato 24 horas, incluyendo el 0. Ej: 05:20"
                    style={Styles.textInput}
                    onChangeText={ (value) => { handleChanges('hora', value) } }
                    onBlur={() => verifyDuplicates()}
                />
            </View>
            {
                isValidHour == false ?
                <View>
                    <Text style={Styles.alert}>
                        Ingresa la hora en formato de 24 horas, HH:MM
                    </Text>
                </View> : null
            }
            {
                duplicate == true ?
                <View>
                    <Text style={Styles.noalert}>
                        Proceso bloqueado: no puedes tener dos citas a la misma hora y fecha, corrige y continua
                    </Text>
                </View> : null
            }
            <Button 
                title="Registrar Cita"
                style={Styles.submitButtonTop}
                onPress={() => { addToList()} }
            />
        </ScrollView>
    )
}

export default CreationScreen
