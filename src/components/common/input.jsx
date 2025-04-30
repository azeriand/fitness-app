import './input.css'
import Card from './card'
import CardStyle from './card'

export default function Input({type, value, disabled, placeholder, size, maxLength, onChange, iconPosition='left', icon, className, ...cardProps}){
    function inputUpdated(ev){
        onChange(ev.target.value)
    }
     
    const inputStyle = {
        ...cardProps.style,
    }

    const classnames = `flex w-fit ${cardProps.fullWidth ? 'w-full' : ''}`

    const inputClassName=`flex text-center justify-center items-center border-none bg-none py-[0.5rem] px-[1rem] m-0 w-full ${className}`

    return(
    <div className={classnames}>
        <Card className='flex text-center justify-center items-center rounded-md w-full' noBlur noPadding {...cardProps} style={inputStyle}>
            <div className='flex pl-[1rem] items-center'>{iconPosition === 'left' && icon}</div>
            <input className={inputClassName} onChange={inputUpdated} placeholder={placeholder} value={value} disabled={disabled} type={type} size={size} maxLength={maxLength} style={inputStyle}></input>
            <div className='flex pr-[1rem] items-center'>{iconPosition === 'right' && icon}</div>
        </Card>
    </div>
    )
}