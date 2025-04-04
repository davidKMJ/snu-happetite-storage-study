import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { storeStringData, storeObjectData, getStringData, getObjectData, removeData, clearAllData } from './asyncUtils';
import { useState } from 'react';

import { User } from './types';

export default function App() {

  const [stringData, setStringData] = useState('');
  const [userData, setUserData] = useState<User>({
    name: '',
    age: 0,
  });
  const [userName, setUserName] = useState('');


  return (
    <View style={styles.container}>
      <Text>Store String!</Text>
      <TextInput 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }}
        placeholder="Enter string data"
        onChangeText={(text) => setStringData(text)}
      />
      <Button 
        title="Set String Data!"
        onPress={async () => {
          await storeStringData('stringKey', stringData);
        }}
      />
      <Button 
        title="Get String Data!"
        onPress={async () => {
          const value = await getStringData('stringKey');
          console.log('String Data:', value);
        }}
      />

      <Text>Store User Object!</Text>
      <TextInput 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }}
        placeholder="Enter user name"
        onChangeText={(text) => setUserData({ ...userData, name: text })}
      />
      <TextInput 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }}
        placeholder="Enter user age"
        onChangeText={(text) => setUserData({ ...userData, age: parseInt(text) })}
      />
      <Button 
        title="Set User Data!"
        onPress={async () => {
          await storeObjectData(userData.name, userData);
          console.log('User Data:', userData);
        }}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }}
        placeholder="Enter user name to retrieve"
        onChangeText={(text) => setUserName(text)}
      />
      <Button 
        title="Get User Data!"
        onPress={async () => {
          const value = await getObjectData(userName);
          console.log('User Data:', value);
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
