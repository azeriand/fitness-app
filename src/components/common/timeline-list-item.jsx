
import Card from './card'


export default function TlListItem({label, badge, ...cardProps}){
    return(
        <li>
            <Card noBlur appearance='ghost' noPadding {...cardProps}>
                <div className='flex justify-between items-center gap-x-[1rem] text-[1rem]'>
                    {label}
                    {badge}
                </div>
            </Card>
        </li>
    )
}