import React,{useState,useEffect} from 'react';
import { Dimensions, StyleSheet,Text,View,TouchableWithoutFeedback, Image } from 'react-native';
import Bird from './components/Bird'
import Obstacles from './components/Obstacles';

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  // console.log(screenHeight)
  const birdLeft = screenWidth / 2
  const [birdBottom,setBirdBottom] = useState(screenHeight / 2)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 +30)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesNegHeight,setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo,setObstaclesNegHeightTwo] = useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300
  const [score,setScore] = useState(0)
  const gap = 250
  const gravity = 3
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo
  const [isGameOver, setIsGameOver] = useState(false)
  

  useEffect(() => {
    if(birdBottom > 0){
      gameTimerId  = setInterval(()=>{
        setBirdBottom(birdBottom => birdBottom - gravity)
      },30)
      return() => {
        clearInterval(gameTimerId)
      }
    }
  },[birdBottom])

// console.log(birdBottom)
const jump = () => {
  if(!isGameOver && (birdBottom < screenHeight)){
   setBirdBottom(birdBottom => birdBottom + 51)
  }
}


useEffect(() => {
if(obstaclesLeft > -obstacleWidth){
  obstaclesLeftTimerId = setInterval(() => {
   setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5 )
  },30)
  return() => {
    clearInterval(obstaclesLeftTimerId)
  }
}else{
  setObstaclesLeft(screenWidth)
  setObstaclesNegHeight(- Math.random() * 100)
  setScore(score => score +1)
}
},[obstaclesLeft])

useEffect(() => {
  if(obstaclesLeftTwo > -obstacleWidth){
    obstaclesLeftTimerIdTwo = setInterval(() => {
     setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5 )
    },30)
    return() => {
      clearInterval(obstaclesLeftTimerIdTwo)
    }
  }else{
    setObstaclesLeftTwo(screenWidth)
    setObstaclesNegHeightTwo(- Math.random() * 100)
    setScore(score => score +1)

  }
  },[obstaclesLeftTwo])

useEffect(() => {
  if (
    ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
  birdBottom > (obstaclesNegHeight + obstacleHeight - 30 + gap)) &&
  (obstaclesLeft > screenWidth/2 - 30 && obstaclesLeft < screenWidth/2 + 30)
  )
  ||
  ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
  birdBottom > (obstaclesNegHeightTwo + obstacleHeight - 30 + gap))&&
  (obstaclesLeftTwo > screenWidth/2 - 30 && obstaclesLeftTwo < screenWidth/2 + 30)
  )
  )
  {
    console.log('game over')
    gameOver()
  }
})

const gameOver = () => {
  setIsGameOver(true)
  clearInterval(gameTimerId)
  clearInterval(obstaclesLeftTimerId)
  clearInterval(obstaclesLeftTimerIdTwo)
}


return (
  <TouchableWithoutFeedback onPress={jump}>
   <View style={styles.container}>
    <Image source={require('./bg.jpg')} style={{width:'100%',height:'100%',position:'absolute'}} >
    {/* {isGameOver && <Text>{score}</Text>} */}
    </Image>
      <Bird 
      birdBottom={birdBottom}
      birdLeft={birdLeft}
      />
      <Obstacles
      color={'green'}
      obstacleHeight={obstacleHeight}
      obstacleWidth={obstacleWidth}
      obstaclesLeft={obstaclesLeft}
      randomBottom={obstaclesNegHeight}
      gap={gap}
      />
      <Obstacles
      color={'blue'}
      obstacleHeight={obstacleHeight}
      obstacleWidth={obstacleWidth}
      obstaclesLeft={obstaclesLeftTwo}
      randomBottom={obstaclesNegHeightTwo}
      gap={gap}
      />
    </View>
  </TouchableWithoutFeedback>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
