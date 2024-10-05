import { useState } from 'react'
import Calendar from '../components/Calendar';
import DropdownSelector from '../components/dropdownSelector';

const Preferences = () => {
    const [parkades, setParkades] = useState(
        {
            "North Parkade": 0,
            "West Parkade": 1,
            "Rose Parkade": 2,
            "Health Parkade": 3,
            "Fraser Parkade": 4,
            "Thunderbird Parkade": 5
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