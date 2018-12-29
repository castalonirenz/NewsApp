import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { Component } from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import { ActionButtonStyles } from "../themes/ActionButton";
export const ActionButton = props => (
   
        <TouchableOpacity 
        {...props}
        onPress={props.Touch}>
            <Icon
                {...props}
            ></Icon>
        </TouchableOpacity>
    
)