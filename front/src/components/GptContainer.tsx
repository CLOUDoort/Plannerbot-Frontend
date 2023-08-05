import React, { useState } from 'react'

import GptSetting from './GptSetting'
import GptText from './GptText'
import { toast } from 'react-toastify'

type Props = {
    place: string,
    period: string,
}

const GptContainer = ({ place, period }: Props) => {
    const [keyword, setKeyword] = useState([{ item: "장소: " + place, idx: 0, select: true }, { item: "기간: " + period, idx: 1, select: true }])
    const deleteKeyword = (idx: number, select: boolean) => {
        if (select) {
            toast.error("이미 반영한 항목은 삭제가 불가능합니다.")
            return
        }
        const filtered = keyword.filter((item) => item.idx != idx)
        setKeyword([...filtered])
    }
    return (
        <section className={`flex justify-between gap-10 h-[80%] w-[70%]`}>
            <article className='flex z-[9999] flex-col items-center w-full min-w-[30rem] h-full px-4 border rounded shadow-2xl bg-white/80'>
                <div className='w-full pb-4 mt-6 text-4xl font-semibold text-center'>Planner Bot
                </div>
                <GptText />
            </article>
            <article className='flex z-[9999] flex-col items-center justify-between h-full px-4 border min-w-[15rem] shadow-2xl bg-white/80'>
                <div className='w-full'>
                    <div className='w-full mt-6 text-2xl font-semibold text-center'>입력 키워드</div>
                    <div className='flex flex-col mt-[2rem] gap-2 justify-center overflow-y-scroll'>
                        {keyword.map((item) => {
                            return (
                                <span key={item.idx} onClick={() => deleteKeyword(item.idx, item.select)} className={`p-2 overflow-hidden ${item.idx > 1 && !item.select && "hover:bg-red-400"} bg-white border rounded cursor-pointer whitespace-nowrap`}>{item.item}</span>
                            )
                        })}
                    </div>
                </div>
                <GptSetting keyword={keyword} setKeyword={setKeyword} />
            </article>
        </section>
    )
}

export default GptContainer