import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { List } from "react-native-paper";
import TextTypeSubSection from "./TextTypeSubSection";
import { ScrollView } from "react-native-gesture-handler";

export class SubSectionMapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <List.Section
          title={this.props.subsection}
          titleStyle={styles.titleStyle}
        >
          {this.props.subSectionsData.map((data) => {
            return (
              <List.Accordion
                key={data.name}
                title={data.name}
                left={(props) => <List.Icon {...props} icon="folder" />}
              >
                {data.value.map((listItem) => {
                  return listItem.type == "text" ||
                    listItem.type == "number" ? (
                    <TextTypeSubSection
                      name={listItem.name}
                      key={listItem.name}
                      type={listItem.type}
                      value={listItem.value}
                      editable={listItem.editable}
                    />
                  ) : (
                    <View />
                    // <List.Item title={listItem.value} />
                  );
                })}
              </List.Accordion>
            );
          })}
        </List.Section>
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
});
