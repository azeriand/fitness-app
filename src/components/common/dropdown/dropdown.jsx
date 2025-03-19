import './dropdown.css'
import DropdownButton from './dropdown-button'
import DropdownContent from './dropdown-content'
import { useState } from 'react';

export default function Dropdown({buttonText, content}){

    const [open, setOpen] = useState(false);
    const toggleDropdown = () => {
        setOpen(open => !open);
    }

    return(
        <div className='dropdown'>
            <DropdownButton toggle={toggleDropdown} open={open}>{buttonText}</DropdownButton>
            <DropdownContent open={open}>{content}</DropdownContent>
        </div>
    )
}