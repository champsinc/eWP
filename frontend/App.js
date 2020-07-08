// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
// main component that renders the application
// contains the navigation drawer

import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import NavigationDrawer from "./components/NavigationDrawer";
import { setCustomText } from "react-native-global-props";
import { Platform, StatusBar } from "react-native";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";
import { paperTheme, customTheme } from "./styles/Main";

// to avoid text cutoff in some phones,
// applying global font styles depending on os
const customTextProps = {
  style: {
    fontFamily: Platform.OS === "android" ? "Roboto" : "System",
  },
};

export default function App({ navigation }) {
  setCustomText(customTextProps);

  return (
    <SafeAreaProvider>
      {/* {(console.disableYellowBox = true)} */}
      <StatusBar
        backgroundColor={customTheme.primaryColor}
        barStyle="light-content"
      />
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={{ flex: 1 }}
      >
        <PaperProvider theme={paperTheme}>
          <NavigationDrawer />
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
