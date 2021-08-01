import React from "react"
import { StyleSheet } from 'react-native'

const Styles = () => {
    return (
        StyleSheet.create({

            textInput: {
                padding: 25,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc" 
            },
            submitButton: {
                margin: 10,
                marginTop: 5,
                marginBottom: 5
            },
            submitButtonTop: {
                margin: 10,
                marginTop: 20,
                marginBottom: 5
            },
            alert: {
                paddingTop: 10,
                paddingLeft: 25,
                color: '#D22B2B'
            },
            noalert: {
                paddingTop: 10,
                paddingLeft: 25
            }
        })
    )
}

export default Styles()