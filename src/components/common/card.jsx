import './card.css'
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './theme-context';

export default function Card({children, noPadding, noBlur = false, appearance = 'glass', color = 'neutral', intensity, dark = true, onClick, className, style}){
    
    let [classNames, setClassNames] = useState("")
    let [cardStyle, setCardStyle] = useState({})
    const {theme} = useContext(ThemeContext)
    
    useEffect(() => {

        let intensityValue = intensity
    
        if (intensityValue === undefined){
            intensityValue = theme === 'dark' ? 600 : 300;
        }
    
        setCardStyle({
            "--glass-color": `var(--color-${color}-${intensityValue})`,
            "--card-text-color": `var(--color-${color}-${dark ? '100' : '800'})`,
            backdropFilter: appearance === 'glass' && !noBlur ? 'blur(10px)' : undefined,
            ...style
        });

        let rounded = 'rounded-md'

        if (className){
            const roundedMatch = className.match(/rounded\-[a-z0-9]+/g)
            if (roundedMatch){
                rounded = roundedMatch[roundedMatch.length - 1]
            }
        }

        setClassNames(`card ${rounded} ${appearance} ${className} ${noPadding ? '' : 'p-[2rem]'}`)

       
    }, [color, intensity, dark, appearance, noBlur, className, theme])

    return(
        <article className={classNames} style={cardStyle} onClick={onClick}>
            {children}
        </article>
    )

}
