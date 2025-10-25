import { Badge } from 'azeriand-library';
import MuscleList from '../data/muscles';

export default function ColorBadge({...BadgeProps}) {

    const findMuscle = MuscleList.find((muscle) => muscle.name.toLowerCase() === BadgeProps.label.toLowerCase());
    const exactColor = findMuscle ? findMuscle.color : '';

    return(

        <Badge {...BadgeProps} color={exactColor}/>
    )
}