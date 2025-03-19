import './tab-item.css'
import Button from './button'

export default function TabItem({name, label, appearance, fullWidth}){
    return(
        <Button appearance={appearance} label={label}/>
    )
}