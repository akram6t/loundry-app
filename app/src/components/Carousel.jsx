import { useTheme } from "react-native-paper"
import { View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

const Carousel = ({ images, style }) => {
    const theme = useTheme();
    return(
        <View style={{ marginTop: 20, ...style }}>
        <SliderBox
          images={images}
          autoPlay
          dotColor={theme.colors.primary}
          inactiveDotColor={theme.colors.background}
          ImageComponentStyle={{
            borderRadius: 6,
            width: "94%",
          }}
        />
      </View>
    )
}

export default Carousel;