import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import style from './style';
var db = openDatabase({name: 'UserDatabase1.db'});

export default function UserUpdate(props: any) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    setName(props.updateName);
    setEmail(props.updateEmail);
    setAddress(props.updateAddress);
  }, []);

  const updateData = async () => {
    (await db).transaction(tx => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_email=? , user_address=? where user_id=?',
        [name, email, address, props.id],
        (tx, results) => {
          console.log('Results', results.rows.item);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => props.setUserFlag(2),
                },
              ],
              {cancelable: false},
            );
          } else Alert.alert('Updation Failed');
        },
      );
    });
  };

  return (
    <View style={{marginHorizontal: 20}}>
      <Text style={style.lebel}>Enter Name</Text>
      <TextInput
        style={style.input}
        placeholder="Enter Your Name"
        onChangeText={(e: any) => setName(e)}
        value={name}
      />
      <Text style={style.lebel}>Enter Email</Text>
      <TextInput
        style={style.input}
        placeholder="Enter Your Email"
        onChangeText={(e: any) => setEmail(e)}
        value={email}
      />
      <Text style={style.lebel}>Enter Address</Text>
      <TextInput
        style={style.input}
        placeholder="Enter Your Address"
        onChangeText={(e: any) => setAddress(e)}
        value={address}
      />
      <TouchableOpacity onPress={() => updateData()}>
        <Text style={style.formBtn}>Update User</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.setUserFlag(2)}>
        <Text style={style.homeText}>
          Go to
          <Text style={{color: 'purple'}}> Home Screen</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
