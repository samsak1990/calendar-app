export const getEventsCountForDay = (date, reminders) => {
    if (!date || !reminders) return 0;

    const targetDate = date.toDateString();
    const parseReminders = Object.values(reminders)[0]
    const arrayDay = []
    for(let rem in parseReminders){
        if (!parseReminders[rem].reminder_on_datetime) return false;
        const reminderDate = new Date(parseReminders[rem].reminder_on_datetime).toDateString();
        if(reminderDate === targetDate) arrayDay.push(parseReminders[rem]) ;
        
    }
    return arrayDay.length
};