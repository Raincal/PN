import React, {Component} from 'react';
import {
    WebView
} from 'react-native';
import Home from '../pages/Home';

const Detail = ({url}) => (
    <WebView source={{ uri: url }}/>
)

export default Detail;