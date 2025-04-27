import './button.css'
import Card from './card'

export default function BasicButton({children, label, icon, position='left', onClick, size, className, ...cardProps}){

    let cardClassNames = 'flex justify-center items-center gap-x-[0.40rem] h-[2.5rem] min-w-[2.5rem] box-border p-0'

    if (label) {
        cardClassNames += ' px-0 py-1'
    }

    if (size === 'sm'){
        cardClassNames += ' h-[2rem] w-[2rem] min-w-auto'
    }

    const buttonClick = () => {
        if (typeof onClick === 'function') { 
            onClick()
        }
    }
   
    return(
        <button className={className} onClick={buttonClick}>
            <Card noBlur noPadding rounded='md' className={cardClassNames} {...cardProps}>
                {position === 'left' && icon}
                {label}
                {children}
                {position === 'right' && icon}
            </Card>
        </button>
    )
}