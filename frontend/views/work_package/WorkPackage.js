// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
import React from "react";
import { View, FlatList, Platform } from "react-native";
import AppBar from "./../../components/AppBar";
import { GridCard } from "../../components/GridCard";
import axios from "axios";
import DiscussionPanel from "./../../components/DiscussionPanel";
import DiscussionView from "./../../components/DiscussionView";

let data = [
  {
    key: 1,
    title: "General",
    icon: "information",
  },
  {
    key: 2,
    title: "General",
    icon: "information",
  },
  {
    key: 3,
    title: "General",
    icon: "information",
  },
  {
    key: 4,
    title: "General",
    icon: "information",
  },
];

export default class WorkPackage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      showDiscussionView: false,
    };
    axios
      .get(
        "http://ganskop.com/proxy/https://rss.itunes.apple.com/api/v1/us/books/top-paid/all/10/explicit.json"
      )
      .then((response) => {
        this.setState({
          dataSource: data,
        });
      });
  }

  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  toggleDiscussionView = () => {
    this.setState({
      showDiscussionView: !this.state.showDiscussionView,
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {!this.state.showDiscussionView && (
          <View style={{ flex: 1 }}>
            <AppBar
              toggleNavBar={this.toggleNavBar}
              subTitle="Work Package"
              searchPlaceHolder="Search in this work package"
            />
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => (
                <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
                  <GridCard
                    key={item.key}
                    icon={item.icon}
                    title={item.title}
                  />
                </View>
              )}
              //Setting the number of column
              numColumns={Platform.OS == "web" ? 4 : 2}
              keyExtractor={(item, index) => index}
            />
          </View>
        )}
        <DiscussionPanel
          discussionViewOpen={this.state.showDiscussionView}
          toggleDiscussionView={this.toggleDiscussionView}
          ewpNumber={"1234"}
        />
        {this.state.showDiscussionView && <DiscussionView />}
      </View>
    );
  }
}
