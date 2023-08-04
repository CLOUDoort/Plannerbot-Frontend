import React, { useEffect, useMemo, useRef } from 'react'

import { Loader } from "@googlemaps/js-api-loader";

type Props = {
    address: string
}

const GoogleMap = ({ address }: Props) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const geocoder = useMemo(() => new google.maps.Geocoder(), []);
    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
            version: "weekly",
        });
        loader.load().then(() => {
            geocoder.geocode({ address: address }, (results, status) => {
                if (results) {
                    if (status === "OK") {
                        const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
                            center: results[0].geometry.location,
                            zoom: 14,
                        });
                        const marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                        });
                    } else {
                        console.error(`Geocode was not successful for the following reason: ${status}`);
                    }
                } else return
            });
        });
    }, [address, geocoder]);
    return <div className='min-h-[30rem] border border-gray-400 p-2 pb-4 rounded' ref={mapRef} />;
}


export default GoogleMap