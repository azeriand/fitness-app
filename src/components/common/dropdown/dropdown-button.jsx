import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import './dropdown-button.css'
import Button from '../button'

export default function DropdownButton({children, open, toggle}){
    return(
        <Button onClick={toggle} className={`cursor-pointer ${open ? "button-open" : null}`}>
            {children}
            <span className='flex items-center content-center ml-[1rem]'>
                {open ? <FaChevronUp/> : <FaChevronDown/>}
            </span>
        </Button>
    )
}