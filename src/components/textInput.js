import { StyleSheet, TextInput, View } from "react-native";
import { InputStyle } from "../themes/InputStyle";
import React from "react";
export const Input = props => (
 
        <TextInput
            {...props}
            style={InputStyle.Design}
        >

        </TextInput>
  
)