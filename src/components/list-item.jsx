import './list-item.css'

export default function ListItem({label, logo, onItemClicked}){
    return(
        <>
            <div className='list-item' onClick={onItemClicked}>
                {logo}
                {label}
            </div>
            <hr/>
        </>
    )
}