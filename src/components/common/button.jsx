import './button.css'
import Card from './card'

export default function BasicButton({children, label, icon, fullWidth, position='left', onClick, ...cardProps}){
   const buttonStyle = {
    width: ''
   }

   let classNames = `basic-button`

   if (fullWidth){
    buttonStyle.width = '100%'
   }

   const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '0.40rem',
    height: '2.5rem',
    minWidth: '2.5rem',
    boxSizing: 'border-box',
    padding: 0,
}

    if (label) {
        cardStyle.padding = '0 1rem'
    }
   
    return(
        <button style={buttonStyle} className={classNames} onClick={onClick}>
            <Card noBlur rounded='md' style={cardStyle} {...cardProps}>
                {position === 'left' && icon}
                {label}
                {children}
                {position === 'right' && icon}
            </Card>
        </button>
    )
}