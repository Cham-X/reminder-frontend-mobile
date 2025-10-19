import ReminderListItem from "@/components/ReminderListItems";
import { fetchReminders } from "@/services/reminderServices";
import { Entypo } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native"

export default function HomeScreen() {
     const { data, isLoading, error } = useQuery({
    queryKey: ['reminders'],
    queryFn: () => fetchReminders(),
     });
    

    if (isLoading) {
        return (
            <ActivityIndicator  style={{marginTop:'20%'}} />
        );
    }
    
    if (error) {
    return <Text style={{alignSelf: 'center', marginTop: '20%'}}>{error.message}</Text>;
  }


    return (
    <View style={{flex:1,marginHorizontal:20}}>
    <FlatList
      data={data}
                renderItem={({ item }) => <ReminderListItem reminderItem={item} />}
                ListHeaderComponent={
                                <Text style={{ fontSize: 27, fontWeight: 'bold', letterSpacing:0.5,color:'#FF8C00',marginTop:40}}>Reminders</Text>
                }
    />
            <Pressable style={{flexDirection:'row' ,alignItems:'center',gap:5,marginBottom:20,marginTop:10}}>
                <Entypo name="circle-with-plus" size={24} color={'#FF8C00'} />
                <Text style={{color:'#FF8C00',fontSize:16}}>New Reminder</Text>
</Pressable>
    </View>
  );
}