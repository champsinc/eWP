import React from "react";
import { View, StyleSheet, Platform, SafeAreaView, Text } from "react-native";
import { Button, Menu, Divider, Provider, TextInput } from "react-native-paper";
import { List, Avatar } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { customTheme, paperTheme } from "../../styles/Main";

let extractInitialsFromName = (userName) => {
  if(userName.indexOf(' ') >= 0){
    return (
      userName.split(" ")[0][0].toUpperCase() +
      userName.split(" ").slice(-1)[0][0].toUpperCase()
    );
  }
  else{
    return (
      userName.split(" ")[0][0].toUpperCase()
    );
  }
};

let roleName = ["Admin", "Planner", "Supervisor", "Worker"];

export const UserTableRow = (props) => {

  const [role, setRole] = React.useState(roleName[props.role]);
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
          flex: 1,
          paddingLeft: 3
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
          //paddingTop: 5,
          // flexDirection: "row",
          flex: 2
        }}
      >
        <Text style={{ fontSize: 20}}>{props.name}</Text>
      </View>
      <View
        style={
          {
            // flexDirection: "row",
            // flex: 1,
            // justifyContent: "center",
            flex: 3,
            alignSelf: "center"
          }
        }
      >
        <Button style={{textAlign: "center"}}>{role}</Button>
        {/* <Menu
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
        </Menu>*/}

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
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    width: Platform.OS == "web" ? "50%" : "100%",
    justifyContent: "center",
    alignSelf: "center"
  },
  containerStyle: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "center",
  },
});
