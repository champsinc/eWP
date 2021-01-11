import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { customTheme } from "../styles/Main";
import { Card, Button, Avatar, Surface, Chip, ProgressBar } from "react-native-paper";
import FacePile from "react-native-face-pile";
import { AvatarSet } from "./AvatarSet";

const LeftContent = (props) => <Avatar.Icon {...props} icon="briefcase" />;

const FACES = [
  {
    id: 0,
    imageUrl:
      "https://x-gossip.news/app/uploads/2020/06/4c4c95cbea48632e537c1ffd1bca643c.png",
  },
  {
    id: 1,
    imageUrl: "https://www.somagnews.com/wp-content/uploads/2020/04/12-5.jpg",
  },
  {
    id: 2,
    imageUrl:
      "https://lezwatchtv.com/wp-content/uploads/2018/01/alba-flores-350x412.jpg",
  },
  {
    id: 3,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/87/Itziar_Itu%C3%B1o_2017.jpg",
  },
  {
    id: 4,
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BZGVlMTQyODEtNTlmZS00MTg1LWEwNmYtZmRlNjFmNzg0MDNhXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_UY1200_CR86,0,630,1200_AL_.jpg",
  },
];

export const WorkPackageCard = (props) => {
  return (
    <Card style={styles.card} elevation={Platform.OS == "web" ? 5 : 10}>
      <Card.Title
        title={props.title}
        // subtitle={"eWP #" + props.ewpNumber + " • " + props.dateCreated}
        left={LeftContent}
      />
      {/* <Card.Content style={styles.cardContent}>
        <View style={styles.percentageIndicator}>
          <Text>{props.percentageComplete} %</Text>
        </View>
        <ProgressBar
          progress={props.percentageComplete / 100}
          color={customTheme.primaryColor}
          style={styles.progressBar}
        />
      </Card.Content> */}
      <Card.Content style={styles.cardContent}>
      <AvatarSet users={props.users}/>
      </Card.Content>
      <View style={styles.percentageIndicator}>
          <Text>{props.percentageCompleted} %</Text>
        </View>
        <ProgressBar
          progress={props.percentageCompleted / 100}
          color={customTheme.primaryColor}
          style={styles.progressBar}
        />
      {/*<FacePile
        numFaces={3}
        faces={FACES}
        containerStyle={{
          marginTop: 10,
          alignSelf: Platform.OS == "web" ? "center" : "center",
          marginLeft: 10,
          marginBottom: 5,
        }}
      />*/}
      <Card.Actions style={styles.actionsButtonContainer}>
        {
          <Button
            onPress={props.navigateToWorkPackage}
            disabled={props.status == 2}
          >
            View
          </Button>
        }
        {/*<Button icon={"bell"} onPress={() => {}}>
          Notifications
          {props.unopenedNotifications && (
            <Text style={styles.badgeIcon}> •</Text>
          )}
          </Button>*/}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    alignSelf: "center",
    width: Platform.OS == "web" ? "60%" : "95%",
    //width: Platform.OS == "web" ? "95%" : "95%",
  },
  cardContent: {
    //flexShrink: 1
    alignItems: "center"
  },
  percentageIndicator: {
    alignSelf: "flex-end",
    marginRight: 5,
  },
  progressBar: {
    marginTop: 5,
    // marginBottom: Platform.OS == "web" ? 1 : 10,
    marginLeft: 5,
    marginRight: 5,
    height: 8,
    borderRadius: 10,
  },
  actionsButtonContainer: {
    justifyContent: "space-around",
  },
  badgeIcon: {
    color: "red",
    flexDirection: "column",
    alignSelf: "flex-start",
    position: "relative",
    bottom: 5,
  },
  surface: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  }
});
