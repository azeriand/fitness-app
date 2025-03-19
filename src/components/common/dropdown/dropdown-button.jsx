import { FaChevronDown } from 'react-icons/fa'
import './dropdown.css'
import { FaCircleChevronUp } from 'react-icons/fa6'

export default function DropdownButton({children, open, toggle}){
    return(
        <div onClick={toggle} className={`dropdown-btn ${open ? "button-open" : null}`}>
            {children}
            <span className='toggle-icon'>
                {open ? <FaCircleChevronUp/> : <FaChevronDown/>}
            </span>
        </div>
    )
}