import './button.css'
import Card from './card'

export default function BasicButton({label, appearance, onButtonClicked}){
    return(
        <button className='basic-button' onClick={onButtonClicked}>
            <Card noPadding rounded='md' appearance={appearance}>{label}</Card>
        </button>
    )
}