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
        <section className={`flex justify-between gap-5 z-[9999] h-[80%] px-3`}>
            <article className='flex flex-col items-center w-full h-full px-4 border rounded shadow-2xl bg-white/90'>
                <div className='w-full pb-4 mt-6 text-2xl font-semibold text-center lg:text-4xl'>Planner Bot
                </div>
                <GptText />
            </article>
            <article className='flex flex-col items-center justify-between px-4 border min-w-[5rem] shadow-2xl bg-white/90 rounded h-full gap-5 pb-5'>
                <div className='w-full mt-6 text-xl h-[2rem] font-semibold text-center lg:text-2xl'>Keywords</div>
                <div className='flex flex-col w-full h-full overflow-y-scroll'>
                    <div className='w-full flex-1 h-full mb-[2rem] '>
                        <div className='flex flex-col w-full gap-2'>
                            {keyword.map((item) => {
                                return (
                                    <span key={item.idx} onClick={() => deleteKeyword(item.idx, item.select)} className={`p-2 overflow-x-hidden ${!item.select && "hover:bg-red-400"} bg-white lg:text-base text-xs border rounded cursor-pointer whitespace-nowrap`}>{item.item}</span>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <GptSetting keyword={keyword} setKeyword={setKeyword} />
            </article>
        </section>
    )
}

export default GptContainer