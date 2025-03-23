import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import Card from './card'
import './calendar-view.css'
import dayjs from "dayjs";

function CustomDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
    const isSelected = highlightedDays.some((date) => day.isSame(date, "day"));
  
    return (
    <PickersDay {...other} day={day} selected={isSelected} outsideCurrentMonth={outsideCurrentMonth}         sx={{
        ...(isSelected && {
          backgroundColor: "white !important", // Make selected day white
          color: "black !important", // Text color to black for contrast
        }),
      }} />
    );
  }

export default function CalendarView({selectedDates}){
    const theme = createTheme({
        palette: {
            mode: "dark"
        },
    });
    return(
        <ThemeProvider theme={theme}>
            <DateCalendar
                slots={{ day: CustomDay }}
                slotProps={{
                day: { highlightedDays: selectedDates ? selectedDates.map(dayjs) : [] },
                }}
            />
        </ThemeProvider>
    )
}