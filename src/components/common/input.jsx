import './input.css'
import Card from './card'
import CardStyle from './card'

export default function Input({type, value, disabled, placeholder, size, maxLength, onChange, iconPosition='left', centerText=false, icon, className, ...cardProps}){
    function inputUpdated(ev){
        onChange(ev.target.value)
    }

    const classnames = `flex`

    const inputClassName=`flex justify-center items-center border-none bg-none py-[0.5rem] px-[1rem] m-0 w-full ${centerText ? 'text-center' : ''}`

    const directionClassName = iconPosition === 'left' ? 'pl-2' : 'flex-row-reverse pr-2'

    return(
    <div className={classnames}>
        <Card className={`flex justify-center items-center rounded-md ${className} ${icon ? directionClassName : ''}`} noBlur noPadding {...cardProps} style={cardProps.style}>
            { icon && <div className='flex items-center'>{ icon }</div> }
            <input className={inputClassName} onChange={inputUpdated} placeholder={placeholder} value={value} disabled={disabled} type={type} size={size} maxLength={maxLength} style={cardProps.style}></input>
        </Card>
    </div>
    )
}