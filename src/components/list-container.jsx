import { el } from '@faker-js/faker';
import './list-item.css'
import { Card } from 'azeriand-library'
import { SectionName } from 'azeriand-library'
import { useEffect, useState } from 'react'

export default function List({children, onListItemSelected, name, defaultValue, value, items, ...cardProps}){

    const [listItemSelected, setListItemSelected] = useState(defaultValue ?? items[0]);

    const onItemClicked = (item) => {
        setListItemSelected(item);
        onListItemSelected(item);
    }

    useEffect(() => {
        setListItemSelected(value);
    }, [value]);

    return(
        <div>
             <SectionName section={name}/>
            <ul className='list-none ps-[0] hover:cursor-pointer'>
                {items.map((item, index)=>
                    <div key={item.label}>
                        <Card className='rounded-md' color='purple' intensity={700} noBlur appearance={listItemSelected && item.destination === listItemSelected.destination ? 'glass' : 'ghost'} noPadding onClick={() => onItemClicked(item)} {...cardProps}>
                            <div  className='font-bold text-[1.5rem] text-purple-100 pl-[1rem] py-[0.3rem] flex items-center gap-x-[0.5rem] content-start'>
                                {item.logo}
                                {item.label}
                            </div>
                        </Card>
                    </div>
                 )}
            </ul>
        </div>
    )
}