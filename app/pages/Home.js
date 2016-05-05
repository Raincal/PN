import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet
} from 'react-native';

import SearchBar from '../components/SearchBar';
import Slider from '../components/Slider';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, marginBottom: 42 }}>
                <SearchBar />
                <ScrollView>
                    <Slider banner={this.props.banner}/>
                </ScrollView>
            </View>
        )
    }
}

export default Home;