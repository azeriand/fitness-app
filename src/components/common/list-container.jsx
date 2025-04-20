import './list-container.css'
import './list-item.css'
import Card from './card.jsx'
import SectionName from './section-name'
import { useState } from 'react'

export default function List({children, onListItemSelected, name, defaultValue, items, ...cardProps}){

    const [listItemSelected, setListItemSelected] = useState(defaultValue ?? items[0]);

    const onItemClicked = (item) => {
        setListItemSelected(item);
        onListItemSelected(item);
        console.log('item clicked')
    }

    return(
        <div>
             <SectionName section={name}/>
            <ul className='list'>
                {items.map(item =>
                    <>
                        <Card noBlur appearance={item.destination === listItemSelected.destination ? 'mate' : 'ghost'} rounded='md' noPadding onClick={() => onItemClicked(item)} {...cardProps}>
                            <div  className='list-item'>
                                {item.logo}
                                {item.label}
                            </div>
                        </Card>
                        <hr/>
                    </>
                 )}
            </ul>
        </div>
    )
}