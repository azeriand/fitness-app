import './section-name.css'

export default function SectionName({section, size}){

    const sectionStyle = {
        fontSize: ''
    }

    if (size === "sm"){
        sectionStyle.fontSize = '0.75rem'
    }

    return(
        <div className='uppercase font-bold tracking-[0.15rem] w-fit section-name' style={sectionStyle}>
            {section}
        </div>
    )
}