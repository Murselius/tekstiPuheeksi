import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

//these are chosen through segmented control
const languages = ['en-US', 'fi-FI', 'sv-SE'];

export default function App() {
  //input from user that will be spoken out loud
  const [thingToSay, setThingToSay] = useState('');
  //index of selected language in the array of languages
  const [selectedIndex, setSelectedIndex] = useState(0);

  const speak = () => {
    if (!thingToSay.trim()) return;

    Speech.speak(thingToSay, {
      language: languages[selectedIndex] ?? 'en-US',
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

        <SegmentedControl
          values={['English', 'Finnish', 'Swedish']}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Type something here..."
          value={thingToSay}
          onChangeText={setThingToSay}
        />
        <View style={styles.buttonContainer}>
          <Button title="SAY IT" onPress={speak} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginTop: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
});