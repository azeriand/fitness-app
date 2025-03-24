import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import './dropdown-button.css'
import BasicButton from '../button'

export default function DropdownButton({children, open, toggle}){
    return(
        <BasicButton onClick={toggle} className={`dropdown-btn ${open ? "button-open" : null}`}>
            {children}
            <span className='toggle-icon'>
                {open ? <FaChevronUp/> : <FaChevronDown/>}
            </span>
        </BasicButton>
    )
}