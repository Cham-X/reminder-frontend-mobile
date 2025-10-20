import { router, Stack } from 'expo-router';
import { Text } from "react-native";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

const RooLayout = () => {
    return (
     <QueryClientProvider client={queryClient}>
      <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="createUpdateReminder"
          options={{
            presentation: 'modal',
            headerTitle: 'New Reminder',
             headerTitleAlign: 'center',
            headerLeft: () => <Text style={{ color: '#0E7AFE' }} onPress={() => router.back()}>Cancel</Text>
          }}
        />
      </Stack>
    </QueryClientProvider>
    );
}

export default RooLayout;
