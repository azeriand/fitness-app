import { Card } from 'azeriand-library'

export default function Badge({label, ...cardProps}){
    return(
        <Card noBlur noPadding className='rounded-sm w-fit' {...cardProps}>
            <div className='px-0.5 py-0.10 text-[0.5rem] font-bold'>
                {label}
            </div>
        </Card>
    )
}