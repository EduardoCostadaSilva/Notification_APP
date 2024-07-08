import { StyleSheet, Text, View } from "react-native";
import * as Notifications from 'expo-notifications';
import { Button } from "react-native";
import { Alert } from "react-native";
 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
  })
})
 
export default function App() {
 
  const handleCallNotifications = async () => {
    const {status} = await Notifications.getPermissionsAsync();
 
    if(status !== 'granted') {
      Alert.alert("Você não deixou as notificações ativas");

      return;
    }
 
 
    // Notificação Local
    await Notifications.scheduleNotificationAsync(// para configurar a notificação dentro de um objeto.
      {
        content: {
          title: "Hello world",
          body: "Notificação do App"
        },
        trigger: {
          seconds: 5,
        }
      }
    )
 
 
 
    /*const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    return(
      <View>
        <Text>{token}</Text>
      </View>
    )*/
  }
 
  return(
    <View style={styles.container}>
      <Text>App de Notificações</Text>
      <Button title="Chamar notificação" color='red' onPress={handleCallNotifications}/>
    </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})