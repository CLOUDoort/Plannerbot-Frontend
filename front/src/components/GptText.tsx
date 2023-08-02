import React, { useState } from 'react'

import LoadingSpinner from './LoadingSpinner'

type Props = {}

const GptText = (props: Props) => {
    const [text, setText] = useState([])
    return (
        <>
            {!text ? <div className='w-full h-full'>
            </div> : <LoadingSpinner />}
        </>
    )
}

export default GptText