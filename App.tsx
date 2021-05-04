import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

interface items {
  text: string;
  completed: boolean;
}

export default function App() {
  const [value, setValue] = useState<string>("");
  const [list, setList] = useState<items[]>([]);

  const handleSubmit = (): void => {
    setList([...list, { text: value, completed: false }]);
    setValue("");
  };

  const removeItem = (index: number): void => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const toggleComplete = (index: number): void => {
    const newList = [...list];
    newList[index].completed = !newList[index].completed;
    setList(newList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes courses</Text>
      <View style={styles.search}>
        <TextInput
          placeholder="Que voulez-vous acheter ?"
          value={value}
          onChangeText={e => {
            setValue(e);
          }}
          style={styles.input}
        />
        <Button title="Ajouter" onPress={handleSubmit} />
      </View>
      {list.map((item: items, index: number) => (
        <View style={styles.listItem} key={`${index}_${item.text}`}>
          <Text
            style={[
              styles.item,
              { textDecorationLine: item.completed ? "line-through" : "none" }
            ]}
            onPress={() => toggleComplete(index)}
          >
            {item.text}
          </Text>
          <Button
            title="X"
            onPress={() => {
              removeItem(index);
            }}
            color="red"
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center"
  },
  search: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  input: {
    width: 200,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 5
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 5
  },
  addButton: {
    alignItems: "flex-end"
  },
  item: {
    width: 250,
    height: 35,
  }
});
