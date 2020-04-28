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
  clone.setMinutes(date.getMinutes() + minutes);
  return clone;
}

export function setTime(date: Date, time: Date): Date {
  const clone = cloneDate(date);
  clone.setHours(time.getHours());
  clone.setMinutes(time.getMinutes());
  clone.setSeconds(time.getSeconds());
  clone.setMilliseconds(time.getMilliseconds());
  return clone;
}

export function getDate(params: { date?: Date, hour?: number, minute?: number}) {
  const newDate = params.date ? new Date(params.date) : new Date();
  if (params?.hour) newDate.setHours(params.hour);
  if (params?.minute) newDate.setMinutes(params.minute);
  return newDate;
}
