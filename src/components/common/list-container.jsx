
import './list-item.css'
import Card from './card.jsx'
import SectionName from './section-name'
import { useState } from 'react'

export default function List({children, onListItemSelected, name, defaultValue, items, ...cardProps}){

    const [listItemSelected, setListItemSelected] = useState(defaultValue ?? items[0]);

    const onItemClicked = (item) => {
        setListItemSelected(item);
        onListItemSelected(item);
    }

    return(
        <div>
             <SectionName section={name}/>
            <ul className='list-none ps-[0]'>
                {items.map((item, index)=>
                    <div key={item.label}>
                        <Card className='rounded-md' noBlur appearance={item.destination === listItemSelected.destination ? 'mate' : 'ghost'} noPadding onClick={() => onItemClicked(item)} {...cardProps}>
                            <div  className='font-bold text-[1.5rem] pl-[1rem] py-[0.3rem] flex items-center gap-x-[0.5rem] content-start'>
                                {item.logo}
                                {item.label}
                            </div>
                        </Card>
                        <hr className='m-0 bg-white'/>
                    </div>
                 )}
            </ul>
        </div>
    )
}