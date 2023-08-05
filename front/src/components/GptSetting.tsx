import React, { useEffect, useState } from 'react'
import { limitCount, textArray, viewText } from '@/lib/jotaiState';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { apiInstance } from '@/api/setting';
import axios from 'axios';
import { toast } from 'react-toastify';

type Props = {
    setKeyword: React.Dispatch<React.SetStateAction<{
        item: string;
        idx: number;
        select: boolean;
    }[]>>,
    keyword: {
        item: string;
        idx: number;
        select: boolean
    }[],
}

type KeywordType = {
    item: string;
    idx: number;
    select: boolean
}

const GptSetting = ({ setKeyword, keyword }: Props) => {
    const context = useAtomValue(textArray)
    const [limit, setLimit] = useAtom(limitCount)
    const setGptText = useSetAtom(viewText)
    const setTextArray = useSetAtom(textArray)
    const [loading, setLoading] = useState(false)

    const [ipAddress, setIpAddress] = useState<string>("")
    useEffect(() => {
        const temp = async () => {
            const response = await axios.get('https://api64.ipify.org/')
            setIpAddress(response?.data)
        }
        temp()
    }, [])

    const [word, setWord] = useState("")
    const addKeyword = (e: any) => {
        e.preventDefault()
        if (word) {
            setKeyword([
                ...keyword, { item: word, idx: keyword.length, select: false }
            ])
        }
        setWord("")
    }
    const handelChange = (e: any) => setWord(e.target.value)
    const rePlan = async (e: any) => {
        setLoading(true)
        e.preventDefault()
        let keywordString = ""
        keyword.forEach((item: KeywordType) => {
            if (!item.select) {
                keywordString += " " + item.item
                item.select = true
            }
        })
        try {
            const requestPlan = await apiInstance.post('/gpt', {
                prompt: keyword[keyword?.length - 1]?.item,
                context
            })
            setGptText(JSON.parse(requestPlan?.data?.messages.content))
            setTextArray(requestPlan?.data?.chatLog)
            console.log('request', requestPlan?.data)
            setLimit(limit + 1)
            if (limit > 5) {
                const setCookie = await apiInstance.post('/gpt/token', {
                    ip: ipAddress
                })
            }
            setLoading(false)
        }
        catch (e: any) {
            toast.error(e?.response?.data?.message)
        }
    }
    return (
        <div className='w-full'>
            <label htmlFor="require">Additional requirements
            </label>
            <form onSubmit={addKeyword} className='flex items-center justify-center w-full gap-1'>
                <input type="text" autoComplete='off' id='require' className='w-full p-2 my-2 border rounded' placeholder='요구사항 입력' value={word} onChange={handelChange} />
                <button className='z-[10] px-4 h-10 whitespace-nowrap text-sm transition-colors bg-orange-300 rounded hover:bg-orange-400 active:bg-orange-500'>Input</button>
            </form>
            <button type='button' onClick={rePlan} className='z-[10] px-4 w-full my-2 h-10 whitespace-nowrap text-lg transition-colors bg-orange-300 rounded hover:bg-orange-400 active:bg-orange-500'>{loading ? "Loading..." : "Plan"}</button>
        </div>

    )
}

export default GptSetting