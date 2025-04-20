import './stats.css'
import Tab from "../components/common/tab";
import Button from "../components/common/button"

export default function Stats(){

    const tabsItems = ['Last Trainings', 'Muscle Groups', 'Per Exercise'];

    return(
        <>
            <p className='page-name'>Stats</p>
            <Tab items={tabsItems}/>
            <div className='lastTrainingsFlex'>
                <p>Last Trainings</p>
                <Button label='132 Trainings'/>
            </div>
        </>
    )
}