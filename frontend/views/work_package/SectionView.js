import React from "react";
import { View, StyleSheet, TouchableWithoutFeedbackBase } from "react-native";
import AppBar from "../../components/AppBar";
import { SubsectionMapper } from "./SubsectionMapper";
import { WarningDialog } from "../action_dialog/ActionDialogs";
import DiscussionPanel from "../discussion_section/DiscussionPanel";
import axios from "axios";
import { util } from "../../assets/Utility";

let params;

export class SectionView extends React.Component {
  constructor(props) {
    super(props);

    params = this.props.route.params;
    this.state = {
      showDialog: false,
      showDiscussionView: false,
      subSectionsData: [],
    };
    axios
      .get(util.api_url + "/section/" + params.sectionId, {
        headers: {
          api_key: util.api_key,
        },
      })
      .then((response) => {
        console.log(response);

        this.setState({ subSectionsData: response.data });
      })
      .catch((err) => {
        this.setState({ subSectionsData: [] });
      });
  }

  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  goBackFromSubsectionToSection = () => {
    this.subsectionMapper.finalChangesMade
      ? this.setState({
          showDialog: true,
        })
      : this.props.navigation.navigate("home");
  };

  onModalClose = () => {
    this.setState({
      showDialog: false,
    });
  };

  warningYesClicked = () => {
    // go back from subsection to section and change all the data in the fields
    // back to how they were before the user entered the screen, and close the dialog
    this.setState(
      {
        showDialog: false,
      },
      () => {
        this.props.navigation.navigate("home");
      }
    );
  };

  toggleDiscussionView = () => {
    this.setState(
      {
        showDiscussionView: !this.state.showDiscussionView,
      },
      () => {
        this.state.showDiscussionView
          ? this.props.navigation.navigate("discussion_section", {
              ewpNumber: 1234,
            })
          : this.props.navigation.goBack();
      }
    );
  };

  render() {
    return (
      <View style={styles.view}>
        <View style={styles.view}>
          <AppBar
            toggleNavBar={this.toggleNavBar}
            subTitle={params.section}
            searchPlaceHolder="Search in this work package"
            backButton={true}
            backButtonAction={this.goBackFromSubsectionToSection}
          />
          <SubsectionMapper
            ref={(ref) => (this.subsectionMapper = ref)}
            user={this.props.user}
            section={params.section}
            expandedSubsectionId={params.subSectionId || null}
            // subSectionsData={this.state.subSectionsData}
            dataCopy={this.state.subSectionsData}
            sectionId={params.sectionId}
          />
          <WarningDialog
            showDialog={this.state.showDialog}
            dialogTitle={"Warning!"}
            dialogContent={
              "There are unsaved changes, are you sure you want to go back?"
            }
            dialogClickAwayAction={this.onModalClose}
            yesAction={this.warningYesClicked}
            noAction={this.onModalClose}
          />
        </View>
        <DiscussionPanel
          discussionViewOpen={this.state.showDiscussionView}
          toggleDiscussionView={this.toggleDiscussionView}
          ewpNumber={"1234"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
