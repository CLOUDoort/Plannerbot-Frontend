import React from 'react'

type Props = {}

const LoadingSpinner = (props: Props) => {
    return (
        <div className="m-auto lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default LoadingSpinner