import './tab.css'
import './tab-item.css'
import { useState } from 'react'
import Card from './card'
import SectionName from './section-name'
import Button from './button'

export default function Tab({items, onTabSelected}){
    const [tabSelected, setTabSelected] = useState(null);

    const selectTab = (item) => {
        setTabSelected(item)
        onTabSelected(item)
    }
    return(
        <>
            <SectionName section='Filter by'/>
            <Card noPadding fitWidth rounded='md'>
                <div className='flex-buttons'>
                    {
                        items.map(item => <Button onClick={() => selectTab(item)} key={item} appearance={item === tabSelected ? 'mate' : 'ghost'} label={item}/>)
                    }
                </div>
            </Card>

        </>
    )
}