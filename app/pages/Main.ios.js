import React, {Component} from 'react';
import {
    Text,
    TabBarIOS,
    View,
    StyleSheet
} from 'react-native';

import HomeContainer from '../containers/HomeContainer';
import SellContainer from '../containers/SellContainer';
import Sell from './Sell';
import My from './My';

const HOME_TAB = 'homeTab';
const SELL_TAB = 'sellTab';
const MY_TAB = 'myTab';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'sellTab',
        }
    }

    _renderContent(pageName) {
        var renderView;
        switch (pageName) {
            case HOME_TAB:
                renderView = <HomeContainer {...this.props}/>
                break;
            case SELL_TAB:
                renderView = <SellContainer {...this.props}/>
                break;
            case MY_TAB:
                renderView = <My />
        }
        return (
            <View style={styles.pageView}>
                {renderView}
            </View>
        );
    }

    render() {
        return (
            <TabBarIOS
                tintColor="#ff513c"
                barTintColor="#fff"
                translucent={false}>
                <TabBarIOS.Item
                    title="首页"
                    icon={require('image!tab_home_n') }
                    selectedIcon={require('image!tab_home_p') }
                    selected={this.state.selectedTab === 'homeTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'homeTab',
                        });
                    } }>
                    {this._renderContent(HOME_TAB) }
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="演出"
                    icon={require('image!tab_sell_n') }
                    selectedIcon={require('image!tab_sell_p') }
                    selected={this.state.selectedTab === 'sellTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'sellTab',
                        });
                    } }>
                    {this._renderContent(SELL_TAB) }
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="我的"
                    icon={require('image!tab_my_n') }
                    selectedIcon={require('image!tab_my_p') }
                    selected={this.state.selectedTab === 'myTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'myTab',
                        });
                    } }>
                    {this._renderContent(MY_TAB) }
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }
}

var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
    pageView: {
        flex: 1,
    }
});

export default Main;