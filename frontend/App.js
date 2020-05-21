// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
// main component that renders the application
// contains the navigation drawer

import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import NavigationDrawer from "./components/navigation_drawer/NavigationDrawer";
import { setCustomText } from "react-native-global-props";
import { Platform } from "react-native";

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
      <PaperProvider>
        <NavigationDrawer />
      </PaperProvider>
    );
  }
}
