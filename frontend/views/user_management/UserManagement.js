import React from "react";
import { View } from "react-native";
import axios from "axios";
import { util } from "../../assets/Utility";
import AppBar from "../../components/AppBar";

const users = [];

export class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    axios
      .get(util.api_url + "/all_users", {
        headers: {
          api_key: util.api_key,
        },
      })
      .then(() => {})
      .catch((err) => {
        this.setState({
          users,
        });
      });
  }

  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <View>
        <AppBar toggleNavBar={this.toggleNavBar} subTitle="User Management" />
      </View>
    );
  }
}
