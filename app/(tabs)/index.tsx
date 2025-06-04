import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

const OPENWEATHER_API_KEY = 'Buraya Api Key Gir';
const OPENAI_API_KEY = 'Buraya Api Key Gir';

interface WeatherData {
    cod: number;
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: { description: string }[];
    wind: { speed: number };
}

export default function App() {
    const [inputText, setInputText] = useState<string>('');
    const [city, setCity] = useState<string | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function extractCity(text: string): Promise<string | null> {
        setLoading(true);
        try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content:
                                'Extract only the city name from the user input sentence. If no city is found, reply with "City not found".',
                        },
                        {
                            role: 'user',
                            content: text,
                        },
                    ],
                    max_tokens: 10,
                    temperature: 0,
                }),
            });

            if (!res.ok) {
                const errText = await res.text();
                Alert.alert('OpenAI Error', `${res.status} - ${errText}`);
                setLoading(false);
                return null;
            }

            const data = await res.json();
            const cityName = data.choices[0].message.content.trim();

            if (cityName.toLowerCase() === 'city not found') {
                Alert.alert('Error', 'No city found in your sentence. Please enter a sentence including a city name.');
                setLoading(false);
                return null;
            }

            setLoading(false);
            return cityName;
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Could not connect to OpenAI service.');
            setLoading(false);
            return null;
        }
    }

    async function fetchWeather(cityName: string): Promise<void> {
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=en`
            );
            const data: WeatherData = await res.json();

            if (data.cod !== 200) {
                Alert.alert('Error', 'Could not fetch weather data. Is the city name correct?');
                setLoading(false);
                setWeather(null);
                setCity(null);
                return;
            }

            setWeather(data);
            setCity(cityName);
            setLoading(false);
        } catch (error) {
            Alert.alert('Error', 'Could not connect to the weather service.');
            setLoading(false);
            setWeather(null);
            setCity(null);
        }
    }

    async function handlePress() {
        if (!inputText.trim()) {
            Alert.alert('Warning', 'Please enter a sentence or city name.');
            return;
        }

        const extractedCity = await extractCity(inputText);
        if (extractedCity) {
            fetchWeather(extractedCity);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>AI Weather Forecast</Text>


                <TextInput
                    style={styles.input}
                    placeholder="E.g. What's the weather in Paris? Or just a city name"
                    value={inputText}
                    onChangeText={setInputText}
                    placeholderTextColor="#999"
                />

                <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Show Weather</Text>
                </TouchableOpacity>

                {loading && <ActivityIndicator size="large" color="#4a90e2" style={{ marginTop: 20 }} />}

                {weather && city && (
                    <View style={styles.result}>
                        <Text style={styles.cityName}>{city}</Text>
                        <Text style={styles.infoText}>
                            Temperature: <Text style={styles.boldText}>{weather.main.temp} °C</Text>
                        </Text>
                        <Text style={styles.infoText}>
                            Condition: <Text style={styles.boldText}>{weather.weather[0].description.normalize('NFC')}</Text>
                        </Text>
                        <Text style={styles.infoText}>
                            Humidity: <Text style={styles.boldText}>{weather.main.humidity} %</Text>
                        </Text>
                        <Text style={styles.infoText}>
                            Wind Speed: <Text style={styles.boldText}>{weather.wind.speed} m/s</Text>
                        </Text>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 60,
        flexGrow: 1,
        backgroundColor: '#e0f2f1',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 25,
        color: '#00695c',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        fontSize: 18,
        paddingHorizontal: 18,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#b2dfdb',
        marginBottom: 15,
        color: '#004d40',
    },
    button: {
        backgroundColor: '#00796b',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        marginBottom: 25,
        shadowColor: '#004d40',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 7,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    result: {
        width: '100%',
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 20,
        shadowColor: '#004d40',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 10,
    },
    cityName: {
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 15,
        color: '#00796b',
        textAlign: 'center',
    },
    infoText: {
        fontSize: 18,
        marginBottom: 8,
        color: '#004d40',
    },
    boldText: {
        fontWeight: '700',
        color: '#00695c',
    },
});
