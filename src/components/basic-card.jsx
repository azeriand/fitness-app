import './basic-card.css'
import Card from './card'

function basicCard({title, src}){

    return(
        <Card>
            <div className='basic-card'>
                <img  className='img-card' src={src} alt='imagen ejercicio'/>
                <aside className='name-card'>{title}</aside>
            </div>
        </Card>
    )
}

export default basicCard