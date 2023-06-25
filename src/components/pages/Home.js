import React from 'react'
import lottieJson from '../../homePage.json'
import Lottie from 'react-lottie-player'
import { useSelector } from 'react-redux'
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'


export default function Example() {
 const darkTheme= useSelector(state=>state.theme.darkTheme)
  return (
    <>
    <Lottie
      loop
      animationData={lottieJson}
      play
      className='w-screen h-screen'
    />
    <div className={`${darkTheme ?"text-center text-white":"text-center text-black"} `}>This App is Developed and managed by <span className='text-orange-400'>kk developers</span> <span className='font-bold'>(Kirtikumar Kavande)</span> </div>
    </>
  )
}