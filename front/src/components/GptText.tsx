import React, { useEffect, useState } from 'react'

import GoogleMap from './GoogleMap'
import Link from 'next/link'
import LoadingSpinner from './LoadingSpinner'
import { useAtomValue } from 'jotai'
import { viewText } from '@/lib/jotaiState'

type Props = {
}

const GptText = (props: Props) => {
    const gptText = useAtomValue(viewText)
    const [textAddress, setTextAddress] = useState("")
    const clickMap = (text: string) => setTextAddress(text)

    return (
        <>
            {viewText ?
                <div className='w-full h-full overflow-y-scroll'>
                    {Object.keys(gptText).map((keys: any) => (
                        <div key={keys} className="py-2 my-2 border-b-2 border-black/40">
                            <div className='py-3 text-2xl font-semibold'>{keys}</div>
                            <div className='flex gap-1 my-2'>
                                {gptText[keys].map((item: string) => (
                                    <div onClick={() => clickMap(item)} className={`px-2 py-1 transition-colors border rounded cursor-pointer whitespace-nowrap bg-black/10 ${item === textAddress && "bg-red-400"} hover:bg-black/30`} key={item}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className='py-3 text-2xl font-semibold'>Google Map</div>
                    {textAddress && <GoogleMap address={textAddress} />}
                </div>
                : <LoadingSpinner />}
        </>
    )
}

export default GptText