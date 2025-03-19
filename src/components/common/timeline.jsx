import './timeline.css'

export default function Timeline({children}){
    return(
        <div className='timeline'>
            <ul>
                {children}
            </ul>
        </div>
    )
}