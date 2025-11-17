import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { useFetch } from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const { 
    data: trendingMovies, 
    loading: trendingLoading, 
    error: trendingError 
  } = useFetch({ fetchFunction: getTrendingMovies, autoFetch: true });

  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError, 
    fetchData, 
    reset 
  } = useFetch({ 
    fetchFunction: () => fetchMovies({ query: "" }), 
    autoFetch: true 
  });

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full flex-1 z-0"
        resizeMode="cover"
      />
      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 10, minHeight: '100%' }}
      >
        <Image 
          source={icons.play}
          className="w-12 h-12 mt-20 mb-5 mx-auto"
          resizeMode="contain"
        />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator size="large" color="#0000FF" className="mt-10 self-center" />
        ): moviesError || trendingError ? (
          <View className="flex-1 justify-center items-center mt-10">
            <Text className="text-red-500">Error: {moviesError?.message || trendingError?.message}</Text>
          </View>
        ): (
          <View className="flex-1 mt-5" >
            <SearchBar 
              onPress={() => router.push('/search')}
              placeholder="Search movies..."
            />
            {trendingMovies && (
              <View className="flex-1 mt-5">
                <Text className="text-white text-lg font-semibold mb-3">Trending Searches</Text>
                <FlatList
                  data={trendingMovies}
                  className="mb-4 mt-3"
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => (
                    <View className="w-6" />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={{ ...item }} index={index} />
                  )}
                />
              </View>
            )}
            <>
              <Text className="text-white text-lg font-semibold mt-10 mb-5">Latest Movies</Text>
              <FlatList
                data={movies}
                className="mt-2 pb-32"
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <MovieCard {...item} />
                )}
                numColumns={3}
                columnWrapperStyle={{ 
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5, 
                  marginBottom: 10 
                }}
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
