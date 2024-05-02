import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase1.db'});

export default function Home(props: any) {
  const [getUserData, setGetUserData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    (await db).transaction((tx: any) => {
      tx.executeSql('SELECT * FROM table_user', [], (tx: any, results: any) => {
        var temp: any = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setGetUserData(temp);
      });
    });
  };

  const deleteUser = async (id: any) => {
    (await db).transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => getData(),
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Please insert a valid User Id');
          }
        },
      );
    });
  };

  return (
    <>
      <View style={style.container}>
        <ScrollView>
          <FlatList
            data={getUserData}
            renderItem={({item, index}: any) => {
              return (
                <View style={style.userData}>
                  <Text>Name: {item.user_name}</Text>
                  <Text>Email: {item.user_email}</Text>
                  <Text>Address: {item.user_address}</Text>
                  <View style={style.userInnerData}>
                    <TouchableOpacity
                      onPress={() => {
                        props.setUserFlag(3);
                        props.setUpdateName(item.user_name);
                        props.setUpdateEmail(item.user_email);
                        props.setUpdateAddress(item.user_address);
                        props.setID(item.user_id);
                      }}>
                      <Image
                        source={require('../images/edit.png')}
                        style={style.icon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteUser(item.user_id)}>
                      <Image
                        source={require('../images/delete.png')}
                        style={[style.icon, {tintColor: 'red'}]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </ScrollView>
        <View>
        <View style={style.innerContainer}>
          <TouchableOpacity onPress={() => props.setUserFlag(4)}>
            <Text style={style.btn}>File Downloader</Text>
          </TouchableOpacity>
        </View>
        <View style={style.innerContainer}>
          <TouchableOpacity onPress={() => props.setUserFlag(1)}>
            <Text style={style.btn}>Add New User</Text>
          </TouchableOpacity>
        </View>
        </View>
    
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    // height: '40%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  btn: {
    fontSize: 16,
    fontWeight: '700',
    padding: 15,
    color: 'white',
    backgroundColor: 'purple',
    marginRight: 20,
    borderRadius: 25,
  },
  userData: {
    width: '100%',
    padding: 10,
  },
  userInnerData: {
    width: '100%',
    height: 50,
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
