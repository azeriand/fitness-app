import { FaDumbbell } from "react-icons/fa";
import Card from '../components/common/card'
import { color } from "chart.js/helpers";

export default function Logo() {
    const logoWrapper = {
        display: 'flex',
        alignItems: 'center',
        columnGap: '.5rem',
        padding: '1rem'
    }
    const logoStyle = {
        padding: '.5rem'
        
    }
    const iconStyle = {
        width: '2rem',
        height: '2rem',
        fill: 'url(#gradient)'
    }
    return (
        <>
            <div style={logoWrapper}>
                <svg width="0" height="0">
                    <linearGradient id="gradient" x1="100%" y1="75%" x2="0%" y2="0%">
                        <stop stopColor="rgba(63, 94, 251, .8)" offset="0%" />
                        <stop stopColor="rgba(252, 70, 107, .6)" offset="100%" />
                    </linearGradient>
                </svg>
                    <FaDumbbell style={iconStyle}></FaDumbbell>
                    <div style={{ fontWeight: 'bold' }}>FitnessTracker</div>
            </div>
        </>
    )
}