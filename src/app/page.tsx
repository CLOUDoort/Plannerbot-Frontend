'use client'

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import AutoComplete from '@/components/AutoComplete'
import Image from 'next/image'
import axios from 'axios'
import { apiInstance } from '@/api/setting'
import Setting from '@/components/Setting'

type Props = {}

type FormValues = {
  place: string
  period: number
}

const Home = (props: Props) => {
  const [imgSrc, setImgSrc] = useState<string>("/1.jpeg")
  useEffect(() => {
    const response = async () => {
      const imageResponse = await axios.get('https://api.unsplash.com/photos/random/?client_id=X7Fln7BwlX5s0e3B-xfBlrfGBijhEfPTt1zvTJ7rAO0&query=landscape')
      setImgSrc(imageResponse?.data?.links?.download)
      console.log(imageResponse?.data?.links?.download)
    }
    response()
  }, [])
  const [next, setNext] = useState<boolean>(false)
  const [submit, setSubmit] = useState(false)
  const clickNext = () => setNext(!next)
  const { register, handleSubmit } = useForm<FormValues>()
  const [place, setPlace] = useState("");
  const clickSubmit: SubmitHandler<FormValues> = async (FormValues) => {
    try {
      const response = await apiInstance.post('/gpt', {
        prompt: place + ' ' + place + ' 일간'
      })
      console.log('response', response)
      // setSubmit(true)
    }
    catch (e) {
      console.log(e)
    }
    console.log("FormValues", FormValues)
  }
  return (
    <main className='relative w-full h-full'>
      <Image
        className='absolute'
        fill={true}
        src={'/1.jpeg'}
        objectFit='cover'
        alt="Picture of the author"
      />
      {!submit ? <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full'>
        <div className=' absolute bg-white/80 border flex flex-col items-center justify-center rounded min-w-[15rem] shadow-2xl w-[45%] h-[60%]'>
          <div className={`lg:text-4xl text-3xl font-semibold`}>
            Planner Bot
          </div>
          <form onSubmit={handleSubmit(clickSubmit)} className={`${next ? "opacity-100 my-[2rem]" : "opacity-0 -my-[5rem]"} flex transition-all duration-700 w-[1/2] flex-col items-center justify-center px-5 h-[12rem] `}>
            <AutoComplete value={place} setValue={setPlace} />
            <div className='flex flex-col w-full'>
              <label htmlFor="period">기간</label>
              <select {...register("period")} className='w-full px-4 py-2 my-2 border rounded'>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </div>
          </form>
          <button onClick={next ? handleSubmit(clickSubmit) : clickNext} className='px-4 z-[10] py-2 text-xl transition-colors bg-orange-300 rounded hover:bg-orange-400 active:bg-orange-500'>{next ? "Next" : "Start"}</button>
        </div>
      </div > : <Setting />}
    </main >
  )
}

export default Home