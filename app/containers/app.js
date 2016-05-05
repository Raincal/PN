import React, {Component} from 'react';
import {
    Platform,
    BackAndroid,
    Navigator,
    StyleSheet
} from 'react-native';

import Splash from '../pages/Splash';

class App extends Component {
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    onBackAndroid = () => {
        const nav = this.navigator;
        const routers = nav.getCurrentRoutes();
        if (routers.length > 1) {
            nav.pop();
            return true;
        }
        return false;
    };
    initialRoute = {
        component: Splash,
    };
    configureScene() {
        if (Platform.OS === 'ios') {
            return Navigator.SceneConfigs.PushFromRight;
        }
        return Navigator.SceneConfigs.FloatFromBottomAndroid;
    }
    renderScene(route, navigator) {
        const Component = route.component;

        return (
            <Component {...route.params} navigator={navigator} />
        );
    }
    render() {
        return (
            <Navigator
                ref={nav => { this.navigator = nav; } }
                style={styles.mt20}
                initialRoute={this.initialRoute}
                configureScene={() => this.configureScene() }
                renderScene={(route, navigator) => this.renderScene(route, navigator) }
                />
        );
    }
}

const styles = StyleSheet.create({
    mt20: {
        marginTop: Platform.OS == "ios" ? 20 : 0
    }
})

export default App;