import React, { useState } from 'react'
import { submitLoading, viewText } from '@/lib/jotaiState'

import GoogleMap from './GoogleMap'
import LoadingSpinner from './LoadingSpinner'
import { useAtomValue } from 'jotai'

const GptText = () => {
    const gptText = useAtomValue(viewText)
    const [textAddress, setTextAddress] = useState("")
    const clickMap = (text: string) => setTextAddress(text)
    const loading = useAtomValue(submitLoading)
    return (
        <>
            {Object.entries(gptText).length ?
                (!loading ?
                    <div className='w-full h-full pb-5 overflow-y-scroll'>
                        {Object.keys(gptText).map((keys: any) => (
                            <div key={keys} className="border-b-2 border-black/40">
                                <div className='py-1 text-base font-semibold lg:text-2xl'>{keys}</div>
                                <div className='grid grid-cols-2 gap-1 my-2 lg:grid-cols-3'>
                                    {gptText[keys].map((item: string) => (
                                        <div onClick={() => clickMap(item)} className={`px-2 py-1 overflow-x-hidden transition-colors border rounded cursor-pointer text-xs lg:text-base  ${item === textAddress ? "bg-red-400 hover:bg-red-500 active:bg-red-600" : "hover:bg-black/40 bg-black/20"} `} key={item}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className='py-3 text-base font-semibold lg:text-2xl'>Google Map (Click the place)</div>
                        {textAddress &&
                            <>
                                <GoogleMap address={textAddress} />
                            </>}
                    </div>
                    : <LoadingSpinner />)

                : <LoadingSpinner />}
        </>
    )
}

export default GptText