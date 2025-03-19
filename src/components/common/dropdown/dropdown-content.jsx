import './dropdown-content.css'

export default function DropdownContent({children, open}){
    return(
        <div className={`dropdown-content ${open ? "content-open" : null}`}>{children}</div>
    )
}