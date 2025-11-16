import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function MovieDetails() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Movie Details {id}</Text>
        </View>
    )
}