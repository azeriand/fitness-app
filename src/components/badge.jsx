import './badge.css'
import Card from './card'

export default function Badge({label}){
    return(
        <Card fitWidth noPadding sharped>
            <div className='badge'>
                {label}
            </div>
        </Card>
    )
}