import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Sell from '../pages/Sell';

import * as Actions from '../redux/activities';

class SellContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { fetchActivities } = this.props;
        fetchActivities(1);
    }
    render() {
        return (
            <Sell {...this.props}/>
        )
    }
}

function mapStateToProps(state) {
    const {activities, cities} = state;
    return {
        activities,
        cities
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SellContainer);