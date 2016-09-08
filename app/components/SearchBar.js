import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import Home from '../pages/Home';

const SearchBar = () => (
    <View style={[styles.container]}>
        <Text style={styles.city}>上海</Text>
        <View style={styles.searchWrap}>
            <View style={styles.searchContainer}>
                <Text style={styles.placeholder}>搜索明星、演出、场馆</Text>
            </View>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#ff513c',
        justifyContent: 'center'
    },
    city: {
        width: 50,
        textAlign: 'center',
        lineHeight: 25,
        color: '#fff'
    },
    searchWrap: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5

    },
    searchContainer: {
        borderRadius: 20,
        backgroundColor: '#E03D2A',
        flex: 1,
        justifyContent: 'center',
        paddingRight: 5
    },
    placeholder: {
        marginLeft: 35,
        color: '#fff',
        fontSize: 12
    }
})

export default SearchBar;