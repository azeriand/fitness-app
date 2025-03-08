import './badge.css'
import Card from './card'

export default function Badge({label, color, intensity}){
    return(
        <Card fitWidth noPadding rounded='s' color={color} intensity ={intensity}>
            <div className='badge'>
                {label}
            </div>
        </Card>
    )
}