import React, {Component} from 'react';
import Main from '../pages/Main';
import MainIOS from '../pages/Main.ios';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import * as Actions from '../redux/cities';

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCities();
    }
    
    render() {
        return (
            <Main {...this.props} />
        )
    }
}

function mapStateToProps(state) {
    const {cities} = state;
    return {
        cities
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
