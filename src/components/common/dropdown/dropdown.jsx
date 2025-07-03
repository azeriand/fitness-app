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
        <div tabIndex="0" className='relative w-fit' onBlur={() => setOpen(false)}>
            <DropdownButton toggle={toggleDropdown} open={open}>{ optionSelected }</DropdownButton>
            {
                open &&
                <Card noBlur appearance='mate' className="absolute flex flex-col items-center p-[1rem] mt-[0.5rem] bg-white rounded-lg overflow-y-scroll dropdown-content">
                    {
                        options.map(option => (
                            <div key={option} className='p-[0.5rem] m-[0.1rem] w-full rounded-lg cursor-pointer' onMouseDown={() => itemClicked(option)}>
                                {option}
                            </div>
                        ))
                    }
                </Card>
            }
        </div>
    )
}