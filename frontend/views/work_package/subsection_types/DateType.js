import React from "react";
import { View, StyleSheet, Platform, Text, Dimensions } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Portal, Dialog, Button, IconButton } from "react-native-paper";
import { customTheme, commonStyles, monthNames } from "../../../styles/Main";
import AddNote from "../../../components/AddNote";

/**
 * This class is used to render a single unit item of a subsection of date type
 * @author Raghul Krishnan
 */
export default class DateType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialDate: this.propsDate,
      dateButton: this.initialDateString,
      mode: "datetime",
      error: false,
      showDialog: false,
      showSaveButtonInCalendarView: false,
      error: false,
    };
  }

  getDateString = (date) => {
    return (
      monthNames[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear()
    );
  };

  propsDate = this.props.value != "" ? new Date(this.props.value) : new Date();

  initialDateString =
    this.props.value != "" ? this.getDateString(this.propsDate) : "Select Date";

  currentSelectedDate = null;

  onDateChange = (selectedDate) => {
    let date = selectedDate._d;
    this.currentSelectedDate = date;
    this.setState({
      showSaveButtonInCalendarView: true,
    });
  };

  showDialog = () => {
    this.setState({
      showDialog: true,
    });
  };

  onModalClose = () => {
    let error = this.props.required && this.state.dateButton == "Select Date";
    error
      ? this.props.setError(this.props.name, true)
      : this.props.setError(this.props.name, false);
    this.setState({
      showDialog: false,
      error,
    });
  };

  saveInsideCalendar = () => {
    // TODO: Save this data to persist and also save the timestamp of the change
    let timeStamp = new Date();
    this.props.setError(this.props.name, false);
    this.initialDateString != this.getDateString(this.currentSelectedDate) // if the current value is/[is not] equal to the value it was when it was last saved then
      ? this.props.setChangesMade(
          this.props.name,
          true,
          this.props.subSectionId,
          this.props.dataItemId,
          this.getDateString(this.currentSelectedDate)
        ) // set changesMade object associated with this component key to true
      : this.props.setChangesMade(this.props.name, false); // set changesMade object associated with this component key to false
    this.setState({
      initialDate: this.currentSelectedDate,
      dateButton: this.getDateString(this.currentSelectedDate),
      showDialog: false,
      error: false,
    });
  };

  render() {
    return (
      <View style={this.styles.topView}>
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="calendar-range"
            size={20}
            style={this.styles.calendarIcon}
          />
          <Text
            style={[this.styles.nameTextStyle, commonStyles.capitalizeText]}
          >
            {this.props.name}{" "}
          </Text>
          {this.props.required && (
            <Text style={this.styles.asteriskStyle}>*</Text>
          )}
        </View>
        {this.props.editable ? (
          <Button
            onPress={this.showDialog}
            labelstyle={this.styles.buttonText}
            style={this.styles.dateButton}
          >
            {this.state.dateButton}
          </Button>
        ) : (
          <Text style={this.styles.dateText}>{this.state.dateButton}</Text>
        )}
        {this.state.error && (
          <View>
            <Text style={this.styles.errorText}>This is a required field</Text>
          </View>
        )}
        <Portal>
          <Dialog
            visible={this.state.showDialog}
            onDismiss={this.onModalClose}
            style={this.styles.dialog}
          >
            <Dialog.Title style={this.styles.dialogTitle}>
              Calendar
            </Dialog.Title>
            <CalendarPicker
              startFromMonday={true}
              width={
                Platform.OS == "web"
                  ? this.windowWidth < 1200
                    ? this.windowWidth / 2
                    : this.windowWidth / 2.75
                  : this.windowWidth - 40
              }
              onDateChange={this.onDateChange}
              initialDate={this.state.initialDate}
              selectedDayColor={customTheme.primaryColor}
            />
            <Dialog.Actions style={this.styles.dialogActions}>
              {this.state.showSaveButtonInCalendarView && (
                <Button
                  style={this.styles.actionButton}
                  onPress={this.saveInsideCalendar}
                >
                  Save
                </Button>
              )}
              <Button
                style={this.styles.actionButton}
                onPress={this.onModalClose}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
  windowWidth = Dimensions.get("window").width;

  // styles are p[laced inside beacuse props are used to style components
  styles = StyleSheet.create({
    topView: {
      marginLeft: 15,
      marginBottom: 10,
    },
    nameTextStyle: {
      marginLeft: 15,
      fontWeight: "bold",
      alignSelf: "center",
      fontSize: 16,
    },
    asteriskStyle: {
      color: "red",
      fontSize: 16,
      lineHeight: 30,
    },
    dialog: {
      width: Platform.OS == "web" ? "50%" : "97%",
      alignSelf: "center",
    },
    dialogTitle: {
      fontFamily: "System",
    },
    dialogActions: {
      marginHorizontal: 10,
    },
    actionButton: {
      marginLeft: 15,
    },
    buttonText: {
      fontSize: 16,
    },
    dateButton: {
      marginLeft: 41,
      padding: 0,
      flexDirection: "row",
      alignSelf: "flex-start",
    },
    calendarIcon: {
      alignSelf: "center",
    },
    dateText: {
      marginLeft: 56,
      alignSelf: "flex-start",
      marginTop: 5,
      marginBottom: 10,
      fontSize: 16,
    },
    errorText: {
      marginLeft: 56,
      marginTop: 5,
      flexWrap: "wrap",
      color: "red",
    },
  });
}
