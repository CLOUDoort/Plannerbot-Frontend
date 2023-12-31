'use client'

import React, { useState } from 'react'
import { submitLoading, textArray, viewText } from '@/lib/jotaiState'
import { useAtom, useSetAtom } from 'jotai'

import AutoComplete from '@/components/AutoComplete'
import GptContainer from '@/components/GptContainer'
import Image from 'next/image'
import LoadingSpinner from './LoadingSpinner'
import PeriodSetting from './PeriodSetting'
import { apiInstance } from '@/api/setting'
import { toast } from 'react-toastify'

const Index = () => {
    const [next, setNext] = useState<boolean>(false)
    const [submit, setSubmit] = useState(false)
    const [loading, setLoading] = useAtom(submitLoading)
    const clickNext = () => setNext(!next)
    const [place, setPlace] = useState("")
    const [period, setPeriod] = useState("")
    const setViewText = useSetAtom(viewText)
    const setTextArray = useSetAtom(textArray)

    const clickSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (!place) {
                toast.error("여행지를 입력해주세요!")
                return
            }
            if (!period) {
                toast.error("기간을 입력해주세요!")
                return
            }
            setLoading(true)
            const response = await apiInstance.post('/gpt', {
                prompt: place + ' ' + period
            })
            setSubmit(true)
            setViewText(JSON.parse(response?.data?.messages.content))
            setTextArray(response?.data?.chatLog)
            setLoading(false)
        }
        catch (e: any) {
            setLoading(false)
            setSubmit(false)
            toast.error(e?.response?.data?.message)
        }
    }
    return (
        <main className='relative w-full h-full'>
            <Image
                fill={true}
                src={'/1.jpeg'}
                className="absolute top-0 bottom-0 left-0 right-0"
                style={{ objectFit: "cover" }}
                alt="Picture"
            />
            <div className='flex items-center justify-center w-full h-full'>
                {!submit ?
                    <section className='bg-white/90 z-[9999] border flex flex-col items-center justify-center rounded shadow-2xl w-[70%] lg:h-[80%] h-[60%] min-h-[18rem]'>
                        <div className={`lg:text-3xl text-2xl font-semibold ${loading && "pt-[3rem]"} `}>
                            Planner Bot
                        </div>
                        {!loading ?
                            <>
                                <form onSubmit={clickSubmit} className={`${next ? "opacity-100 my-[1rem]" : "opacity-0 -my-[5rem]"} flex transition-all duration-700 w-[1/2] flex-col items-center justify-center px-5 h-[12rem]`}>
                                    {/* 도시 리스트 자동 완성 */}
                                    <AutoComplete place={place} setPlace={setPlace} />
                                    {/* 기간 설정 */}
                                    <PeriodSetting period={period} setPeriod={setPeriod} />
                                </form>
                                <button onClick={next ? clickSubmit : clickNext} className='px-4 z-[10] py-2 lg:text-lg text-sm transition-colors bg-orange-300 rounded hover:bg-orange-400 active:bg-orange-500'>{next ? "Next" : "Start"}</button>
                            </>
                            : <LoadingSpinner />}

                    </section>
                    : <GptContainer place={place} period={period} />}
            </div >
        </main >
    )
}

export default Index