import { useState } from 'react'
import { Card } from 'azeriand-library'
import { SectionName } from 'azeriand-library'
import { Button } from 'azeriand-library'

export default function Tab({items, onTabSelected, defaultValue, ...cardProps}){
    const [tabSelected, setTabSelected] = useState(defaultValue);

    const selectTab = (item) => {
        setTabSelected(item)
        onTabSelected(item)
    }
    return (
        <>
            <SectionName section='Filter by'/>
            <Card className='rounded-md w-fit' noBlur noPadding {...cardProps} color='blue'>
                <div className='flex p-[0.4rem] gap-x-[0.5rem]'>
                    {
                        items.map(item => <Button key={item} onClick={() => selectTab(item)} color='blue' key={item} appearance={item === tabSelected ? 'mate' : 'ghost'} dark={item === tabSelected ? false : true } label={item}/>)
                    }
                </div>
            </Card>

        </>
    )
}