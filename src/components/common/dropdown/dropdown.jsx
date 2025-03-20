import './dropdown.css'
import DropdownButton from './dropdown-button'
import Card from '../card'
import { useState } from 'react';

export default function Dropdown({buttonText, options, onSelected}){

    const [open, setOpen] = useState(false);
    const [optionSelected, setOptionSelected] = useState(buttonText);
    
    const toggleDropdown = () => {
        setOpen(open => !open);
    }

    const itemClicked = (option) => {
        setOptionSelected(option);
        onSelected(option);
        setOpen(false);
    }

    return(
        <div tabIndex="0" className='dropdown' onBlur={() => setOpen(false)}>
            <DropdownButton toggle={toggleDropdown} open={open}>{ optionSelected }</DropdownButton>
            {
                open &&
                <Card appearance='mate' className="dropdown-content">
                    {
                        options.map(option => (
                            <div key={option} className='dropdown-item' onClick={() => itemClicked(option)}>
                                {option}
                            </div>
                        ))
                    }
                </Card>
            }
        </div>
    )
}