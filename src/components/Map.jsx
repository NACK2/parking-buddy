import { APIProvider, InfoWindow, Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from 'react'
const API_KEY = 'AIzaSyA1F3qtU-G2firzEXYj2nP9Yp4VTQD58NU'

const parkades = [
    {
        title: "North Parkade",
        location: {
            lat: 49.2690524019523,
            lng: -123.25094912209013
        }
    },

    {
        title: "West Parkade",
        location: {
            lat: 49.26271472490361,
            lng: -123.25496107605744
        }
    },

    {
        title: "Rose Parkade",
        location: {
            lat: 49.26953120233329,
            lng: -123.25661886441803
        }
    },

    {
        title: "Health Parkade",
        location: {
            lat: 49.261640310223704,
            lng: -123.2430527932541
        }
    },

    {
        title: "Thunderbird Parkade",
        location: {
            lat: 49.263412421854795,
            lng: -123.24782161045076
        }
    }
]

const ParkadeMap = () => {
    const [selectedParkade, setSelectedParkade] = useState(null)

    const handleOnClick = (parkade) => {
        setSelectedParkade(parkade);
    }

    const handleOnClose = () => {
        setSelectedParkade(null);
    }

    return (
        <APIProvider apiKey={API_KEY}>
            <Map
                style={{ width: '50vw', height: '50vh' }}
                defaultCenter={{ lat: 49.2606, lng: -123.2460 }}
                defaultZoom={14}
            >
                {parkades.map(parkade => (
                    <Marker
                        position={parkade.location}
                        onClick={() => { handleOnClick(parkade) }}
                    />
                ))}

                {selectedParkade &&
                    <InfoWindow
                        position={selectedParkade.location}
                        onCloseClick={() => { handleOnClose }}>
                        <div>
                            {selectedParkade.title}
                        </div>
                    </InfoWindow>
                }
            </Map>
        </APIProvider>
    )
}

export default ParkadeMap;