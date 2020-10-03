import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";
import { util } from "../../assets/Utility";
import AppBar from "../../components/AppBar";
import { UserTableRow } from "./UserTableRow";

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
      .get(util.api_url + "/all_users", {
        headers: {
          api_key: util.api_key,
        },
      })
      .then((res) => {
        console.log(res);
      })
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
        <FlatList
          data={this.state.users}
          renderItem={({ item }) => (
            <UserTableRow
              name={item.name}
              email={item.email}
              role={item.role}
              navigateToWorkPackage={() => this.navigateToWorkPackage(item.id)}
            />
          )}
          numColumns={1}
          keyExtractor={(item) => item.email}
        />
      </View>
    );
  }
}
