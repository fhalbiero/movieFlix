import { icons } from '@/constants/icons'
import { Image, Text, View } from 'react-native'

export default function Saved() {
  return (
    <View className='bg-primary flex-1 px-10 pt-10'>
      <View className='justify-center items-center flex-1 flex-col gap-5'>
        <Image
          source={icons.save}
          className='size-10' 
          tintColor={'#fff'}
          resizeMode='contain'
        />  
        <Text className='text-white font-bold text-lg'>Saved</Text>
      </View>
    </View>
  )
}
