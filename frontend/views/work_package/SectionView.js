import React from "react";
import { View, StyleSheet } from "react-native";
import AppBar from "../../components/AppBar";
import { SubsectionMapper } from "./SubsectionMapper";
import { WarningDialog } from "../action_dialog/ActionDialogs";

const SectionView = (props) => {
  let subsectionMapper;
  return (
    <View style={styles.view}>
      <AppBar
        toggleNavBar={props.toggleNavBar}
        subTitle={props.section}
        searchPlaceHolder="Search in this work package"
        backButton={true}
        backButtonAction={props.goBackFromSubsectionToSection}
      />
      <SubsectionMapper
        ref={(ref) => (subsectionMapper = ref)}
        section={props.section}
        subSectionsData={props.subSectionsData}
      />
      <WarningDialog
        showDialog={props.showDialog}
        dialogTitle={"Warning!"}
        dialogContent={
          "There are unsaved changes, are you sure you want to go back?"
        }
        dialogClickAwayAction={props.onModalClose}
        yesAction={props.warningYesClicked}
        noAction={props.onModalClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default SectionView;
