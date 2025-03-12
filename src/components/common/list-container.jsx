import './list-container.css'
import SectionName from './section-name'

export default function List({children, name}){
    return(
        <div>
             <SectionName section={name}/>
            <ul className='list'>
                {children}
            </ul>
        </div>
    )
}