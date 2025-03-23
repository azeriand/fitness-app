export default function() {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    let dates = [];
    let currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)
    
    while (currentWeekStart >= oneYearAgo) {
        let weekDates = [];
        let daysToPick = Math.floor(Math.random() * 2) + 3; // Pick 3, 4, or 5 days
        let chosenDays = new Set();
        
        while (chosenDays.size < daysToPick) {
            let randomDay = Math.floor(Math.random() * 7); // Random day from Sunday to Saturday
            chosenDays.add(randomDay);
        }
        
        chosenDays.forEach(dayOffset => {
            let date = new Date(currentWeekStart);
            date.setDate(currentWeekStart.getDate() + dayOffset);
            if (date <= today) {
                weekDates.push(date.toISOString().split('T')[0]); // Format YYYY-MM-DD
            }
        });
        
        dates = dates.concat(weekDates);
        currentWeekStart.setDate(currentWeekStart.getDate() - 7); // Move to the previous week
    }
    
    return dates;
}
