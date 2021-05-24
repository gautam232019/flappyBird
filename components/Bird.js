import React from 'react';
import { View ,Image} from 'react-native';

const Bird = ({birdBottom,birdLeft}) => {
    const birdWidth = 50
    const birdHeight = 60
return(
    
    <View style={{
        position: 'absolute',
        width: birdWidth,
        height: birdHeight,
        left: parseInt(birdLeft - (birdWidth/2)),
        bottom: parseInt(birdBottom - (birdHeight/2))
    }}>
    <Image source={require('../bird1.png')} style={{width:50,height:50}} />
    </View> 
)
}

export default Bird;