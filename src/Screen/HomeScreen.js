import React, { Component, PureComponent } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert

} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage';


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
                  source={{ uri: item.imagePath }}
                  resizeMode={'stretch'}
                />

              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitleText}>{item.title}</Text>
                <View>
                  <Text style={styles.cardDetailText}>{item.details}</Text>
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
      isLoading: false
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
    // this.fetchUserId();
    //   this.props.navigation.addListener('willFocus', (playload)=>{

    //       if(!this.state.isLoading){
    //       this.onReVisit();
    //       }
    //   });

    AsyncStorage.getItem('userObject')
      .then(userObject => {

        console.log(">>>>>>>>>>>>>>>>>", userObject);
      });
  }


  _keyExtractor = (item, index) => item.id ? item.id : item._id;

  _renderItem = ({ item, index }) =>

    (
      <ListItem
        item={item}
        index={index}
        onPressItem={this._onPressItem}
      />
    );





  _onPressItem = (item) => {

  };





  render = () => {

    return (

      <View style={{ flex: 1, backgroundColor: '#efece8' }}>
        <FlatList
          data={this.state.huntData}
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
          refreshControl={
            <RefreshControl
              refreshing={this.state.isFetching}
              // onRefresh={this.onRefresh}
              title="Loading.."
              tintColor="#3f4239"
              titleColor="#f48619"
              colors={["#3f4239"]}
            />}
        />
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>


    );
  }
}
