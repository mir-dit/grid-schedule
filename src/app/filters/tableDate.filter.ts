const months = ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июн.', 'июл.', 'сен.', 'окт.', 'ноя.', 'дек.'];
const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export function tableDate() {
  return (date: Date) => {
    return days[date.getDay()] + '. ' + date.getDate() + ' ' +  months[date.getMonth()];
  }
}
