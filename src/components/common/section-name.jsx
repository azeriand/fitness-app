import './section-name.css'

export default function SectionName({section, size}){

    const sectionStyle = {
        fontSize: ''
    }

    if (size === "sm"){
        sectionStyle.fontSize = '0.75rem'
    }

    return(
        <div className='section-name' style={sectionStyle}>
            {section}
        </div>
    )
}