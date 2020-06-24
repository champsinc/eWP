// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
// app wide themes
import color from "react-native-paper";
import { DefaultTheme } from "react-native-paper";

const primaryColor = "#6200EE";

export const customTheme = {
  primaryColor: primaryColor,
  primaryDarkColor: "#FAFAFA",
  textColor: "#FFFFFF",
  discussionPanelIconColor: primaryColor,
  timeColorInChatBubble: "#E7EFC5",
  threadColorInDiscussionSection: "#C09891",
  borderColorInDiscussionSection: "#C7C7C7",
  fontFamily: "Roboto, HelveticaNeue",
  textSelectionColor: "#488FFE",
  disabledColor: "#C7C7C7",
};

export const paperTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    accent: "#03dac4",
  },
};
