export function cloneDate(date: Date): Date {
  return new Date(date.valueOf());
}

export function addDays(date: Date, days: number): Date {
  const clone = cloneDate(date);
  clone.setDate(date.getDate() + days);
  return clone;
}

export function addMinutes(date: Date, minutes: number): Date {
  const clone = cloneDate(date);
  clone.setMinutes(date.getMinutes() + minutes );
  return clone;
}

export function setTime(date: Date, time: Date): Date {
  const clone = cloneDate(date);
  clone.setHours(time.getHours());
  clone.setMinutes(time.getMinutes());
  clone.setSeconds(time.getSeconds());
  return clone;
}
