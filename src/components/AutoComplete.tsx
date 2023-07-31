import { Input, List } from "antd";
import React, { useState } from 'react'

import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";

type Props = {}

const AutoComplete = () => {
    const {
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = useGoogle({
        apiKey: process.env.REACT_APP_GOOGLE,
    });
    const [value, setValue] = useState("");

    return (
        <div className="relative flex flex-col w-full">
            <span>여행지</span>
            <input
                className="w-full px-4 py-2 my-2 rounded"
                value={value}
                placeholder="여행지 입력"
                onChange={(evt: any) => {
                    getPlacePredictions({ input: evt.target.value });
                    setValue(evt.target.value);
                }}
            />
            <div className="flex flex-col w-full my-1 border rounded">
                {!isPlacePredictionsLoading ? (
                    <List
                        dataSource={placePredictions}
                        renderItem={(item: any) => (
                            <List.Item className="hover:bg-zinc-300" onClick={() => setValue(item.description)}>
                                <List.Item.Meta title={item.description} />
                            </List.Item>
                        )}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default AutoComplete