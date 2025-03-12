import './list-item.css'
import Card from './card'

export default function ListItem({label, logo, onItemClicked}){
    return(
        <>
            <Card appearance='ghost' rounded='md' noPadding onClick={onItemClicked}>
                <div  className='list-item'>
                    {logo}
                    {label}
                </div>
            </Card>
            <hr/>
        </>
    )
}