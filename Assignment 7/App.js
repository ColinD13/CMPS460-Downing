import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: 'blue',
          margin: 10,
          marginTop: 5,
          marginLeft: 100,
          marginRight: 100,
          marginBottom: 5,
          padding: 10,
          paddingTop: 100,
          paddingLeft: 100,
          paddingRight: 100,
          paddingBottom: 100,
          paddingHorizontal: 50,
          paddingVertical: 50,
        }}>
        <Text style={{ color: 'white' }}>Hello Yinzers</Text>
      </View>

      <View style={{ backgroundColor: 'blue' }}>
        <Text>Welcome Back Yinzers</Text>
      </View>

      <Text
        style={{
          color: '#ff0000',
          fontFamily: 'Arial',
          fontSize: 50,
          fontStyle: 'italic',
          fontWeight: 800,
          lineHeight: 50,
          textAlign: 'center'
        }}
      >
        Hello Yinzers
      </Text>
    </SafeAreaView>
  );
};

export default App;
