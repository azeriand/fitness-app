import './input.css'
import Card from '../components/card'

export default function Input({type, value, disabled, placeholder, fitWidth, noPadding, roundes, appearance, color, intensity, onChange}){
    function inputUpdated(ev){
        onChange(ev.target.value)
    }
    return(
    <div className='input'>
        <Card noPadding>
            <input onChange={inputUpdated} placeholder={placeholder} value={value} disabled={disabled} type={type}></input>
        </Card>
    </div>
    )
}