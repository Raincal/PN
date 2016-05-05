import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';

import Modal from './Modal'
import navList from '../constants/navList'

class Nav extends Component {
    constructor(props) {
        super(props);
    }
    _openModal(selected) {
        const {modalShow} = this.props;
        modalShow(selected);
    }
    render() {
        const {currentCategory, currentSort, currentTime} = this.props.activities;
        let categoryTitle = navList.category[currentCategory];
        let sortTitle = navList.sort[currentSort - 1];
        let timeTitle = navList.time[['all', 'weekly', 'monthly'].indexOf(currentTime)];
        return (
            <View style={[{ height: 40, flexDirection: 'row' }]}>
                <View style={[styles.container]}>
                    <Text style={[styles.title]} onPress={(selected = 'category') => this._openModal(selected) }>{categoryTitle}</Text>
                </View>
                <View style={[styles.container]}>
                    <Text  style={[styles.title]} onPress={(selected = 'sort') => this._openModal(selected) }>{sortTitle}</Text>
                </View>
                <View style={[styles.container]}>
                    <Text  style={[styles.title]} onPress={(selected = 'time') => this._openModal(selected) }>{timeTitle}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center'
    }
})

export default Nav;