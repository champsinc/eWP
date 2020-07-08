import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { List, Divider, Button, IconButton } from "react-native-paper";
import TextType from "./subsection_types/TextType";
import { ScrollView } from "react-native-gesture-handler";
import DateType from "./subsection_types/DateType";
import { ConfirmSaveDialog } from "../action_dialog/ActionDialogs";
import { SingleSelect } from "./subsection_types/SingleSelect";
import { CheckItem } from "./subsection_types/CheckItem";
import FileType from "./subsection_types/FileType";
import { customTheme } from "../../styles/Main";

/**
 * This class is used to render any section inside a work package
 * @author Raghul Krishnan
 */
export class SubsectionMapper extends React.Component {
  constructor(props) {
    super(props);
    this.props.subSectionsData.forEach((subsection) => {
      subsection.value.forEach((listItem) => {
        this.changesMade[listItem.name] = false;
        this.errorsInFields[listItem.name] = false;
      });
    });
    this.state = {
      showDialog: false,
      showSave: false,
    };
  }

  changesMade = {};

  errorsInFields = {};

  finalChangesMade = false;

  finalErrorInFields = false;

  // this method is used to set a particular field in the changesMade object to true or false
  setChangesMade = (field, trueOrFalse) => {
    let changesMade = false;
    this.changesMade[field] = trueOrFalse;
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
    this.onModalClose();
    // TODO: add code to save the data to persist here
  };

  changeDataCopy = (name, value) => {
    // TODO: add code to save the current state of the section to the data copy array
  };

  render() {
    return (
      <ScrollView>
        <List.Section title={this.props.section} titleStyle={styles.titleStyle}>
          {this.props.subSectionsData.length == 0 ? (
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
              {this.props.subSectionsData.map((subsection) => {
                return (
                  <View key={subsection.name}>
                    <List.Accordion
                      key={subsection.name}
                      title={subsection.name}
                      left={(props) => <List.Icon {...props} icon="folder" />}
                    >
                      {subsection.value.map((listItem) => {
                        return listItem.type == "text" ||
                          listItem.type == "number" ? (
                          <TextType
                            name={listItem.name}
                            key={listItem.name}
                            type={listItem.type}
                            value={listItem.value.toString()}
                            editable={listItem.editable}
                            required={listItem.required}
                            notes={listItem.notes}
                            previousNotes={listItem.previousNotes}
                            setChangesMade={this.setChangesMade}
                            setError={this.setError}
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
                            setError={() => {}}
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