import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import AddMomentScreen from '../screens/AddMomentScreen';
import DetailScreen from '../screens/DetailScreen';
import EditMomentScreen from '../screens/EditMomentScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Geo Moment Diary' }}
      />

      <Stack.Screen
        name="AddMoment"
        component={AddMomentScreen}
        options={{ title: 'Tambah Momen' }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detail Momen' }}
      />

      <Stack.Screen
        name="Edit"
        component={EditMomentScreen}
        options={{ title: 'Edit Momen' }}
      />
    </Stack.Navigator>
  );
}