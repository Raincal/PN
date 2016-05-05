import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Platform,
    Dimensions
} from 'react-native';

import MainContainer from '../containers/MainContainer';

const {height, width} = Dimensions.get('window');

class Splash extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {navigator} = this.props;
        if (Platform.OS == 'android') {
            setTimeout(() => {
                navigator.resetTo({
                    component: HomeContainer,
                    name: 'Home'
                })
            }, 2000);
        }
    }

    render() {
        if (Platform.OS == 'ios') {
            return (
                <MainContainer {...this.props}/>
            )
        }
        return (
            <Image
                style={{ flex: 1, width: width, height: height }}
                source={require('../img/splash.png') }
                />
        );
    }
}

export default Splash;
