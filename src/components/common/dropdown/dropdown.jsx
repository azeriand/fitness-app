import './dropdown.css'
import DropdownButton from './dropdown-button'
import Card from '../card'
import { useState } from 'react';

export default function Dropdown({buttonText, options, onSelected}){

    const [open, setOpen] = useState(false);
    const [optionSelected, setOptionSelected] = useState(false);
    
    const toggleDropdown = () => {
        setOpen(open => !open);
    }

    const itemClicked = (option) => {
        setOptionSelected(option);
        onSelected(option);
    }

    return(
        <div className='dropdown'>
            <DropdownButton toggle={toggleDropdown} open={open}>{ optionSelected }</DropdownButton>
            <Card appearance='mate' className={`dropdown-content ${open ? "content-open" : null}`}>
                {
                    options.map(option => (
                        <div key={option} className='dropdown-item' onClick={() => itemClicked(option)}>
                            {option}
                        </div>
                    ))
                }
            </Card>
        </div>
    )
}