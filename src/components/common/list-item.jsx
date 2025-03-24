import './list-item.css'
import Card from './card'

export default function ListItem({label, logo, onItemClicked, ...cardProps}){
    return(
        <>
            <Card appearance='ghost' rounded='md' noPadding onClick={onItemClicked} {...cardProps}>
                <div  className='list-item'>
                    {logo}
                    {label}
                </div>
            </Card>
            <hr/>
        </>
    )
}