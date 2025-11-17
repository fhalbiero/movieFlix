import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function MovieCard({ 
    id, 
    poster_path, 
    title, 
    vote_average, 
    release_date,
    popularity, 
}: Movie) {

  return (
    <Link href={`/movie/${id}`} asChild>
        <TouchableOpacity className='w-[30%]'>
            <Image
                source={{ 
                    uri: poster_path 
                        ? `https://image.tmdb.org/t/p/w500${poster_path}` 
                        : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                }}
                className='w-full h-52 rounded-lg'
                resizeMode='cover'
            />
            <View className='mt-2'>
                <Text className='text-white font-semibold text-sm' numberOfLines={1}>{title}</Text>
                <Text className='text-gray-400 text-xs'>{release_date}</Text>
                <Text className='text-yellow-400 text-xs'>⭐ {vote_average}</Text>
            </View>
        </TouchableOpacity>
    </Link>
  )
}
