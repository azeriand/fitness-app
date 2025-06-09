import './button.css'
import Card from './card'

export default function BasicButton({children, label, icon, position='left', onClick, size, className, ...cardProps}){

    let cardClassNames = 'flex justify-center items-center gap-x-[0.40rem] h-[2.5rem] min-w-[2.5rem] box-border p-0 rounded-md'

    if (label) {
        cardClassNames += ' px-0 py-1'
    }

    

    if (className){
        const roundedMatch = className.match(/rounded\-[a-z]+/g)
        if (roundedMatch){
            cardClassNames += ' ' + roundedMatch[roundedMatch.length-1]
        }
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
            <Card noBlur noPadding className={cardClassNames} {...cardProps}>
                {position === 'left' && icon}
                {label}
                {children}
                {position === 'right' && icon}
            </Card>
        </button>
    )
}