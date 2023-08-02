import { Input, List } from "antd";
import React, { useState } from 'react'

import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";

type Props = {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const AutoComplete = ({ value, setValue }: Props) => {
    const {
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = useGoogle({
        apiKey: process.env.REACT_APP_GOOGLE,
    });
    const [chosen, setChosen] = useState("")
    return (
        <div className="relative flex flex-col w-full">
            <span>여행지</span>
            <input
                className="w-full p-2 my-2 border rounded"
                value={value}
                placeholder="여행지 입력"
                onChange={(evt: any) => {
                    getPlacePredictions({ input: evt.target.value });
                    setChosen(evt.target.value);
                    setValue(evt.target.value);
                }}
            />
            {chosen && <div className="absolute h-[10rem] left-0 overflow-x-hidden flex whitespace-nowrap flex-col w-full my-1 bg-white border z-[9999] rounded top-20">
                {!isPlacePredictionsLoading && (
                    <List className="px-2"
                        dataSource={placePredictions}
                        renderItem={(item: any) => (
                            <List.Item className="cursor-pointer" onClick={() => {
                                setChosen("")
                                setValue(item.description)
                            }
                            }>
                                <List.Item.Meta title={item.description} />
                            </List.Item>
                        )}
                    />
                )}
            </div>}
        </div>
    );
}

export default AutoComplete