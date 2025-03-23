import './sets-widget.css'
import { RxDragHandleDots2 } from "react-icons/rx";
import { TbDotsVertical } from "react-icons/tb";
import Goku from '../assets/goku.jpg'
import Badge from './common/badge'
import Dropdown from './common/dropdown/dropdown'
import Button from './common/button'
import Card from './common/card'
import Avatar from './common/avatar';
import RowSet from './common/row-set';
import Input from './common/input';
import SectionName from './common/section-name';

export default function SetsWidget({children}){
    return(
        <Card>
            <div className='header-sets'>
                <div className='avatar-sets'>
                    <Button icon={<RxDragHandleDots2/>} appearance='ghost'/>
                    <Avatar src={Goku} size='3' rounded='s'/>
                    <div>
                        <p className='exercise-title'>Chess Press</p>
                        <Badge label='Chest'/>
                    </div>
                </div>
                <div className='dropdown-sets'>
                    <Dropdown buttonText='Barbell'/>
                    <Button icon={<TbDotsVertical/>} appearance='ghost'/>
                </div>
                
            </div>
            <Card noPadding rounded='md'>
                <p className='exercise-notes'>Lore ipsum no se que, lo que siempre ponen aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
            </Card>
            <div className='sn-set'>
            </div>
            <div className='set-grid'>
                <SectionName fontSmall section='set'/>
                <SectionName fontSmall section='previous'/>
                <SectionName fontSmall section='reps'/>
                <SectionName fontSmall section='kg'/>
                <SectionName fontSmall section='done'/>
                {children}
            </div>
            <Button label='Add Set' color='blue' intensity='600' fullWidth/>
        </Card>
    )
}