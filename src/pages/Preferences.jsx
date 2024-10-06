import { useState } from 'react'
import Calendar from '../components/Calendar';
import DropdownSelector from '../components/dropdownSelector';

const Preferences = () => {
    const [parkades, setParkades] = useState(
        {
            "North Parkade": 1,
            "West Parkade": 2,
            "Rose Parkade": 3,
            "Health Parkade": 4,
            "Fraser Parkade": 5,
            "Thunderbird Parkade": 6
        }
    )

    return (
        <>
            {Object.keys(parkades).map((parkade, i) => (
                <DropdownSelector key={i} parkades={parkades} setParkades={setParkades} parkade={parkade}/>
            ))}

            <Calendar isPreferencesPage={true}/>
        </>
    )
}

export default Preferences