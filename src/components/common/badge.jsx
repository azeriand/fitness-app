import './badge.css'
import Card from './card'

export default function Badge({label, ...cardProps}){
    return(
        <Card fitWidth noPadding rounded='s' {...cardProps}>
            <div className='badge'>
                {label}
            </div>
        </Card>
    )
}