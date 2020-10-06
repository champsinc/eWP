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
import AsyncStorage from "@react-native-community/async-storage";

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
      sectionData: this.props.sectionData,
      // subSectionsData: [],
      expandSelectedSubsection: true,
      // dataCopy: this.props.dataCopy,
    };

    // this.setState({ sectionData: this.props.sectionData });

    // axios
    //   .get(util.api_url + "/section/" + this.props.sectionId, {
    //     headers: {
    //       api_key: util.api_key,
    //     },
    //   })
    //   .then((response) => {
    // this.setState({
    //   subSectionsData: response.data,
    //   // dataCopy: response.data,
    // });
    // this.state.dataCopy = response.data;

    this.props.sectionData.forEach((subSection) => {
      subSection.dataitems.forEach((listItem) => {
        this.subSectionId = listItem.id;
        this.changesMade[listItem.name] = false;
        this.errorsInFields[listItem.name] = false;
      });
    });

    // AsyncStorage.setItem("sectionData", JSON.stringify(this.props.sectionData))

    // console.log(this.state.dataCopy);
    // })
    // .catch((err) => {
    //   console.log(err);
    //   this.setState({ subSectionsData: [] });
    // });

    // dataCopy = datacopy1;
  }

  subSectionId;
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
  setChangesMade = (
    field,
    trueOrFalse,
    subSectionId,
    dataItemId,
    newValue,
    isAttachmentType
  ) => {
    let changesMade = false;
    this.changesMade[field] = trueOrFalse;

    // console.log(this.state.dataCopy);
    this.props.sectionData.forEach((subsection) => {
      subsection.id == subSectionId
        ? !isAttachmentType
          ? (subsection.dataitems.filter((dataitem) => {
              return dataitem.id == dataItemId;
            })[0].value = newValue)
          : (subsection.dataitems.filter((dataitem) => {
              return dataitem.id == dataItemId;
            })[0].status = newValue)
        : "";
    });

    // console.log(this.props.sectionData);

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
      showSave: false,
    });
    this.finalChangesMade = false;
  };

  confirmSaveDialogButton = () => {
    this.setWpData();

    Platform.OS == "web"
      ? axios.post(
          util.api_url + "/section/update",
          {
            sectionId: this.props.sectionId,
            sub_sections: this.props.sectionData,
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
                axios.post(
                  util.api_url + "/section/update",
                  {
                    sectionId: this.props.sectionId,
                    sub_sections: this.props.sectionData,
                  },
                  {
                    headers: {
                      api_key: util.api_key,
                    },
                  }
                ),
                console.log("netinfo: psoting this: " + this.props.sectionData),
              ]
            : "";
        });

    // Platform.OS != "web"
    //   ? [
    //       SecureStore.setItemAsync(
    //         "sub_sections",
    //         this.props.sectionData.toString()
    //       ).then((val) => console.log(val)),
    //       SecureStore.getItemAsync("sub_sections").then((val) =>
    //         console.log(val)
    //       ),
    //     ]
    //   : "";
    // console.log(
    //   JSON.stringify({
    //     sectionId: this.props.sectionId,
    //     sub_sections: this.props.sectionData,
    //   })
    // );
    // Platform.OS == "web"
    //   ? axios.post(
    //       util.api_url + "/section/update",
    //       {
    //         sectionId: this.props.sectionId,
    //         sub_sections: this.props.sectionData,
    //       },
    //       {
    //         headers: {
    //           api_key: util.api_key,
    //         },
    //       }
    //     )
    //   : NetInfo.addEventListener((state) => {
    //       state.isConnected
    //         ? [
    //             SecureStore.getItemAsync("sub_sections").then((val) =>
    //               console.log(val)
    //             ),
    //             axios.post(
    //               util.api_url + "/section/update",
    //               {
    //                 sectionId: this.props.sectionId,
    //                 sub_sections: this.props.sectionData,
    //               },
    //               {
    //                 headers: {
    //                   api_key: util.api_key,
    //                 },
    //               }
    //             ),
    //             // SecureStore.deleteItemAsync("sub_sections"),
    //             // console.log("IN"),
    //           ]
    //         : SecureStore.setItemAsync(
    //             "sub_sections",
    //             this.props.sectionData
    //           ).then((val) => console.log(val));
    // console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);
    // });
    this.onModalClose();
    // unsubscribe();
    // navigator.onLine
    //   ? axios.post(
    //       util.api_url + "/section/update",
    //       {
    //         sectionId: this.props.sectionId,
    //         sub_sections: this.props.sectionData,
    //       },
    //       {
    //         headers: {
    //           api_key: util.api_key,
    //         },
    //       }
    //     )
    //   : this.onModalClose();
  };

  setWpData = () => {
    AsyncStorage.getItem("wpId-" + this.props.wpId).then((wpData) => {
      wpData = JSON.parse(wpData);
      wpData.forEach((section) => {
        section.id == this.props.sectionId
          ? (section.section_data = this.props.sectionData)
          : "";
      });
      AsyncStorage.setItem("wpId-" + this.props.wpId, JSON.stringify(wpData));
    });
  };

  render() {
    return (
      <ScrollView>
        <List.Section
          title={this.props.section}
          titleStyle={[styles.titleStyle, commonStyles.capitalizeText]}
        >
          {this.props.sectionData.length &&
          this.props.sectionData.every((subsection) => {
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
              {this.props.sectionData.map((subsection, subsectionIndex) => {
                return (
                  <View key={subsection.name}>
                    <List.Accordion
                      key={subsection.name}
                      title={subsection.name}
                      titleStyle={commonStyles.capitalizeText}
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
                            ref={(ref) => (this.textType = ref)}
                            key={listItem.id}
                            type={listItem.type}
                            value={listItem.value.toString()}
                            editable={listItem.editable}
                            required={listItem.required}
                            notes={listItem.notes}
                            previousNotes={listItem.previousNotes || []}
                            setChangesMade={this.setChangesMade}
                            subSectionId={subsection.id}
                            sectionId={this.props.sectionId}
                            dataItemId={listItem.id}
                            setError={this.setError}
                            currentUser={this.props.user}
                            wpId={this.props.wpId}
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
                            subSectionId={subsection.id}
                            dataItemId={listItem.id}
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
                            subSectionId={subsection.id}
                            dataItemId={listItem.id}
                          />
                        ) : listItem.type == "checkbox" ? (
                          <CheckItem
                            name={listItem.name}
                            key={listItem.name}
                            type={listItem.type}
                            value={listItem.value}
                            editable={listItem.editable}
                            required={listItem.required}
                            setChangesMade={this.setChangesMade}
                            subSectionId={subsection.id}
                            dataItemId={listItem.id}
                          />
                        ) : listItem.type == "file" ? (
                          <FileType
                            name={listItem.name}
                            key={listItem.name}
                            value={listItem.value}
                            fileType={listItem.fileType}
                            fileSize={listItem.fileSize}
                            statusCode={listItem.status}
                            dueDate={listItem.dueDate}
                            editable={listItem.editable}
                            required={listItem.required}
                            notes={listItem.notes}
                            previousNotes={listItem.previousNotes}
                            setChangesMade={this.setChangesMade}
                            setError={this.setError}
                            subSectionId={subsection.id}
                            dataItemId={listItem.id}
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
        {/* TODO: Chnage this line of code later to show save button only when changes are made */}
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
