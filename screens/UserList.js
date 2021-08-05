import React, { useEffect, useState } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { ListItem, Button } from 'react-native-elements'
import firebase from '../database/firebase'

import Styles from './Styles'

const UserList = (props) => {
    const userId = props.route.params.userId
    const [listOne, setListOne] = useState([])

    useEffect(() => {
        const starCountRef = firebase.database().ref('users/' + userId + '/');
        starCountRef.on('value', (snapshot) => {
            const arrList = []
            snapshot.forEach(function(childSnapshot) {
                const childData = childSnapshot.val();
                arrList.push(childData)
                
            });
            setListOne(arrList)
        });
    }, [])
    return (
        <ScrollView>
            {
                listOne.map((onList) => {
                    return (
                        <ListItem 
                            key={onList.id}
                            bottomDivider
                        >
                            <ListItem.Chevron/>
                            <ListItem.Content>
                                <ListItem.Title>Detalle: {onList.nombre}</ListItem.Title>
                                <ListItem.Subtitle>Código: {onList.codigo}</ListItem.Subtitle>
                                <ListItem.Subtitle>Fecha: {onList.fecha}</ListItem.Subtitle>
                                <ListItem.Subtitle>Hora: {onList.hora}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }

            <Button 
                title="Crear una cita"
                style={Styles.submitButton}
                onPress={() => { 
                    props.navigation.navigate('CreationScreen', {
                        userId
                    }) 
                }}
            />
            <Button 
                title="Cerrar Sesión"
                style={Styles.submitButton}
                onPress={() => { 
                    firebase.auth().signOut()
                    .then(() => {
                        props.navigation.navigate('Login')
                    })
                    .catch(() => {
                        alert(error)
                    })
                }}
            />
        </ScrollView>
    )
}
export default UserList