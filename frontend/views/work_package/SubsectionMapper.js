import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { List, Divider, Button, IconButton } from "react-native-paper";
import TextType from "./subsection_types/TextType";
import { ScrollView } from "react-native-gesture-handler";
import DateType from "./subsection_types/DateType";
import { ConfirmSaveDialog } from "../action_dialog/ActionDialogs";
import { SingleSelect } from "./subsection_types/SingleSelect";
import { CheckItem } from "./subsection_types/CheckItem";
import FileType from "./subsection_types/FileType";
import { customTheme, commonStyles } from "../../styles/Main";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import * as SecureStore from "expo-secure-store";
import { util } from "../../assets/Utility";

let datacopy1 = [
  {
    id: "5f0f50b9393970398908c336",
    name: "Work Order Info Details",
    dataitems: [
      {
        value: 12,
        id: "5f0f50b9393970398908c337",
        name: "Work Order Id",
        type: "number",
        editable: true,
        notes: false,
        required: false,
        special_identifier: false,
      },
      {
        value: "Fix water system",
        id: "5f0f50b9393970398908c338",
        name: "Title",
        type: "text",
        editable: true,
        notes: false,
        required: true,
        special_identifier: false,
      },
      {
        value:
          "Lorem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
        id: "5f0f50b9393970398908c339",
        name: "Description",
        type: "text",
        editable: false,
        notes: true,
        required: false,
        special_identifier: false,
      },
      {
        value: "05/13/2020",
        id: "5f0f50b9393970398908c33a",
        name: "Order Date",
        type: "date",
        editable: true,
        notes: false,
        required: false,
        special_identifier: false,
      },
    ],
  },
  {
    id: "5f0f50b9393970398908c33b",
    name: "Work Order Time Line Details",
    dataitems: [
      {
        value: "05/12/2020",
        id: "5f0f50b9393970398908c33c",
        name: "Order Date",
        type: "date",
        editable: false,
        notes: false,
        required: false,
        special_identifier: false,
      },
      {
        value: "05/12/2020",
        id: "5f0f50b9393970398908c33d",
        name: "Expected Date of Delivery",
        type: "date",
        editable: true,
        notes: false,
        required: true,
        special_identifier: false,
      },
    ],
  },
];

/**
 * This class is used to render any section inside a work package
 * @author Raghul Krishnan
 */
