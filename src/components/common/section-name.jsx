import './section-name.css'

export default function SectionName({section, className}){

    return(
        <div className={`uppercase font-bold tracking-[0.15rem] w-fit section-name ${className}`}>
            {section}
        </div>
    )
}