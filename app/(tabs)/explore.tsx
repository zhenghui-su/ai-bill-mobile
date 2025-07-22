import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import { View, TextInput, ScrollView, Text, SafeAreaView } from 'react-native';
import { useAuth } from '../_layout';

export default function App() {
	const session = useAuth((state: any) => state.session);
	const { messages, error, handleInputChange, input, handleSubmit } = useChat({
		fetch: expoFetch as unknown as typeof globalThis.fetch,
		api: `${process.env.EXPO_PUBLIC_API_URL}/chat`,
		onError: (error) => console.error(error, 'ERROR'),
		streamProtocol: 'text',
		body: {
			user_id: session?.user?.id,
		},
		initialMessages: [
			{
				id: '1',
				role: 'assistant',
				content: '你好，请问需要记录什么消费？',
			},
		],
	});

	if (error) return <Text>{error.message}</Text>;

	return (
		<SafeAreaView style={{ height: '100%' }}>
			<View
				style={{
					height: '95%',
					display: 'flex',
					flexDirection: 'column',
					paddingHorizontal: 8,
				}}
			>
				<ScrollView style={{ flex: 1 }}>
					{messages.map((m) => (
						<View key={m.id} style={{ marginVertical: 8 }}>
							<View>
								<Text style={{ fontWeight: 700 }}>{m.role}</Text>
								<Text>{m.content}</Text>
							</View>
						</View>
					))}
				</ScrollView>

				<View style={{ marginTop: 8, marginBottom: 11 }}>
					<TextInput
						style={{ backgroundColor: 'white', padding: 8 }}
						placeholder='Say something...'
						value={input}
						onChange={(e) =>
							handleInputChange({
								...e,
								target: {
									...e.target,
									value: e.nativeEvent.text,
								},
							} as unknown as React.ChangeEvent<HTMLInputElement>)
						}
						onSubmitEditing={(e) => {
							handleSubmit(e);
							e.preventDefault();
						}}
						autoFocus={true}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
