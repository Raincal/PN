import React, {Component} from 'react';
import {
    Text,
    View,
    Navigator,
    StatusBar,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Home from '../pages/Home';

import {fetchBanner} from '../redux/banner';

class HomeContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchBanner());
    }

    render() {
        return (
            <Home {...this.props}/>
        )
    }
}

function mapStateToProps(state) {
    const {banner} = state;
    return {
        banner
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps)(HomeContainer);