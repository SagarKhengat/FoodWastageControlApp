import React, { Component, PureComponent } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
  StyleSheet,
  Dimensions,
  Image

} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage';

const window = Dimensions.get("screen");
const height = window.height;
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  _onPress = () => {
    this.props.onPressItem(this.props.item);
  }


  render = () => {
    const item = this.props.item;
    return (
      <View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => this._onPress()}>
          <View style={styles.cardContainer}>
            <View style={styles.cardItemContainer}>
              <View style={styles.cardImage}>

                <Image
                  style={styles.image100}
                  source={{ uri: item.userImagePath }}
                  resizeMode={'stretch'}
                />

              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitleText}>{item.foodName}</Text>
                <View>
                  <Text style={styles.cardDetailText}>{item.foodAmount}</Text>
                </View>
                <View>
                  <Text style={styles.cardDetailText}>{this.props.isNGO ? `Submitted By: ${item.userName}` : `Submitted To: ${item.ngoName}`}</Text>
                </View>
                <View>
                  <Text style={styles.cardDetailText}>{'Status: '}{item.requestState === 'Pending' ? <Text style={[styles.cardDetailText, { color: '#307ecc' }]}>{'Pending'}</Text> : item.requestState === 'Processed' ? <Text style={[styles.cardDetailText, { color: 'green' }]}>{'Processed'}</Text> : <Text style={[styles.cardDetailText, { color: 'red' }]}>{'Declined'}</Text>}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.listSeparator} />
      </View>
    );

  }
}
export default class HomeScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      isNGO: false,
      userObject: null
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (<View style={{ flex: 1, flexDirection: 'row', marginRight: 10 }}>
      <TouchableOpacity onPress={() => {
        Alert.alert(
          "Logout",
          "Are you sure to logout?",
          [
            { text: "Ok", onPress: () => { AsyncStorage.setItem('userObject', ''); navigation.replace('login') } },
            { text: "Cancel", onPress: () => { } }
          ],
          { cancelable: false }
        );
      }}>
        <Text style={{ color: '#000', fontSize: 13 }}>Logout</Text>
      </TouchableOpacity>
    </View>),

  })


  componentDidMount() {
    this.props.navigation.addListener('willFocus', (payload) => {

      var arr = [];
      AsyncStorage.getItem('userObject')
        .then(userObject => {
          this.setState({
            userObject: JSON.parse(userObject),
            isNGO: JSON.parse(userObject).user_type === 'NGO' ? true : false
          }, () => {
            AsyncStorage.getItem('allRequests')
              .then(allRequests => {

                if (allRequests) {
                  var requests = JSON.parse(allRequests);
                  for (let index = 0; index < requests.length; index++) {
                    const element = requests[index];
                    if (this.state.userObject.user_type === 'NGO') {
                      if (element.NGOEmail === this.state.userObject.user_email) {
                        arr.push(element)
                      }
                    } else {
                      if (element.userEmail === this.state.userObject.user_email) {
                        arr.push(element)
                      }
                    }
                  }
                  arr.sort(function compare(a, b) {
                    var dateA = new Date(a.dateTime);
                    var dateB = new Date(b.dateTime);
                    return dateB - dateA;
                  });
                  this.setState({
                    data: arr
                  })
                }

              });
          })


        });
    });
  }


  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item, index }) =>

    (
      <ListItem
        item={item}
        index={index}
        onPressItem={this._onPressItem}
        isNGO={this.state.isNGO}
      />
    );





  _onPressItem = (item) => {
    if (this.state.isNGO) {
      this.props.navigation.navigate('viewRequestNGO', { request: item })
    } else {
      this.props.navigation.navigate('viewRequestUser', { request: item })
    }
  };





  render = () => {

    return (

      <View style={{ flex: 1, backgroundColor: '#efece8' }}>
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          removeClippedSubviews
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={!this.state.isLoading
            ? <View style={{ alignSelf: 'center', paddingTop: '45%' }}>
              <Text >No requests found.</Text>
            </View>
            : null}
        />
        {!this.state.isNGO ? <TouchableOpacity
          style={{
            width: '60%',
            padding: 12,
            alignSelf: 'center',
            backgroundColor: '#307ecc',
            borderRadius: 6,
            marginVertical: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#307ecc',
            borderColor: '#307ecc',
            borderWidth: 1,
            shadowColor: '#ccc',
            shadowOffset: {
              width: 6,
              height: 6,
            },
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 3,
          }}
          onPress={() => { this.props.navigation.push('addrequest') }}
        >
          <Text style={{
            fontSize: 18,
            color: '#FFF'
          }}>{"Add a Request"}</Text>
        </TouchableOpacity> : null}
      </View>


    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    padding: 7,
    elevation: 2,
    borderRadius: 2
  },
  cardItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardImage: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: "flex-start",
    margin: '1%',
    borderRadius: 10
  },
  image100: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  cardText: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    paddingLeft: 15,
    margin: '1%'
  },
  cardTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  cardDetailText: {
    fontSize: 14,
    color: '#333'
  },
  listSeparator: {
    height: 7,
  },
  dashboardListContainerPadding: {
    paddingTop: 15,
    paddingLeft: 7,
    paddingRight: 7,
  },
  dashboardModal: {
    height: null,
    width: '90%',
    borderRadius: 6,
  },
  dashboardModalUpperPart: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 12,
    height: 35
  },
  dashboardModalCloseButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 12
  },
  image25: {
    width: 25,
    height: 25,
    borderRadius: 1
  },
  dashboardModalMainImageContainer: {
    width: '100%',
    height: height / 1.4
  },
  dashboardModalMainImage: {
    height: height / 1.7
  },
  dashboardModalTextContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    margin: '1%',
    paddingLeft: 15
  },
})