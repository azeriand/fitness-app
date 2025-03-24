import './timeline-list-item.css'
import Card from './card'
import Badge from './badge'

export default function TlListItem({label, badge, ...cardProps}){
    return(
        <li>
            <Card appearance='ghost' noPadding {...cardProps}>
                <div className='tl-li'>
                    {label}
                    {badge}
                </div>
            </Card>
        </li>
    )
}