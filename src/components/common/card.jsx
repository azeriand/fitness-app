import './card.css'
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './theme-context';

export default function Card({children, fitWidth, fullWidth, noPadding, rounded, noBlur = false, appearance = 'glass', color = 'neutral', intensity, dark = true, onClick, className, style}){
    
    let [classNames, setClassNames] = useState("")
    let [cardStyle, setCardStyle] = useState({})
    const {theme} = useContext(ThemeContext)

    const roundedMap = {
        s: '5px',
        md: '10px'
    }

    useEffect(() => {

        let intensityValue = intensity
    
        if (intensityValue === undefined){
            intensityValue = theme === 'dark' ? 600 : 300;
        }
    
        setCardStyle({
            "--glass-color": `var(--color-${color}-${intensityValue})`,
            "--card-text-color": `var(--color-${color}-${dark ? '100' : '800'})`,
            width: fitWidth ? 'fit-content' : fullWidth ? '100%' : '',
            padding: noPadding ? '' : '2rem',
            borderRadius: roundedMap[rounded] ?? '20px',
            backdropFilter: appearance === 'glass' && !noBlur ? 'blur(10px)' : undefined,
            ...style
        });

        setClassNames(`card ${appearance} ${className}`)
    
    }, [color, intensity, dark, appearance, noBlur, className, fitWidth, fullWidth, rounded, theme])

    return(
        <article className={classNames} style={cardStyle} onClick={onClick}>
            {children}
        </article>
    )

}
