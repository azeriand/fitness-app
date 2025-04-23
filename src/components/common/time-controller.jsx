import './time-controller.css'
import Card from './card'
import Button from './button'
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";

export default function TimeController(){
    return(
        <Card noPadding fitWidth>
            <div className='flex'>
                <div className='routine-time'>12:26</div>
                <div className='stop-play'>
                    <Button icon={<FaPause/>} appearance='ghost'/>
                    <Button icon={<FaStop/>} appearance='mate'/>
                </div>
            </div>
        </Card>
    )
}