import './input.css'
import Card from './card'
import CardStyle from './card'

export default function Input({type, value, disabled, placeholder, rounded, size, maxLength, onChange, iconPosition='left', icon, ...cardProps}){
    function inputUpdated(ev){
        onChange(ev.target.value)
    }
     
    const inputStyle = {
        ...cardProps.style,
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const classnames = `input ${cardProps.fullWidth ? 'full-width' : ''}`
    return(
    <div className={classnames}>
        <Card noBlur noPadding rounded={rounded} {...cardProps} style={inputStyle}>
            <div className='left'>{iconPosition === 'left' && icon}</div>
            <input onChange={inputUpdated} placeholder={placeholder} value={value} disabled={disabled} type={type} size={size} maxLength={maxLength} style={inputStyle}></input>
            <div className='right'>{iconPosition === 'right' && icon}</div>
        </Card>
    </div>
    )
}