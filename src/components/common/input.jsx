import './input.css'
import Card from './card'

export default function Input({type, value, disabled, placeholder, fitWidth, noPadding, rounded, appearance, color, intensity, size, maxLength, onChange}){
    function inputUpdated(ev){
        onChange(ev.target.value)
    }
    return(
    <div className='input'>
        <Card noPadding rounded={rounded}>
            <input onChange={inputUpdated} placeholder={placeholder} value={value} disabled={disabled} type={type} size={size} maxLength={maxLength}></input>
        </Card>
    </div>
    )
}