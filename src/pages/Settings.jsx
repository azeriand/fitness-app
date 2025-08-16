import { Card } from 'azeriand-library'
import Input from '../components/common/input'
import { useContext } from 'react'
import { SettingsContext } from '../components/settings-context'


export default function Settings(){

    const {defaultStreak, setDefaultStreak} = useContext(SettingsContext)

    function handleChange(event) {
        setDefaultStreak(event.target.value)
    }

    return(
        <>
            <h1>SETTINGS</h1>
            <Card>
                <p>Set the default streak value:</p>
                <Input value={defaultStreak} onChange={handleChange}/>
            </Card>

        </>
    )
}