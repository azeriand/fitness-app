import './card.css'

export default function CardStyle({children, fitWidth, noPadding, rounded, appearance = 'glass', color = 'neutral', intensity = 300}){
    const cardStyle = {
        "--glass-color": `var(--color-${color}-${intensity})`,
        width: '',
        padding: '2rem',
        borderRadius: '20px',
    };

    if (fitWidth === true){
        cardStyle.width = 'fit-content'
    }

    if (noPadding === true){
        cardStyle.padding = ''
    }

    if (rounded === 's'){
        cardStyle.borderRadius = '5px'
    }
    else if (rounded === 'md')
        cardStyle.borderRadius = '10px'

    const classNames = "card " + appearance

    return(
    <article className={classNames} style={cardStyle}>
        {children}
    </article>
    )
}
