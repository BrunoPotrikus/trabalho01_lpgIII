import React from "react";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home";
import Camera from "./src/pages/Camera";
import About from "./src/pages/About";

const Stack = createNativeStackNavigator();
 
export default function App () {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">

      <Stack.Screen
        name="Home"
        component={Home}
      />

      <Stack.Screen
        name="Câmera"
        component={Camera}
      />

      <Stack.Screen
        name="Sobre"
        component={About}
      />

    </Stack.Navigator>
   </NavigationContainer>
  );
}