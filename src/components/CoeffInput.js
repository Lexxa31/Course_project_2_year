import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

export default function CoeffInput(props) {
  return (
    <View style={styles.coeffInputContainer}>
      <Text style={styles.coeffInputText}>{props.name} = </Text>
      <TextInput
        value={props.value.toString()}
        onChangeText={props.onChangeText}
        style={styles.coeffInputTextInput}
        defaultValue="0"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  coeffInputContainer: { display: "flex", flexDirection: "row", margin: 10,justifyContent:"center" },
  coeffInputText: { fontSize: 20, lineHeight: 22 },
  coeffInputTextInput: {
    fontSize: 20,
    lineHeight: 22,
    backgroundColor: "white",
    width: 70,
  },
});
