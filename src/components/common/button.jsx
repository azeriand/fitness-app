import './button.css'
import Card from './card'

export default function BasicButton({children, label, icon, appearance, color, intensity, fullWidth, position= 'left', onButtonClicked}){
   const buttonStyle = {
    width: ''
   }

   let classNames = `basic-button ${icon && !label ? 'onlyIcon' : ''}`

   if (fullWidth){
    buttonStyle.width = '100%'
   }
   
    return(
        <button style={buttonStyle} className={classNames} onClick={onButtonClicked}>
            <Card noPadding rounded='md' appearance={appearance} color={color} intensity={intensity}>
                {position === 'left' && icon}
                {label}
                {children}
                {position === 'right' && icon}
            </Card>
        </button>
    )
}