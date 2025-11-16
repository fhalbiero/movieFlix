import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { useFetch } from '@/services/useFetch';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const { 
    data: movies, 
    loading, 
    error, 
    fetchData: loadMovies, 
    reset
  } = useFetch({ 
    fetchFunction: () => fetchMovies({ query: searchQuery }), 
    autoFetch: false 
  });

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 600); // Debounce for 600ms

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className="absolute w-full flex-1 z-0"
        resizeMode='cover'
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <MovieCard {...item} />
        )}
        numColumns={3}
        columnWrapperStyle={{ 
          justifyContent: 'center', 
          gap: 16,
          marginVertical: 10,
          marginBottom: 10 
        }}
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image
                source={icons.logo}
                className='w-12 h-10'
              />
            </View>
            <View className='mt-10 mb-5 px-5'>
              <SearchBar 
                placeholder='Search movies...'
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator size="large" color="#0000FF" className="my-3" />
            )}

            {error && (
              <View className="w-full justify-center items-center my-3">
                <Text className="text-red-500">Error: {error.message}</Text>
              </View>
            )}

            {!loading && !error && searchQuery.trim() && movies && (
                <Text className="text-white text-xl font-bold">
                  Search Result for {' '}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
                
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-20 px-5'>
              <Text className='text-white text-center'>
                {searchQuery.trim() ? 'No movies found.' : 'Search for movies...'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}