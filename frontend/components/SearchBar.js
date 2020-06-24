// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
// this is the search bar component
// used in the app bar component as a toggle on / off option

import * as React from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet } from "react-native";

export default class SearchBar extends React.Component {
  state = {
    searchQuery: "",
  };

  // sets the typed text as search query
  onChangeSearch = (query) => this.setState({ searchQuery: query });

  render() {
    const { searchQuery } = this.state;
    return (
      <Searchbar
        autoFocus={true}
        style={styles.searchBar}
        placeholder={this.props.searchPlaceHolder}
        icon="arrow-left"
        onIconPress={() => this.props.appBarOn()}
        onChangeText={this.onChangeSearch}
        value={searchQuery}
      />
    );
  }
}
const styles = StyleSheet.create({
  searchBar: {
    width: "100%",
  },
});
