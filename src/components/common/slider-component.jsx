import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { Card } from 'azeriand-library'

export default function SliderComponent({defaultValue, onChange}){
    return (
        <Card noPadding appearance='ghost'>
            <Box sx={{ width: 150 }}>
                <Slider defaultValue={defaultValue} aria-label="Default" valueLabelDisplay="auto" onChange={onChange} />
            </Box>
        </Card>
    );
}