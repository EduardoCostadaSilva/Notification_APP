import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';

const loadSound = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/Uêpa!(1).wav') // Verifique se o caminho e o nome do arquivo estão corretos
    );
    return sound;
  } catch (error) {
    console.error("Erro ao carregar som:", error);
    return null;
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
  })
})


export default function App() {

  const handleCallNotifications = async () => {
    const { status } = await Notifications.getPermissionsAsync();


    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert("Permissões de notificação não concedidas");
        return;
      }
    }

    const sound = await loadSound();

    if (!sound) {
      Alert.alert("Erro ao carregar som");
      return;
    }

    // Notificação Local
    await Notifications.scheduleNotificationAsync(// para configurar a notificação dentro de um objeto.
      {
        content: {
          title: "Notification",
          body: "Crazy notification",
          sound: sound,
        },
        trigger: {
          seconds: 2,
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

  return (
    <View style={styles.container}>
      <Text>App de Notificações</Text>
      <Button title="Chamar notificação" color='red' onPress={handleCallNotifications} />
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