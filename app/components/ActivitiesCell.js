import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

const status = ["售票中", "", "", "预售中"];

const ActivitiesCell = ({city, rowData, statusColor, openDetail}) => (
  <TouchableHighlight style={styles.flex} underlayColor="#eee" onPress={() => openDetail(rowData.id) }>
    <View style={[styles.flex, styles.itemWrap]}>
      <Image
        style={styles.poster}
        source={{ uri: rowData.poster }}
        />
      <View style={[styles.flex, styles.ml10, { height: 110 }]}>
        <Text style={styles.name} numberOfLines={2}>{`[${city}]${rowData.name}`}</Text>
        <Text style={[styles.fs10, styles.timeRange]}>{rowData.timeRange}</Text>
        <Text style={[styles.fs10, styles.venueName]}>{rowData.venueName}</Text>

        {rowData.lowPrice ? <View style={[styles.flex, styles.bottomWrap]}>
          <View style={[styles.statusWrap, { backgroundColor: statusColor }]}>
            <Text style={[styles.fs10, { color: '#fff' }]}>{status[rowData.status - 1]}</Text>
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
  timeRange: {
    color: '#aaaaaa',
    marginTop: 15
  },
  venueName: {
    color: '#aaaaaa',
    // marginTop: 10
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
    borderRadius: 3,
    padding: 5
  },
  bottomWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
})

export default ActivitiesCell;