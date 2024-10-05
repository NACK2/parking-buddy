import { useState } from 'react'
import DropdownSelector from '../components/dropdownSelector';

const Preferences = () => {
    const [parkades, setParkades] = useState(
        {
            "North Parkade": 0,
            "West Parkade": 0,
            "Rose Parkade": 0,
            "Health Parkade": 0,
            "Fraser Parkade": 0,
            "Thunderbird Parkade": 0
        }
    )

    // const handleChange = (event) => {
    //     const parkade = event.target.value
    //     setParkades(prevState => (
    //         {
    //             ...prevState, 
    //             [parkade]: !parkades[parkade]
    //         }))
    // }


    return (
        <>
            {Object.keys(parkades).map((parkade, i) => (
                <DropdownSelector key={i} setParkades={setParkades} parkade={parkade} length={Object.keys(parkades).length}/>
            ))}
        </>
    )
}

export default Preferences