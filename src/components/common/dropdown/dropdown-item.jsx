import './dropdown-item.css'

export default function DropdownItem({children, onClick}){
    return(
        <div className='dropdown-item' onClick={onClick}>
            {children}
        </div>
    )
}