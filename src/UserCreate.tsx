import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import Home from './Home';
import UserUpdate from './UserUpdate';
import PDFDownload from './PDFDownload';
// import style from './style'
var db = openDatabase({name: 'UserDatabase1.db'});

export default function UserCreate(props: any) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [UserFlag, setUserFlag] = useState(1);
  const [updateName, setUpdateName] = useState();
  const [updateEmail, setUpdateEmail] = useState();
  const [updateAddress, setUpdateAddress] = useState();
  const [id, setID] = useState();

  useEffect(() => {
    data();
  }, []);
  const data = async () => {
    (await db).transaction((txn: any) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (tx: any, res: any) => {
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_email VARCHAR(50), user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  };
  const saveData = async () => {
    (await db).transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO table_user(user_name, user_email, user_address) VALUES (?,?,?)',
        [name, email, address],
        (tx: any, results: any) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => setUserFlag(2),
                },
              ],
              {cancelable: false},
            );
          } else Alert.alert('Registration Failed');
        },
      );
    });
  };
  return (
    <>
      {UserFlag == 1 ? (
        <View style={{marginHorizontal: 20}}>
          <Text style={style.lebel}>Enter Name</Text>
          <TextInput
            style={style.input}
            placeholder="Enter Your Name"
            onChangeText={(e: any) => setName(e)}
          />
          <Text style={style.lebel}>Enter Email</Text>
          <TextInput
            style={style.input}
            placeholder="Enter Your Email"
            onChangeText={(e: any) => setEmail(e)}
          />
          <Text style={style.lebel}>Enter Address</Text>
          <TextInput
            style={style.input}
            placeholder="Enter Your Address"
            onChangeText={(e: any) => setAddress(e)}
          />
          <TouchableOpacity onPress={() => saveData()}>
            <Text style={style.formBtn}>Save User</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>setUserFlag(2)}>
            <Text style={style.homeText}>
              Go to
              <Text style={{color: 'purple'}}>{" "}Home Screen</Text>
            </Text>
          </TouchableOpacity>
        </View>
      ) : UserFlag == 2 ? (
        <Home
          setUserFlag={setUserFlag}
          UserFlag={UserFlag}
          setUpdateAddress={setUpdateAddress}
          setUpdateEmail={setUpdateEmail}
          setUpdateName={setUpdateName}
          setID={setID}
        />
      ) : UserFlag == 3 ? (
        <UserUpdate
          setUserFlag={setUserFlag}
          updateName={updateName}
          updateEmail={updateEmail}
          updateAddress={updateAddress}
          id={id}
        />
      ) : (
        UserFlag == 4 && <PDFDownload />
      )}
    </>
  );
}

const style = StyleSheet.create({
  lebel: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
  formBtn: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 25,
  },
  homeText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '800',
    color: 'black',
  },
});
