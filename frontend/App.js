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
import AsyncStorage from "@react-native-community/async-storage";
import { LoginNavigator } from "./views/login/LoginNavigator";
import { Props } from "react-native-image-zoom-viewer/built/image-viewer.type";
import Axios from "axios";

// to avoid text cutoff in some phones,
// applying global font styles depending on os
const customTextProps = {
  style: {
    fontFamily: Platform.OS === "android" ? "Roboto" : "System",
  },
};

export const AuthContext = React.createContext();

export default function App() {
  setCustomText(customTextProps);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            user: action.user,
            isLoading: false,
            navigateTo: action.navigateTo,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            navigator: action.navigator,
            user: action.user,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            navigator: action.navigator,
          };
        case "SIGN_UP":
          return {
            ...prevState,
            isSignout: false,
            userToken: null,
            navigator: action.navigator,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      navigator: null,
      user: null,
      navigateTo: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      //TODO: Find a better way to navigate the user inside the app
      let navigateTo =
        Platform.OS == "web"
          ? window.location.href.substring(
              window.location.href.indexOf(window.location.href.split("/")[3])
            )
          : null;
      let userToken = await AsyncStorage.getItem("userToken");
      let user = await AsyncStorage.getItem("user");
      user = JSON.parse(user);
      dispatch({
        type: "RESTORE_TOKEN",
        token: userToken,
        user,
        navigateTo,
      });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: (data) => {
        AsyncStorage.setItem("userToken", data.token);
        AsyncStorage.setItem("user", JSON.stringify(data.user));
        dispatch({
          type: "SIGN_IN",
          token: data.token,
          navigator: data.navigation,
          user: data.user,
        });
        // data.navigation.navigate("dashboard");
      },
      signOut: (data) => {
        AsyncStorage.removeItem("userToken");
        AsyncStorage.removeItem("user");
        dispatch({ type: "SIGN_OUT", navigator: data.navigation });
      },
      signUp: (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        data.navigation.navigate("reset_password");
        dispatch({
          type: "SIGN_UP",
          token: data.token,
          navigator: data.navigation,
        });
      },
    }),
    []
  );

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
          <AuthContext.Provider value={authContext}>
            <NavigationDrawer
              userToken={state.userToken}
              user={state.user}
              key={state.navigateTo}
              navigateTo={state.navigateTo}
            >
              <LoginNavigator userToken={state.userToken} />
            </NavigationDrawer>
          </AuthContext.Provider>
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
