import './input.css'
import Card from './card'

export default function Input({type, value, disabled, placeholder, rounded, size, maxLength, onChange, ...cardProps}){
    function inputUpdated(ev){
        onChange(ev.target.value)
    }

    const classnames = `input ${fullWidth ? 'full-width' : ''}`
    return(
    <div className={classnames}>
        <Card noPadding rounded={rounded} {...cardProps}>
            <input onChange={inputUpdated} placeholder={placeholder} value={value} disabled={disabled} type={type} size={size} maxLength={maxLength}></input>
        </Card>
    </div>
    )
}