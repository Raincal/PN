import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    ListView,
    Image,
    RefreshControl,
    TouchableHighlight
} from 'react-native';

import SearchBar from '../components/SearchBar';
import Detail from '../components/Detail';
import Nav from '../components/Nav';
import Modal from '../components/Modal'

const status = ["售票中", "", "", "预售中"]
var page = 1;

class Sell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            refreshing: false
        }
    }
    componentWillReceiveProps(nextProps) {
        const {activitiesList} = nextProps.activities;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(activitiesList)
        })
    }
    _openDetail(id) {
        var detailUrl = `http://m.piaoniu.com/activity/detail.html?id=${id}`;
        this.props.navigator.push({
            component: Detail,
            params: {
                url: detailUrl
            }
        })
    }
    _renderRow(rowData) {
        var statusColor;
        const city = [, '上海', '北京'];
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
            <TouchableHighlight style={styles.flex} underlayColor="#eee" onPress={() => this._openDetail(rowData.id) }>
                <View style={[styles.flex, styles.itemWrap]}>
                    <Image
                        style={styles.poster}
                        source={{ uri: rowData.poster }}
                        />
                    <View style={[styles.flex, styles.ml10, { height: 110 }]}>
                        <Text style={styles.name}>{`[${city[rowData.cityId]}]${rowData.name}`}</Text>
                        <Text style={[styles.fs10, styles.venueName]}>{rowData.venueName}</Text>
                        {rowData.lowPrice ? <View style={[styles.flex, styles.bottomWrap]}>
                            <View style={[styles.statusWrap, { borderColor: statusColor }]}>
                                <Text style={[styles.fs10, { color: statusColor }]}>{status[rowData.status - 1]}</Text>
                            </View>
                            <View style={[styles.flex, { alignItems: 'flex-end' }]}>
                                <Text style={styles.price}>
                                    <Text style={[styles.fs10, styles.fwn, { color: '#ff513c' }]}>¥ </Text>
                                    {rowData.lowPrice}
                                    <Text style={[styles.fs10, styles.fwn, { color: '#000' }]}> 起</Text>
                                </Text>
                            </View>
                        </View> : null}
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    _refresh() {
        this.setState({ refreshing: true })
        const { fetchActivities, refreshActivities, loadMore} = this.props;
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
        const {canLoadMore} = this.props.activities;
        const {loadMore} = this.props;
        if (!canLoadMore) {
            loadMore()
        };
    }
    _onEndReached() {
        const {canLoadMore} = this.props.activities;
        const {loadMore} = this.props;
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
    },
    itemWrap: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    poster: {
        width: 82,
        height: 110,
        resizeMode: 'contain',
        borderRadius: 5
    },
    ml10: {
        marginLeft: 10
    },
    name: {
        fontSize: 14,
        color: '#212121'
    },
    fs10: {
        fontSize: 10
    },
    venueName: {
        color: '#aaaaaa',
        marginTop: 15
    },
    fwn: {
        fontWeight: 'normal'
    },
    price: {
        color: '#ff513c',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 10
    },
    statusWrap: {
        borderWidth: 1,
        borderRadius: 3,
        padding: 2
    },
    bottomWrap: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
})

export default Sell;