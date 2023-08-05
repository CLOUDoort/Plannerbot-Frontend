import React, { useState } from 'react'

import GoogleMap from './GoogleMap'
import LoadingSpinner from './LoadingSpinner'
import { useAtomValue } from 'jotai'
import { viewText } from '@/lib/jotaiState'

const GptText = () => {
    const gptText = useAtomValue(viewText)
    const [textAddress, setTextAddress] = useState("")
    const clickMap = (text: string) => setTextAddress(text)
    return (
        <>
            {Object.entries(gptText).length ?
                <div className='w-full h-full overflow-y-scroll'>
                    {Object.keys(gptText).map((keys: any) => (
                        <div key={keys} className="py-2 my-2 border-b-2 border-black/40">
                            <div className='py-3 text-2xl font-semibold'>{keys}</div>
                            <div className='grid grid-cols-3 gap-1 my-2'>
                                {gptText[keys].map((item: string) => (
                                    <div onClick={() => clickMap(item)} className={`px-2 py-1 transition-colors border rounded cursor-pointer bg-black/10 ${item === textAddress && "bg-red-400"} hover:bg-black/30`} key={item}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {textAddress &&
                        <>
                            <div className='py-3 text-2xl font-semibold'>Google Map</div>
                            <GoogleMap address={textAddress} />
                        </>}
                </div>
                : <LoadingSpinner />}
        </>
    )
}

export default GptText