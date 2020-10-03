import React from "react";
import { View, StyleSheet, Platform, SafeAreaView, Text } from "react-native";
import { Button, Menu, Divider, Provider, TextInput } from "react-native-paper";
import { List, Avatar } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { customTheme, paperTheme } from "../../styles/Main";

let extractInitialsFromName = (userName) => {
  return (
    userName.split(" ")[0][0].toUpperCase() +
    userName.split(" ").slice(-1)[0][0].toUpperCase()
  );
};

let roleName = ["Supervisor", "Planner", "Worker"];

export const UserTableRow = (props) => {
  const [visible, setVisible] = React.useState(false);

  const [role, setRole] = React.useState(roleName[props.role - 1]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  // const [showDropDown, setShowDropDown] = React.useState(false);
  // const [gender, setGender] = React.useState(
  //   roleName[props.role - 1].toLowerCase()
  // );

  // const genderList = [
  //   { label: "Supervisor", value: "supervisor" },
  //   { label: "Planner", value: "planner" },
  //   { label: "Worker", value: "worker" },
  // ];

  return (
    <View style={styles.view}>
      {/* <List.Item
        title={props.name}
        left={() => (
          <Avatar.Text size={24} label={extractInitialsFromName(props.name)} />
          )}
        /> */}
      <View
        style={{
          paddingTop: Platform.OS == "web" ? 2 : 5,
          // flexDirection: "row",
        }}
      >
        <Avatar.Text
          size={30}
          labelStyle={{ paddingBottom: 2 }}
          label={extractInitialsFromName(props.name)}
        />
      </View>
      <View
        style={{
          paddingTop: 5,
          // flexDirection: "row",
        }}
      >
        <Text style={{ paddingLeft: 10, fontSize: 20 }}>{props.name}</Text>
      </View>
      <View
        style={
          {
            // flexDirection: "row",
            // flex: 1,
            // justifyContent: "center",
          }
        }
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>{role}</Button>}
        >
          {roleName.map((role) => {
            return (
              <Menu.Item
                onPress={() => {
                  setRole(role);
                  closeMenu();
                }}
                title={role}
                key={role}
              />
            );
          })}
        </Menu>

        {/* <SafeAreaView style={styles.containerStyle}>
              <DropDown
                label={"Role"}
                // mode={"outlined"}
                value={gender}
                setValue={setGender}
                list={genderList}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                inputProps={{
                  right: <TextInput.Icon name={"menu-down-outline"} />,
                }}
                theme={paperTheme}
              />
            </SafeAreaView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: 20,
    flexDirection: "row",
    width: Platform.OS == "web" ? "50%" : "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
  containerStyle: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "center",
  },
});
