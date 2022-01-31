import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
  } from 'react-native';
  import MovableView from 'react-native-movable-view'

const TimerForVideoCall = () => {
    const [second, setSecond] = useState('00');
const [minute, setMinute] = useState('00');
const [isActive, setIsActive] = useState(false);
const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
        const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter(counter => counter + 1);
      }, 1000)
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter])

  return (
    <View >
      <View >
        <Text>{minute}</Text>
        <Text>:</Text>
        <Text>{second}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => setIsActive(!isActive)}>
            <Text>{isActive ? "Pause": "Start"}</Text>
          
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setSecond("00");setMinute("00");setIsActive(false);setCounter("")}}><Text>Reset</Text></TouchableOpacity>
      </View>
   </View>
  )
}
export default TimerForVideoCall