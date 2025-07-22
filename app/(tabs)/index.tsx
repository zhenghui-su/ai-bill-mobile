import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RecordCard from '@/components/RecordCard';
import { create } from 'zustand';
import axios from 'axios';
import { useAuth } from '../_layout';

export const useRecord = create((set) => ({
	records: [],
	fetchRecords: (date: Date, session: any) => {
		if (!session?.user?.id) {
			return;
		}
		axios
			.post(`${process.env.EXPO_PUBLIC_API_URL}/records`, {
				user_id: session?.user?.id,
				date: date.toISOString().split('T')[0],
			})
			.then((res) => {
				set({ records: res.data.records });
			});
	},
}));
export default function HomeScreen() {
	const session = useAuth((state: any) => state.session);

	const [date, setDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const records: any[] = useRecord((state: any) => state.records);
	const fetchRecords = useRecord((state: any) => state.fetchRecords);

	useEffect(() => {
		if (session?.user?.id) {
			fetchRecords(date, session);
		}
	}, [date]);
	return (
		<SafeAreaView className='flex-1 gap-4 mx-4'>
			{/* date */}
			<View className='flex flex-row justify-between'>
				<Text className='font-bold'>{date.toLocaleDateString()}</Text>
				<Pressable onPress={() => setShowDatePicker(true)}>
					<Text className='text-gray-500'>选择日期</Text>
				</Pressable>
			</View>
			{/* date picker */}
			{showDatePicker && (
				<DateTimePicker
					value={date}
					mode='date'
					display='inline'
					onChange={(event, selectedDate) => {
						if (selectedDate) {
							setDate(selectedDate);
							setShowDatePicker(false);
						}
					}}
				/>
			)}
			{/* income and expense */}
			<View className='h-1/8 flex flex-row justify-between gap-2'>
				<View className='flex-1 bg-green-50 rounded-lg p-4 flex items-center justify-between'>
					<View className='flex flex-row justify-between w-full'>
						<Text className='font-bold'>收入</Text>
						<Text className='text-green-500'>
							{records
								.filter((record) => record.amount > 0)
								.reduce((acc, record) => acc + record.amount, 0)}
						</Text>
					</View>
				</View>
				<View className='flex-1 bg-red-50 rounded-lg p-4 flex items-center justify-between'>
					<View className='flex flex-row justify-between w-full'>
						<Text className='font-bold'>支出</Text>
						<Text className='text-red-500'>
							{records
								.filter((record) => record.amount < 0)
								.reduce((acc, record) => acc + record.amount, 0)}
						</Text>
					</View>
				</View>
			</View>
			{/* 详细记录 */}
			<View className='flex-1 bg-gray-100 rounded-lg py-4 gap-2'>
				<Text className='text-gray-500'>详细记录</Text>
				<ScrollView className='flex-1'>
					{records?.map((record: any) => (
						<RecordCard key={record.id} record={record} />
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
