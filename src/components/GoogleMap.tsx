import React, { useEffect, useMemo, useRef } from 'react'

import { Loader } from "@googlemaps/js-api-loader";

const GoogleMap = ({ address }: { address: string }) => {
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
                            zoom: 13,
                        });
                        const marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                        });
                    } else {
                        console.error(`Geocode was not successful for the following reason: ${status}`);
                    }
                }
            });
        });
    }, [address, geocoder]);
    return <div className='min-h-[20rem] border border-gray-400 p-2 rounded' ref={mapRef} />;
}


export default GoogleMap