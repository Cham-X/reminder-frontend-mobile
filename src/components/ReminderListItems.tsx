import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { Reminder } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { completeReminder } from '@/services/reminderServices';
import { Link } from 'expo-router';

type ReminderListItemProps = {
  reminderItem: Reminder;
};

export default function ReminderListItem({
  reminderItem,
}: ReminderListItemProps) {
  const [isCompleted, setIsCompleted] = useState(reminderItem.completed);

  const { mutate: completedReminder } = useMutation({
    mutationFn: (completed: boolean) =>
      completeReminder(reminderItem.id, completed),
    onSuccess: (data) => {
      setIsCompleted(data.completed);
    },
    onError: (error) => {
      Alert.alert('Error', 'Could not update reminder status.');
    },
  });

  return (
    <TouchableOpacity
      onPress={() => completedReminder(isCompleted)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
        marginBottom: 20,
        paddingBottom: 10,
        paddingTop: 10,
      }}
    >
      {isCompleted ? (
        <MaterialCommunityIcons
          name="circle-slice-8"
          size={22}
          color="#FF8C00"
          style={{ alignSelf: 'flex-start' }}
        />
      ) : (
        <MaterialCommunityIcons
          name="checkbox-blank-circle-outline"
          size={22}
          color="grey"
          style={{ alignSelf: 'flex-start' }}
        />
      )}
      <View
        style={{
          gap: 5,
          flexShrink: 1,
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Text>{reminderItem.reminder}</Text>
        {!!reminderItem.note && (
          <Text style={{ fontSize: 12, color: 'grey' }}>
            {reminderItem.note}
          </Text>
        )}
      </View>
      <Link href={`/createUpdateReminder?id=${reminderItem.id}`} asChild>
        <AntDesign
          name="info-circle"
          size={17}
          color="#FF8C00"
          style={{
            alignSelf: 'flex-start',
            marginLeft: 'auto',
            marginRight: 5,
          }}
          onPress={() => console.log('Navigate to edit')}
        />
      </Link>
    </TouchableOpacity>
  );
}
