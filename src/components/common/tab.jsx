import './tab.css'
import './tab-item.css'
import { useState } from 'react'
import Card from './card'
import SectionName from './section-name'
import Button from './button'

export default function Tab({items, onTabSelected, defaultValue, ...cardProps}){
    const [tabSelected, setTabSelected] = useState(defaultValue);

    const selectTab = (item) => {
        setTabSelected(item)
        onTabSelected(item)
    }
    
    return(
        <>
            <SectionName section='Filter by'/>
            <Card noBlur noPadding fitWidth rounded='md' {...cardProps} color='blue'>
                <div className='flex-buttons'>
                    {
                        items.map(item => <Button onClick={() => selectTab(item)} color='blue' key={item} appearance={item === tabSelected ? 'mate' : 'ghost'} dark={item === tabSelected ? false : true } label={item}/>)
                    }
                </div>
            </Card>

        </>
    )
}