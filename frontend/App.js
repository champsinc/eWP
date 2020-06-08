// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
// main component that renders the application
// contains the navigation drawer

import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import NavigationDrawer from "./components/NavigationDrawer";
import { setCustomText } from "react-native-global-props";
import { Platform } from "react-native";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";

// to avoid text cutoff in some phones,
// applying global font styles depending on os
const customTextProps = {
  style: {
    fontFamily: Platform.OS === "ios" ? "HelveticaNeue" : "Roboto",
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    setCustomText(customTextProps);
  }

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          forceInset={{ top: "always", bottom: "never" }}
          style={{ flex: 1 }}
        >
          <PaperProvider>
            <NavigationDrawer />
          </PaperProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}
