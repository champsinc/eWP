// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
// this is the app bar component seen on top of every screen
// contains the title, subtitle and search option
// the title and subtitle can be passed as a prop
// depending on the screen the search functionalities vary
import * as React from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "./SearchBar";
import { Appbar } from "react-native-paper";
import { customTheme } from "../styles/Main";

export default class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appBarDisplay: true,
      searchBarDisplay: false,
    };
  }

  // navigation drawer toggle on/off
  toggleNavigation = () => this.props.toggleNavBar();

  // toggle on the search bar
  searchBarOn = () => {
    this.appBarOff();
  };

  // toggle on the app bar
  appBarOn = () => {
    this.setState({
      appBarDisplay: true,
      searchBarDisplay: false,
    });
  };

  // toggle off the app bar
  appBarOff = () => {
    this.setState({
      appBarDisplay: false,
      searchBarDisplay: true,
    });
  };

  render() {
    return (
      <View>
        {this.state.appBarDisplay && (
          <Appbar.Header statusBarHeight={0} style={styles.headerStyle}>
            {this.props.backButton ? (
              <Appbar.Action
                icon="arrow-left"
                onPress={this.props.backButtonAction}
              />
            ) : (
              <Appbar.Action icon="menu" onPress={this.toggleNavigation} />
            )}
            <Appbar.Content
              title={this.props.title || "eWP"}
              subtitle={this.props.subTitle || "Electronic Work Package"}
            />
            <Appbar.Action icon="magnify" onPress={this.searchBarOn} />
          </Appbar.Header>
        )}
        {this.state.searchBarDisplay && (
          <Appbar.Header statusBarHeight={0} style={styles.headerStyle}>
            <SearchBar
              appBarOn={this.appBarOn}
              searchPlaceHolder={
                this.props.searchPlaceHolder || "App wide search"
              }
            />
          </Appbar.Header>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: customTheme.primaryColor,
  },
});
