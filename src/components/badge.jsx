import './badge.css'
import Card from './card'

export default function Badge({label}){
    return(
        <Card fitWidth noPadding rounded='s'>
            <div className='badge'>
                {label}
            </div>
        </Card>
    )
}