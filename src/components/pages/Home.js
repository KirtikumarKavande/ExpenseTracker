import React from 'react'
import lottieJson from '../../homePage.json'
import Lottie from 'react-lottie-player'
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'


export default function Example() {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      className='w-screen h-screen'
    />
  )
}