export class SubsectionMapper extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    this.state = {
      showDialog: false,
      showSave: false,
      subSectionsData: [],
      expandSelectedSubsection: true,
      dataCopy: this.props.dataCopy,
    };

    axios
      .get(util.api_url + "/section/" + this.props.sectionId, {
        headers: {
          api_key: util.api_key,
        },
      })
      .then((response) => {
        this.setState({
          subSectionsData: response.data,
          // dataCopy: response.data,
        });
        // this.state.dataCopy = response.data;
        this.state.subSectionsData.forEach((subSection) => {
          subSection.dataitems.forEach((listItem) => {
            this.changesMade[listItem.name] = false;
            this.errorsInFields[listItem.name] = false;
          });
        });
        // console.log(this.state.dataCopy);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ subSectionsData: [] });
      });

    // dataCopy = datacopy1;
  }

  // flag = true;

  // componentDidMount() {
  //   dataCopy = this.props.subSectionsData;
  //   console.log(dataCopy);
  //   this.setState({ showDialog: false });
  // }

  // componentDidUpdate() {
  //   console.log(this.props.subSectionsData);
  //   console.log(dataCopy);
  //   this.flag
  //     ? [
  //         this.setState({ showDialog: false }),
  //         (this.flag = !this.flag),
  //         console.log("In"),
  //       ]
  //     : "";
  // }

  changesMade = {};

  // dataCopy = [];

  errorsInFields = {};

  finalChangesMade = false;

  finalErrorInFields = false;

  // this method is used to set a particular field in the changesMade object to true or false
  setChangesMade = (field, trueOrFalse, subSectionId, dataItemId, newValue) => {
    let changesMade = false;
    this.changesMade[field] = trueOrFalse;

    // console.log(this.state.dataCopy);
    this.state.subSectionsData.forEach((subsection) => {
      // console.log(subsection.id);
      // console.log(subSectionId);
      subsection.id == subSectionId
        ? (subsection.dataitems.filter((dataitem) => {
            return dataitem.id == dataItemId;
          })[0].value = newValue)
        : "";
    });

    // console.log(this.state.subSectionsData);

    Object.values(this.changesMade).forEach((value) => {
      changesMade = changesMade || value;
    });
    this.finalChangesMade = changesMade;
    this.setState({
      showSave: !this.finalErrorInFields && this.finalChangesMade,
    });
  };

  setError = (field, trueOrFalse) => {
    let errorsInFields = false;
    this.errorsInFields[field] = trueOrFalse;
    Object.values(this.errorsInFields).forEach((value) => {
      errorsInFields = errorsInFields || value;
    });
    this.finalErrorInFields = errorsInFields;
    this.setState({
      showSave: !this.finalErrorInFields && this.finalChangesMade,
    });
  };

  saveButtonPressed = () => {
    this.finalChangesMade
      ? this.setState({
          showDialog: true,
        })
      : "";
  };

  onModalClose = () => {
    this.setState({
      showDialog: false,
    });
  };

  confirmSaveDialogButton = () => {
    Platform.OS != "web"
      ? [
          SecureStore.setItemAsync(
            "sub_sections",
            this.state.subSectionsData.toString()
          ).then((val) => console.log(val)),
          SecureStore.getItemAsync("sub_sections").then((val) =>
            console.log(val)
          ),
        ]
      : "";
    Platform.OS == "web"
      ? axios.post(
          util.api_url + "/section/update",
          {
            sectionId: this.props.sectionId,
            sub_sections: this.state.subSectionsData,
          },
          {
            headers: {
              api_key: util.api_key,
            },
          }
        )
      : NetInfo.addEventListener((state) => {
          state.isConnected
            ? [
                SecureStore.getItemAsync("sub_sections").then((val) =>
                  console.log(val)
                ),
                axios.post(
                  util.api_url + "/section/update",
                  {
                    sectionId: this.props.sectionId,
                    sub_sections: this.state.subSectionsData,
                  },
                  {
                    headers: {
                      api_key: util.api_key,
                    },
                  }
                ),
                // SecureStore.deleteItemAsync("sub_sections"),
                console.log("IN"),
              ]
            : SecureStore.setItemAsync(
                "sub_sections",
                this.state.subSectionsData
              ).then((val) => console.log(val));
          // console.log("Connection type", state.type);
          // console.log("Is connected?", state.isConnected);
        });
    this.onModalClose();
    // unsubscribe();
    // navigator.onLine
    //   ? axios.post(
    //       util.api_url + "/section/update",
    //       {
    //         sectionId: this.props.sectionId,
    //         sub_sections: this.state.subSectionsData,
    //       },
    //       {
    //         headers: {
    //           api_key: util.api_key,
    //         },
    //       }
    //     )
    //   : this.onModalClose();
  };

  changeDataCopy = (name, value) => {
    // TODO: add code to save the current state of the section to the data copy array
  };

  render() {
    return (
      <ScrollView>
        <List.Section
          title={this.props.section}
          titleStyle={[styles.titleStyle, commonStyles.capitalizeText]}
        >
          {this.state.subSectionsData.length &&
          this.state.subSectionsData.every((subsection) => {
            return subsection.dataitems.length > 0;
          }) == 0 ? (
            <View>
              <IconButton
                style={styles.sadIcon}
                icon={"emoticon-sad-outline"}
                size={70}
                color={customTheme.primaryColor}
              />
              <Text style={styles.noDataText}>No data has been provided!</Text>
            </View>
          ) : (
            <View>
              {this.state.subSectionsData.map((subsection, subsectionIndex) => {
                return (
                  <View key={subsection.name}>
                    <List.Accordion
                      key={subsection.name}
                      title={subsection.name}
                      style={commonStyles.capitalizeText}
                      left={(props) => <List.Icon {...props} icon="folder" />}
                      expanded={
                        this.props.expandedSubsectionId == subsection.id
                          ? this.state.expandSelectedSubsection
                          : undefined
                      }
                      onPress={() => {
                        return this.props.expandedSubsectionId == subsection.id
                          ? this.setState({
                              expandSelectedSubsection: !this.state
                                .expandSelectedSubsection,
                            })
                          : undefined;
                      }}
                    >
                      {subsection.dataitems.map((listItem, listItemIndex) => {
                        return listItem.type == "text" ||
                          listItem.type == "number" ? (
                          <TextType
                            name={listItem.name}
                            key={listItem.id}
                            type={listItem.type}
                            value={listItem.value.toString()}
                            editable={listItem.editable}
                            required={listItem.required}
                            notes={listItem.notes}
                            previousNotes={listItem.previousNotes || []}
                            setChangesMade={this.setChangesMade}
                            subSectionId={subsection.id}
                            dataItemId={listItem.id}
                            setError={this.setError}
                            currentUser={this.props.user}
                            // oldValue={this.props.subSectionsData}
                            oldValue={
                              this.state.dataCopy.length != 0
                                ? this.state.dataCopy[
                                    subsectionIndex
                                  ].dataitems[listItemIndex].value.toString()
                                : ""
                            }
                          />
                        ) : listItem.type == "date" ? (
                          <DateType
                            name={listItem.name}
                            key={listItem.name}
                            type={listItem.type}
                            value={listItem.value.toString()}
                            editable={listItem.editable}
                            required={listItem.required}
                            setChangesMade={this.setChangesMade}
                            setError={this.setError}
                          />
                        ) : listItem.type == "selectbox" ? (
                          <SingleSelect
                            name={listItem.name}
                            fieldName={listItem.name}
                            key={listItem.name}
                            type={listItem.type}
                            value={listItem.value}
                            editable={listItem.editable}
                            required={listItem.required}
                            setChangesMade={this.setChangesMade}
                            setError={this.setError}
                          />
                        ) : listItem.type == "checkitem" ? (
                          <CheckItem
                            name={listItem.name}
                            key={listItem.name}
                            type={listItem.type}
                            value={listItem.value}
                            editable={listItem.editable}
                            required={listItem.required}
                            setChangesMade={this.setChangesMade}
                          />
                        ) : listItem.type == "file" ? (
                          <FileType
                            name={listItem.name}
                            key={listItem.name}
                            value={
                              "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png"
                            }
                            fileType={listItem.fileType}
                            fileSize={listItem.fileSize}
                            statusCode={listItem.fileStatus}
                            dueDate={listItem.dueDate}
                            editable={listItem.editable}
                            required={listItem.required}
                            notes={listItem.notes}
                            previousNotes={listItem.previousNotes}
                            setChangesMade={this.setChangesMade}
                            setError={this.setError}
                          />
                        ) : (
                          <View />
                        );
                      })}
                    </List.Accordion>
                    <Divider style={styles.dividerStyle} />
                  </View>
                );
              })}
            </View>
          )}
        </List.Section>
        {this.state.showSave && (
          <View style={styles.alignCenter}>
            <Button onPress={this.saveButtonPressed}>Save</Button>
          </View>
        )}
        <ConfirmSaveDialog
          showDialog={this.state.showDialog}
          dialogTitle={"Confirm Save"}
          dialogContent={"Are you sure want to save the changes that you made?"}
          dialogClickAwayAction={this.onModalClose}
          saveAction={this.confirmSaveDialogButton}
          cancelAction={this.onModalClose}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 19,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerStyle: {
    marginHorizontal: 10,
  },
  alignCenter: {
    alignSelf: "center",
  },
  noDataText: {
    fontSize: 24,
    alignSelf: "center",
    color: "rgba(0, 0, 0, 0.5)",
  },
  sadIcon: {
    marginTop: 100,
    alignSelf: "center",
  },
});
