import './card.css'

export default function CardStyle({children, fitWidth, noPadding, sharped, appearance}){
    if (typeof appearance === 'undefined') {
        appearance = 'glass'
    }
    const cardStyle = {
        width: '',
        padding: '2rem',
        borderRadius: '20px',
    }

    if (fitWidth === true){
        cardStyle.width = 'fit-content'
    }

    if (noPadding === true){
        cardStyle.padding = ''
    }

    if (sharped === true){
        cardStyle.borderRadius = '5px'
    }

    const classNames = "card " + appearance

    return(
    <article className={classNames} style={cardStyle}>
        {children}
    </article>
    )
}
