import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import style from './style';

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
        setUrl('');
        Alert.alert('Download Successfuly');
      });
  };
  return (
    <View style={style.PDFContainer}>
      <TextInput
        placeholder="Enter Url"
        onChangeText={(e: any) => setUrl(e)}
        value={url}
        style={style.pdfInput}
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
        <Text style={style.pdfBtn}>Download</Text>
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
