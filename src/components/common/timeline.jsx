import './timeline.css'

export default function Timeline({children}){
    return(
        <div>
            <ul>
                {children}
            </ul>
        </div>
    )
}