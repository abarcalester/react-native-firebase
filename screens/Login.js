import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler'


import Styles from './Styles'

const Login = () => {
    return(
        <ScrollView>
            <TextInput
                placeholder="Correo eléctronico"
                style={Styles.textInput}
            />
        </ScrollView>
    )
}


export default Login