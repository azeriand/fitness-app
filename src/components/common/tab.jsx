import './tab.css'
import TabItem from './tab-item'
import Card from './card'
import SectionName from './section-name'

export default function Tab(){
    return(
        <>
            <SectionName section='Filter by'/>
            <Card noPadding fitWidth rounded='md'>
                <div className='flex-buttons'>
                    <TabItem name='last trainings' label='Last Trainings' appearance='ghost'/>
                    <TabItem name='muscle-groups' label='Muscle Groups' appearance='ghost'/>
                    <TabItem name='per-exercice' label='Per Exercice' appearance='ghost'/>
                </div>
            </Card>

        </>
    )
}