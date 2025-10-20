// import { createReminder } from '@/services/reminderServices';
// import { useMutation } from '@tanstack/react-query';
// import { router, Stack } from 'expo-router';
import { useState } from 'react';
import {  StyleSheet, Text, TextInput, View } from 'react-native';

const CreateUpdateReminder = () => {
    const [reminder,setReminder] = useState('')
    const [note, setNote] = useState('')

    // const { mutates: saveReminder, } = useMutation({
    //     mutationFn: () => {
    //         let newReminder = {
    //             reminder,
    //             userId
    //         }

    //         if(note) {
    //             newReminder.note = note
    //         }
    //        return createReminder(newReminder)
    //     } ,
    //     onSuccess: () => {
    //         router.back()
    //     },
    //     onError: (error) => {
    //      Alert.alert('Error', `Could not update reminder status. ${error.message}`);
    //     }
    // })
    
    return (
           
        <View style={styles.inputBox}>
             {/* <Stack.Screen
                name='createUpdateReminder'
                options={{
                    headerRight:()=> <Text disabled={isPending} style={{ color: '#0E7AFE' }} onPress={()=>saveReminder()}>Done</Text>
                }}
            /> */}
            <TextInput placeholder='Title' multiline value={ reminder} onChangeText={setReminder} />
            <View style={styles.divider} />
            <TextInput placeholder='Notes' multiline value={note} onChangeText={setNote} />
            </View>
    );
}

const styles = StyleSheet.create({
    divider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor:'lightgray',
    },
    inputBox: {
        padding: 10,
        backgroundColor: 'white',
        gap: 10,
        marginTop: 20,
        borderRadius:10,
        marginHorizontal:13,
    }
})

export default CreateUpdateReminder;
