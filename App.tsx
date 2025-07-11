import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TaskDetailScreen } from './screens/TaskDetailScreen';
import { TaskListScreen } from './screens/TaskListScreen';
import { AddTaskScreen } from './screens/AddTaskScreen';
import { StatusBar, StyleSheet } from 'react-native';
import { colors, dimensions } from './theme/colors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.primary} />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="TaskList"
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.primary,
                height: dimensions.headerHeight,
              },
              headerTintColor: colors.textInverse,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
              },
              headerStatusBarHeight: 0,
            }}
          >
            <Stack.Screen
              name="TaskList"
              component={TaskListScreen}
              options={{ title: 'My tasks' }}
            />
            <Stack.Screen
              name="AddTask"
              component={AddTaskScreen}
              options={{ title: 'New task' }}
            />
            <Stack.Screen
              name="TaskDetail"
              component={TaskDetailScreen}
              options={{ title: 'Task Details' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
