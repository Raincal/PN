import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    ListView,
    Image,
    RefreshControl,
    TouchableHighlight,
    InteractionManager
} from 'react-native';

import SearchBar from '../components/SearchBar';
import ActivitiesCell from '../components/ActivitiesCell';
import Detail from '../components/Detail';
import Nav from '../components/Nav';
import Modal from '../components/Modal'

var page = 1;

class Sell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            refreshing: true
        }
    }

    componentWillReceiveProps(nextProps) {
        const {activitiesList} = nextProps.activities;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(activitiesList),
            refreshing: false
        })
    }

    _openDetail(id) {
        var detailUrl = `http://m.piaoniu.com/activity/detail.html?id=${id}`;
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                component: Detail,
                params: {
                    url: detailUrl
                }
            })
        });
    }

    _renderRow(rowData) {
        const {cities} = this.props;
        for (var i = 0, l = cities.length; i < l; i++) {
            if (cities[i].cityId == rowData.cityId) {
                var city = cities[i].cityName;
            }
        }

        var statusColor;
        switch (rowData.status) {
            case 1:
                statusColor = '#4899fe'
                break;
            case 4:
                statusColor = '#fc9149'
                break;
            default:
                break;
        }
        return (
            <ActivitiesCell
                rowData={rowData}
                city={city}
                statusColor={statusColor}
                openDetail={() => this._openDetail(rowData.id) } />
        )
    }

    _refresh() {
        this.setState({ refreshing: true })
        const {fetchActivities, refreshActivities, loadMore} = this.props;
        setTimeout(() => {
            refreshActivities();
            page = 0;
            loadMore();
            this.setState({
                refreshing: false
            });
        }, 2000);


    }

    _onScroll() {
        const {loadMore, activities: {canLoadMore}} = this.props;
        if (!canLoadMore) {
            loadMore()
        };
    }

    _onEndReached() {
        const {loadMore, activities: {canLoadMore}} = this.props;
        if (canLoadMore) {
            page++;
            const { fetchActivities } = this.props;
            const {currentCategory, currentSort, currentTime} = this.props.activities;
            fetchActivities(page, currentCategory, currentSort, currentTime);
            loadMore();
        } else {
            page = 1
        }
    }

    render() {
        return (
            <View style={[styles.flex, { marginBottom: 42 }]}>
                <SearchBar />
                <Nav {...this.props}/>
                <ListView
                    enableEmptySections={true}
                    initialListSize={10}
                    pageSize={10}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this._renderRow(rowData) }
                    onEndReached={this._onEndReached.bind(this) }
                    onEndReachedThreshold={20}
                    onScroll={this._onScroll.bind(this) }
                    refreshControl={<RefreshControl
                        onRefresh={this._refresh.bind(this) }
                        refreshing={this.state.refreshing}
                        tintColor='#aaaaaa'
                        title='Loading...'/>}
                    />
                {this.props.activities.modalShow ? <Modal {...this.props}/> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    }
})

export default Sell;