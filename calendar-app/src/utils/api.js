
export async function fetchReminders(url, t_user_id, token) {
  const res = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({t_user_id}),
  });

  if (!res.ok) {
    throw new Error('Ошибка при загрузке напоминаний');
  }
  return await res.json();
}
