import { InsertReminder, UpdateReminder } from "@/types";

export async function fetchReminders() {
    try {
        const response = await fetch('http://192.168.1.53:1100/reminders');
        const data = await response.json();
        return data ?? [];
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
export async function getRemindersById(id: number) {
    try {
        const response = await fetch(`http://192.168.1.53:1100/reminders/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export async function completeReminder(reminderId: number, isCompleted: boolean) {
    try {
        const response = await fetch(`http://192.168.1.53:1100/reminders/${reminderId}`, {
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
        const response = await fetch(`http://192.168.1.53:1100/reminders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReminder),
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export async function updateOldReminder(id: number, updatedReminder: UpdateReminder) {
    const response = await fetch(`http://192.168.1.53:1100/reminders/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedReminder)
    })

    if (!response.ok) {
        throw new Error('Failed to update a reminder')
    };

    return response.json()
}

export async function deleteReminder(id: number) {
    const response = await fetch(`http://192.168.1.53:1100/reminders/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error('Failed to update a reminder')
    };

    return response.json()
}