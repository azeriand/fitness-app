
import Card from './card'
import Button from './button'
import { FaPause } from "react-icons/fa";
import { FaStop } from "react-icons/fa";

export default function TimeController(){
    return(
        <Card className='w-fit' noPadding>
            <div className='flex items-center justify-between p-[0.5rem] gap-x-[7rem]'>
                <div className='text-[1.5rem] font-bold'>12:26</div>
                <div className='flex items-center'>
                    <Button icon={<FaPause/>} appearance='ghost'/>
                    <Button icon={<FaStop/>} appearance='mate'/>
                </div>
            </div>
        </Card>
    )
}