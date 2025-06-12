export const getRemindersForSelectedDate = (reminders, selectedDate) => {
    if (!reminders || !reminders.reminders) return [];

    return Object.values(reminders.reminders).filter(reminder => {
        if (!reminder.reminder_on_datetime || !reminder.reminder_text) return false;
        const reminderDate = new Date(reminder.reminder_on_datetime);
        return reminderDate.getFullYear() === selectedDate.getFullYear() &&
               reminderDate.getMonth() === selectedDate.getMonth() &&
               reminderDate.getDate() === selectedDate.getDate();
    });
};