export const getEventsCountForDay = (date, reminders) => {
    if (!date || !reminders || typeof reminders !== 'object') return 0;

    const targetDate = date.toDateString();
    const destRem = Object.values(reminders)[0]
    const arrayDay = []
    for(let rem in destRem){
        // console.log(destRem[rem])
        if (!destRem[rem].reminder_on_datetime) return false;
        const reminderDate = new Date(destRem[rem].reminder_on_datetime).toDateString();
        if(reminderDate === targetDate) arrayDay.push(destRem[rem]) ;
        
    }
    return arrayDay.length
};