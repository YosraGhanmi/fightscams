import Home from './screens/Home'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './routes/stackroute'
export default function App() {
  return (
   <Navigator />
  ); 
}


