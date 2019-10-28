/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import QRCode from 'react-native-qrcode-svg';

const gif =
  'data:image/gif;base64,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';

const png =
  'data:image/png;base64,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';

const App: () => React$Node = () => {
  const [hidden, setHidden] = useState(false);

  const uri = png;

  const onPress = () => {
    alert(uri.length);
  };

  return (
    <View style={styles.body}>
      {!hidden && (
        <Image
          source={{uri}}
          style={{backgroundColor: 'grey', width: 100, height: 100}}
        />
      )}

      <Button title="Break Image with Data Gif" onPress={onPress} />
      <Button title="Toggle Broken Image" onPress={() => setHidden(!hidden)} />
    </View>
  );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
