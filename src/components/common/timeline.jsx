import './timeline.css'
import Card from './card'

export default function Timeline({children, faded, ...cardProps}){
    const timelineStyle = {
        overflowY: 'none',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%)',
    }

    return(
        <Card className='rounded-sm' noPadding appearance='ghost' {...cardProps} style={{...cardProps.style, ...timelineStyle}}>
            <ul className='vertical-line list-disc font-bold text-start relative' style={{paddingInlineStart: 20}}>
                {children}
            </ul>
        </Card>
    )
}