import { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
  })
});

const loadCustomSound = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/Uepa.mp3') // Caminho para o seu arquivo de som
    );
    return sound;
  } catch (error) {
    console.error('Erro ao carregar som personalizado:', error);
    return null;
  }
};

export default function App() {
  useEffect(() => {
    // Carregar som personalizado ao inicializar o componente
    loadCustomSound();
  }, []);

  const handleCallNotifications = async () => {
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert('Permissões de notificação não concedidas');
        return;
      }
    }

    // Aqui você pode agendar uma notificação com o som personalizado
    const sound = await loadCustomSound();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Título da Notificação',
        body: 'Corpo da Notificação',
        sound: sound, // Inclui o som personalizado aqui
      },
      trigger: {
        seconds: 2,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text>App de Notificações</Text>
      <Button title="Chamar notificação" color="red" onPress={handleCallNotifications} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
