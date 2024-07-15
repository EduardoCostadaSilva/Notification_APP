import { useEffect } from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  useEffect(() => {
    async function requestPermissions() {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('É necessário que as permissões sejam dadas!');
          return;
        }
      } else {
        alert('Use um dispositivo mobile para funcionar');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }
    requestPermissions();
  }, []);

  const scheduleNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Você tem uma nova mensagem!",
          body: "Esta é a sua notificação com som personalizado.",
          sound: 'custom',
        },
        trigger: { seconds: 5 },
      });
      console.log('Notificação enviada com sucesso!!!');
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Enviar Notificação" onPress={scheduleNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
