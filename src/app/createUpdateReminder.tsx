import {
  createReminder,
  deleteReminder,
  getRemindersById,
  updateOldReminder,
} from '@/services/reminderServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { InsertReminder } from '@/types';

const CreateUpdateReminder = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const reminderId = parseInt(id);

  const [reminder, setReminder] = useState('');
  const [note, setNote] = useState('');

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['reminders', reminderId],
    queryFn: () => getRemindersById(reminderId),
    enabled: !!reminderId,
  });

  const { mutate: saveReminder, isPending } = useMutation({
    mutationFn: () => {
      let newReminder: InsertReminder = {
        reminder,
        userId: 1,
      };

      if (note) {
        newReminder.note = note;
      }
      return createReminder(newReminder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      router.back();
    },
    onError: (error) => {
      Alert.alert(
        'Error',
        `Could not update reminder status. ${error.message}`
      );
    },
  });

  useEffect(() => {
    if (data) {
      setReminder(data.reminder);
      setNote(data.note);
    }
  }, [data]);

  if (isLoading) {
    return <ActivityIndicator size={'large'} style={{ marginTop: '20%' }} />;
  }

  if (error) {
    return (
      <Text
        style={{
          marginTop: '20%',
          fontWeight: 'bold',
          alignSelf: 'center',
        }}
      >
        {error.message}
      </Text>
    );
  }

  const { mutate: updateReminder } = useMutation({
    mutationFn: () => {
      const newReminder = {
        reminder,
        note: note ? note : null,
      };

      return updateOldReminder(reminderId, newReminder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      router.back();
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const { mutate: removeReminder } = useMutation({
    mutationFn: () => deleteReminder(reminderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      router.back();
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const onDonePressed = () => {
    if (reminderId) {
      return updateReminder();
    }

    return saveReminder();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <TextInput
          placeholder="Title"
          multiline
          value={reminder}
          onChangeText={setReminder}
        />
        <View style={styles.divider} />
        <TextInput
          placeholder="Notes"
          multiline
          value={note}
          onChangeText={setNote}
        />
      </View>

      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row-reverse',
        }}
      >
        <Pressable
          style={[
            styles.submitButton,
            isPending && styles.submitButtonDisabled,
          ]}
          onPress={() => onDonePressed()}
          disabled={isPending || !reminder}
        >
          <Text style={{ color: 'white' }}>
            {isPending ? 'Saving...' : 'Submit'}
          </Text>
        </Pressable>
        {!!reminderId && (
          <Pressable onPress={() => removeReminder()} style={styles.inputBox}>
            <Text style={{ color: 'crimson' }}>Delete</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
  },
  inputBox: {
    padding: 10,
    backgroundColor: 'white',
    gap: 10,
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 13,
  },
  submitButton: {
    backgroundColor: '#0E7AFE',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 13,
    marginTop: 20,
    alignItems: 'center',
    color: 'white',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateUpdateReminder;
