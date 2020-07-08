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

// to avoid text cutoff in some phones,
// applying global font styles depending on os
const customTextProps = {
  style: {
    fontFamily: Platform.OS === "android" ? "Roboto" : "System",
  },
};

export const AuthContext = React.createContext();

export default function App({ navigation }) {
  setCustomText(customTextProps);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          console.log("Came into sign in", action.token);
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        console.log(data.token, "Ragoooogle");
        AsyncStorage.setItem("userToken", data.token);

        dispatch({ type: "SIGN_IN", token: data.token });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
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
            <NavigationDrawer userToken={state.userToken} />
          </AuthContext.Provider>
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
