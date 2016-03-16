import React,
{
    Text,
    Component,
    View,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    PixelRatio
} from 'react-native';

import navList from '../constants/navList'
const {width, height} = Dimensions.get('window');
var list;

class Modal extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const {selected} = this.props.activities;
        list = navList[selected].map((item, i) => {
            return <TouchableHighlight
                key={`${selected}${i}`}
                underlayColor="#ccc"
                style={[styles.bdb, { height: 40, flex: 1, justifyContent: 'center' }]}
                onPress={() => this.filter(i, selected) }>
                <Text
                    style={[styles.ml20]}
                    >{item}
                </Text>
            </TouchableHighlight>
        })
    }
    filter(i, selected) {
        const timeType = ['all', 'weekly', 'monthly'];
        const {fetchActivities, refreshActivities, changeCategory, changeSort, changeTime} = this.props;
        switch (selected) {
            case 'category':
                changeCategory(i);
                break;
            case 'sort':
                changeSort(i + 1);
                break;
            case 'time':
                changeTime(timeType[i]);
                break;
        }
        const {currentCategory, currentSort, currentTime} = this.props.activities;
        refreshActivities();
        fetchActivities(1, currentCategory, currentSort, currentTime);
    }
    render() {
        return (
            <View style={{ width: width, height: height, flex: 1, position: 'absolute', top: 80 }}>
                <View style={{ width: width, height: height, backgroundColor: '#000', opacity: 0.3 }}></View>
                <View style={{ flex: 1, width: width, backgroundColor: '#fff', position: 'absolute', top: 0 }}>
                    { list }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ml20: {
        marginLeft: 20
    },
    bdb: {
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#ccc'
    }
})

export default Modal;