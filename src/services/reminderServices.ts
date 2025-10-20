import { InsertReminder } from "@/types";

export async function fetchReminders() {
    try {
        const response = await fetch('http://172.25.213.6:1100/reminders');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export async function completeReminder(reminderId: number, isCompleted: boolean) {
    try {
        const response = await fetch(`http://172.25.213.6:1100/reminders/${reminderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !isCompleted }),
        }
        )
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);

    }
}

export async function createReminder(newReminder: InsertReminder) {
    try {
        const response = await fetch(`http://172.25.213.6:1100/reminders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newReminder }),
        }
        )
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);

    }
}