import { Card } from 'azeriand-library'

function basicCard({title, src, color, intensity, ...cardProps}){

    return(
        <Card noBlur intensity={500} {...cardProps}>
            <div className='flex h-8 w-28'>
                <img  className='h-full rounded-[20px]' src={src} alt='imagen ejercicio'/>
                <aside className='w-full h-full justify-center content-center text-[2rem] font-bold'>{title}</aside>
            </div>
        </Card>
    )
}

export default basicCard