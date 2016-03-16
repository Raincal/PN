import React,
{
    Text,
    Component,
    WebView
} from 'react-native';
import Home from '../pages/Home';

class Detail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <WebView source={{uri: this.props.url}}/>
        )
    }
}

export default Detail;