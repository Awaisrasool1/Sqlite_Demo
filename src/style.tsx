import {StyleSheet} from 'react-native';

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

export default style;
