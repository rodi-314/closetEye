import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function Index() {
  return <Redirect href={'/home'} />;
}
