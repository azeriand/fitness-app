import './input.css'
import Card from '../components/card'

export default function Input({type, fitWidth, noPadding, roundes, appearance, color, intensity}){
    return(
    <div className='input'>
        <Card noPadding>
            <input type={type}></input>
        </Card>
    </div>
    )
}