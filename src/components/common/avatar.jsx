
export default function Avatar({src, size, rounded}){
    const avatarStyle = {
        width: size + 'rem',
        height: size + 'rem',
        borderRadius: '20px'
    }

    if (rounded === 's'){
        avatarStyle.borderRadius = '5px'
    }
    else if (rounded === 'md'){
        avatarStyle.borderRadius = '10px'
    }

    return(
        <img className ='h-1 w-1' src={src} style={avatarStyle}/>
    )
}