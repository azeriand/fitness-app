
export default function Avatar({src, className, style}){
    
    return(
        <img className={`size-[3rem] rounded-2xl ${className}`} src={src} style={style}/>
    )
}