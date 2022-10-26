import React from "react";

import {View,
        StyleSheet,
        StatusBar,
        Button} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function Home () {
    const navigation = useNavigation();

    function openCamera () {
        navigation.navigate('Câmera');
    }

    function about () {
        navigation.navigate('Sobre');
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        
        <Button
            title="Abrir câmera"
            onPress={openCamera}
        />

        <Button
            title="Sobre"
            onPress={about}
        />

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#58e56e',
    padding: 24,
    justifyContent: 'center'
  }
});