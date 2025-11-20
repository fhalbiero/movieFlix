import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import { useFetch } from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface MovieInfoProps {
    label: string;
    value?: string | number;
}

function MovieInfo({ label, value }: MovieInfoProps) {
    return (
        <View className="flex-col items-start justify-center mt-5">
            <Text className="text-light-200 font-normal text-sm">{label}</Text>
            <Text className="text-light-100 font-semibold text-sm mt-2">
                {value ?? 'N/A'}
            </Text>
        </View>
    )
}

export default function MovieDetails() {
    const { id } = useLocalSearchParams();

    const { data: movie, loading, error } = useFetch({
        fetchFunction: () => fetchMovieDetails(id as string),
        autoFetch: true
    })

    return (
        <View className='bg-primary flex-1'>
            <ScrollView 
                contentContainerStyle={{ 
                    paddingBottom: 110 
                }}
            >
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}` }}
                    className='w-full h-[540px]'
                    resizeMode='stretch'
                />
                <View className='flex-col items-start justify-center px-5 mt-5'>
                    <Text className='text-white font-bold text-2xl'>{movie?.title}</Text>
                    <View className='flex-row items-center mt-2'>
                        <Text className='text-light-200'>{movie?.release_date?.split('-')[0]}</Text>
                        <Text className='text-light-200 mx-2'>•</Text>
                        <Text className='text-light-200'>{movie?.runtime} mins</Text>
                    </View>
                    <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
                        <Text className='text-light-200 font-bold'>⭐ {Math.floor(movie?.vote_average ?? 0)}/10</Text>
                        <Text className='text-light-200 text-sm'> ({movie?.vote_count} votes)</Text>
                    </View>
                    <MovieInfo label="Overview" value={movie?.overview} />
                    <MovieInfo label="Genres" value={movie?.genres?.map((genre: { name: string }) => genre.name).join(' - ')} />
                    <MovieInfo label="Language" value={movie?.original_language?.toUpperCase()} />
                    <View className='flex-row justify-between w-1/2' >
                        <MovieInfo label="Budget" value={movie?.budget ? `$${Math.round(movie.budget / 1_000_000)}M` : 'N/A'} />
                        <MovieInfo label="Revenue" value={movie?.revenue ? `$${Math.round(movie.revenue / 1_000_000)}M` : 'N/A'} />
                    </View>
                    <MovieInfo label="Production Companies" value={movie?.production_companies?.map((company: { name: string }) => company.name).join(', ')} />
                </View>
            </ScrollView>
            <TouchableOpacity
                className='absolute bottom-10 right-0 left-0 rounded-lg bg-accent flex-row items-center justify-center mx-5 py-3 z-50'
                onPress={() => router.back()}
            >
                <Image
                    source={icons.arrow}
                    className='size-5 mr-2 mt-0.5 rotate-180'
                    tintColor={'#fff'}
                />
                <Text className='text-white font-semibold text-base'>Go Back</Text>
            </TouchableOpacity> 
        </View>
    )
}