import React, { useState } from 'react'

import { apiInstance } from '@/api/setting';
import { toast } from 'react-toastify';
import { useAtomValue } from 'jotai'
import { textArray } from '@/store/initialState';

type Props = {
    setKeyword: React.Dispatch<React.SetStateAction<{
        item: string;
        idx: number;
    }[]>>,
    keyword: {
        item: string;
        idx: number;
    }[],
}

const GptSetting = ({ setKeyword, keyword }: Props) => {
    const [word, setWord] = useState("")
    const context = useAtomValue(textArray)
    console.log('context', context)
    const addKeyword = (e: any) => {
        e.preventDefault()
        if (word) {
            setKeyword([
                ...keyword, { item: word, idx: keyword.length }
            ])
        }
        setWord("")
    }
    const handelChange = (e: any) => setWord(e.target.value)
    const rePlan = async (e: any) => {
        e.preventDefault()
        try {
            const response = await apiInstance.post('/gpt', {
                prompt: keyword[keyword?.length - 1]?.item,
                context
            })
            console.log('response', response?.data)
        }
        catch (e) {
            console.error(e)
        }
    }
    return (
        <div className='w-full'>
            <label htmlFor="require">추가 요구사항</label>
            <form onSubmit={addKeyword} className='flex items-center justify-center w-full gap-1'>
                <input type="text" autoComplete='off' id='require' className='w-full p-2 my-2 border rounded' placeholder='요구사항 입력' value={word} onChange={handelChange} />
                <button className='z-[10] px-4 h-10 whitespace-nowrap text-xs transition-colors bg-orange-300 rounded hover:bg-orange-400 active:bg-orange-500'>입력</button>
            </form>
            <button type='button' onClick={rePlan} className='z-[10] px-4 w-full my-2 h-10 whitespace-nowrap text-lg transition-colors bg-orange-300 rounded hover:bg-orange-400 active:bg-orange-500'>계획</button>
        </div>

    )
}

export default GptSetting