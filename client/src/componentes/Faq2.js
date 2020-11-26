import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Transition, Transitioning } from "react-native-reanimated";
import { List,Colors,Subheading } from "react-native-paper";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

export default function App() {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();
  return (  
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={style.container}
    >
      <LinearGradient
        colors={["#5E4ACF", "#fff"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: Dimensions.get("window").height,
        }}
      />
      <View style={style.box1}></View>
      <View style={style.box2}>
        <View style={{ paddingTop: 1, paddingHorizontal: 14 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              <Image
                source={require("../../screens/images/Logo-04.png")}
                style={style.Image}
              />
            </View>
            <View>
              <Text style={style.text}>FAQ</Text>
              <Text
                style={{
                  fontSize: 19,
                  textAlign: "center",
                  color: "#1e1e1e",
                  marginTop: 10,
                  marginHorizontal: "2.5%",
                }}
              >
                How we can help you?
              </Text>
            </View>
          </View>
        </View>
        <List.Section >
          <List.Accordion
            title="Account"
            left={(props) => <List.Icon {...props}  icon="equal"/>}
            expanded={expanded}
            onPress={handlePress}
          >
            <List.Item  title="Login" description="If you can`t login, you can send a email to: gohenrybank@gmail.com" />
            <List.Item title="Forgot your password" description={<Text descriptionNumberOfLines={3}>
            Just use your credit card data assigned in the page or game you want to pay 
          </Text>}/>
          </List.Accordion>

          <List.Accordion
            title="Transactions"
            left={(props) => <List.Icon {...props} icon="equal" 
            />}
          >
            <List.Item  title="Transfers and charges" description="All transaction are free and instantaneous By CVU or Rapipago are some of the options" />
            
          </List.Accordion>
          <List.Accordion
            title="Credit Card"
            left={(props) => <List.Icon color={Colors.blue500} {...props} icon="equal" />}
          >
            <List.Item title="Gettin" description="The card will be sent to the address you indicated when you registered on GO" />
          </List.Accordion>

          <List.Accordion
            title="How to use"
            left={(props) => <List.Icon color={Colors.blue500} {...props} icon="equal" />}
          >
            <List.Item title="Advice" description="Just use your credit card data assigned in the page or game you want to pay" />
          </List.Accordion>
        </List.Section>
      </View>
    </Transitioning.View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  box1: {
    padding: 18,
  },
  box2: {
    flex: 5,
  },
  box3: {
    padding: 1,
    flex: 4,
    alignItems: "center",
  },
  box4: {
    padding: 10,
    flex: 1,
    alignItems: "flex-end",
  },
  Image: {
    width: 100,
    height: 100,
    // borderRadius: 40
  },
  text: {
    fontSize: 27,
    color: "#1e1e1e",
    fontWeight: "bold",
    textAlign: "center",
    // textAlign: 'center'
  },

});
