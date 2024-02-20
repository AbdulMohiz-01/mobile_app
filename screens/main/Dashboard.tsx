import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { navigate } from "../../navigation/NavigationService";

const Dashboard : React.FC = () => {
  return (
    <View>
      <Text>Dashboard</Text>
      <TouchableOpacity onPress={() => navigate("AnalyseImage", {})}>
        <Text>Analyse Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
