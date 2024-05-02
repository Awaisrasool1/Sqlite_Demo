import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';

export default function PDFDownload(props: any) {
  const [url, setUrl] = useState('');

  const downloadFile = () => {
    const {config, fs} = RNFetchBlob;
    const date = new Date();
    const fileDir = fs.dirs.DownloadDir;
    config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          fileDir +
          '/download_' +
          Math.floor(date.getDate() + date.getSeconds() / 2) +
          '.pdf',
        description: 'file download',
      },
    })
      .fetch('GET', url, {})
      .then(res => {
        Alert.alert('Download Successfuly');
      });
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TextInput
        placeholder="Enter Url"
        onChangeText={(e: any) => setUrl(e)}
        style={{
          borderWidth: 1,
          color: 'gray',
          width: '90%',
          borderRadius: 10,
          paddingLeft: 10,
        }}
      />
      <TouchableOpacity
        style={{width: '90%', marginTop: 20}}
        onPress={() => {
          if (url != '') {
            downloadFile();
          } else {
            Alert.alert('Please Enter Url');
          }
        }}>
        <Text
          style={{
            backgroundColor: 'purple',
            textAlign: 'center',
            textAlignVertical: 'center',
            padding: 10,
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
            borderRadius: 10,
          }}>
          Download
        </Text>
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

const style = StyleSheet.create({
  homeText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '800',
    color: 'black',
  },
});
