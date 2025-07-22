import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RecordCard from '@/components/RecordCard';

export default function HomeScreen() {
	const [date, setDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
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
						<Text className='text-green-500'>1000</Text>
					</View>
				</View>
				<View className='flex-1 bg-red-50 rounded-lg p-4 flex items-center justify-between'>
					<View className='flex flex-row justify-between w-full'>
						<Text className='font-bold'>支出</Text>
						<Text className='text-red-500'>1000</Text>
					</View>
				</View>
			</View>
			{/* 详细记录 */}
			<View className='flex-1 bg-gray-100 rounded-lg py-4 gap-2'>
				<Text className='text-gray-500'>详细记录</Text>
				<ScrollView className='flex-1'>
					<RecordCard
						record={{
							id: 1,
							title: '收入',
							amount: 1000,
							createdAt: '2021-01-01',
						}}
					/>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
