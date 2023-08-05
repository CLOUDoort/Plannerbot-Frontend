import React from 'react'

type Props = {
    period: string,
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

const PeriodSetting = ({ period, setPeriod }: Props) => {
    return (
        <div className='flex flex-col w-full'>
            <label htmlFor="period">기간</label>
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className='w-full p-2 my-2 border rounded'>
                <option value="0">선택</option>
                <option value="1일간">1</option>
                <option value="2일간">2</option>
                <option value="3일간">3</option>
                <option value="4일간">4</option>
                <option value="5일간">5</option>
                <option value="6일간">6</option>
                <option value="7일간">7</option>
            </select>
        </div>
    )
}

export default PeriodSetting