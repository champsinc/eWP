// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
import React from "react";
import { View, FlatList, Platform, StyleSheet } from "react-native";
import AppBar from "./../../components/AppBar";
import { GridCard } from "../../components/GridCard";
import axios from "axios";
import DiscussionPanel from "./../../components/DiscussionPanel";
import DiscussionView from "./../../components/DiscussionView";
import { SubSectionMapper } from "../../components/SubSectionMapper";

let data = [
  {
    key: 1,
    type: "section",
    name: "General",
    value: [
      {
        type: "sub_section",
        name: "Work Order Info Details",
        value: [
          {
            type: "number",
            name: "Work Order Id",
            value: 12,
            editable: false,
          },
          {
            type: "text",
            name: "Title",
            value: "Fix water system",
            editable: false,
          },
          {
            type: "text",
            name: "Description",
            value: "Lorem Ipsum ...",
            editable: false,
          },
        ],
      },
      {
        type: "sub_section",
        name: "Work Order Time Line Details",
        value: [
          {
            type: "date",
            name: "order date",
            value: "23rd May, 2020",
            editable: false,
          },
          {
            type: "date",
            name: "Expected Date of Delivery",
            value: "2nd June 2020",
            editable: false,
          },
        ],
      },
    ],
    icon: "information",
  },
  {
    key: 2,
    type: "section",
    name: "General-1",
    value: [
      {
        type: "sub_section",
        name: "Permission List",
        value: [
          {
            type: "selectitem",
            name: "Allowed",
            value: "selected",
          },
        ],
      },
    ],
    icon: "information",
  },
  {
    key: 3,
    type: "section",
    name: "General-2",
    value: [],
    icon: "information",
  },
  {
    key: 4,
    type: "section",
    name: "General-3",
    value: [],
    icon: "information",
  },
];

export default class WorkPackage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      showDiscussionView: false,
      section: "",
      sectionClicked: false,
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

  sectionClicked = (section) => {
    this.setState({
      sectionClicked: true,
      section,
      showDiscussionView: false,
    });
  };

  goBack = () => {
    this.setState({
      sectionClicked: false,
      section: "",
    });
  };

  getSubSectionsData = () => {
    const section = data.filter((section) => {
      return section.name == this.state.section;
    });
    return section[0].value;
  };

  render() {
    return (
      <View style={styles.view}>
        {!this.state.showDiscussionView && !this.state.sectionClicked && (
          <View style={styles.view}>
            <AppBar
              toggleNavBar={this.toggleNavBar}
              subTitle="Work Package"
              searchPlaceHolder="Search in this work package"
            />
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => (
                <View style={styles.gridCardTopView}>
                  <GridCard
                    key={item.key}
                    icon={item.icon}
                    name={item.name}
                    onPress={this.sectionClicked}
                  />
                </View>
              )}
              //Setting the number of column
              numColumns={Platform.OS == "web" ? 4 : 2}
              keyExtractor={(item, index) => index}
            />
          </View>
        )}
        {this.state.sectionClicked && !this.state.showDiscussionView && (
          <View style={{ flex: 1 }}>
            <AppBar
              toggleNavBar={this.toggleNavBar}
              subTitle={this.state.section}
              searchPlaceHolder="Search in this work package"
              backButton={true}
              backButtonAction={this.goBack}
            />
            <SubSectionMapper
              subsection={this.state.section}
              subSectionsData={this.getSubSectionsData()}
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

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  gridCardTopView: {
    flex: 1,
    flexDirection: "column",
    margin: 1,
  },
});
