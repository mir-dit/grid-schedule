const months = ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'];
const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export function tableDateFilter() {
  return (date: Date) => {
    return days[date.getDay()] + '. ' + date.getDate() + ' ' +  months[date.getMonth()];
  }
}
