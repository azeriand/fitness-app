import './section-name.css'

export default function SectionName({section, fontSmall}){

    const sectionStyle = {
        fontSize: ''
    }

    if (fontSmall === true){
        sectionStyle.fontSize = '0.75rem'
    }

    return(
        <div className='section-name' style={sectionStyle}>
            {section}
        </div>
    )
}