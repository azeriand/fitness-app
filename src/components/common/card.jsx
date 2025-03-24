import './card.css'

export default function CardStyle({children, fitWidth, fullWidth, noPadding, rounded, noBlur = false, appearance = 'glass', color = 'neutral', intensity = 300, onClick, className, style}){
    const cardStyle = {
        "--glass-color": `var(--color-${color}-${intensity})`,
        width: '',
        padding: '2rem',
        borderRadius: '20px',
        ...style
    };

    if (appearance === 'glass' && !noBlur) {
        cardStyle.backdropFilter = 'blur(10px)';
    }

    if (fitWidth === true){
        cardStyle.width = 'fit-content'
    }

    if (fullWidth === true){
        cardStyle.width = '100%'
    }

    if (noPadding === true){
        cardStyle.padding = ''
    }

    if (rounded === 's'){
        cardStyle.borderRadius = '5px'
    }
    else if (rounded === 'md'){
        cardStyle.borderRadius = '10px'
    }
    const classNames = `card ${appearance} ${className}`

    return(
    <article className={classNames} style={cardStyle} onClick={onClick}>
        {children}
    </article>
    )
}
