import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

import Swiper from 'react-native-swiper';

class Slider extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {banner} = this.props;
        var slider;
        if (banner) {
            slider = banner.map((item, idx) => {
                return (
                    <TouchableWithoutFeedback
                        key={`slider${idx}`}
                        style={styles.slide1}>
                        <Image style={styles.slide} source={{ uri: item.poster }}></Image>
                    </TouchableWithoutFeedback>
                )
            })
        } else {
            slider = [];
        }
        return (
            <Swiper
                style={styles.wrapper}
                showsButtons={false}
                autoplay={false}
                height={150}>
                { slider }
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        backgroundColor: '#9DD6EB',
    },
    slide: {
        flex: 1,
        resizeMode: Image.resizeMode.stretch
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default Slider;