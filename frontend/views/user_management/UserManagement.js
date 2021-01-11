import React from "react";
import { View, FlatList } from "react-native";
import axios from "axios";
import { util } from "../../assets/Utility";
import AppBar from "../../components/AppBar";
import { UserTableRow } from "./UserTableRow";
import { customTheme } from "../../styles/Main";

const users = [
  {
    email: "raghulk27@gmail.com",
    name: "Raghul Krishnan",
    role: 1,
  },
  {
    email: "raghulk278@gmail.com",
    name: "Raghul Krishnan",
    role: 1,
  },
];

export class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    axios
      .get(util.api_url + "/user/all_users", {
        headers: {
          api_key: util.api_key,
        },
      })
      .then((res) => {
        this.setState({
          users: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <View>
        <AppBar toggleNavBar={this.toggleNavBar} subTitle="User Management" />
        <FlatList
          data={this.state.users}
          renderItem={({ item }) => (
            <UserTableRow
              name={item.name}
              role={item.role}
              navigateToWorkPackage={() => this.navigateToWorkPackage(item.id)}
            />
          )}
          style={{backgroundColor: customTheme.primaryDarkColor}}
          numColumns={1}
          //keyExtractor={(item) => item.email}
        />
      </View>
    );
  }
}
