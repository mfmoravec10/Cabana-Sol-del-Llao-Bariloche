const calendarStyle = document.createElement('style');
calendarStyle.textContent = '.calendar-title button{background:#21362b;border:0;color:#fff;cursor:pointer;font-size:1rem;height:34px;width:34px}.calendar-days .available{background:#dce8df}.calendar-days .occupied{background:#e8c8c8;color:#702222}.calendar-legend{display:flex;gap:18px;margin-top:20px}.calendar-legend span{align-items:center;display:flex;font-size:.72rem;gap:7px}.calendar-legend i{display:inline-block;height:12px;width:12px}.calendar-legend .available{background:#dce8df}.calendar-legend .occupied{background:#e8c8c8}';
document.head.append(calendarStyle);

const bookingOccupiedRanges = [
  { start: '2026-09-12', end: '2026-09-15' },
  { start: '2026-09-22', end: '2026-10-01' },
  { start: '2026-12-26', end: '2027-01-02' },
  { start: '2027-02-06', end: '2027-02-16' },
  { start: '2027-06-01', end: '2028-03-10' }
];

const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const calendarMonth = document.querySelector('#calendar-month');
const calendarDays = document.querySelector('#calendar-days');
let viewedMonth = new Date(2026, 8, 1);

function isoDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function isOccupied(date) {
  return bookingOccupiedRanges.some(({ start, end }) => date >= start && date < end);
}

function renderCalendar() {
  const year = viewedMonth.getFullYear();
  const month = viewedMonth.getMonth();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  calendarMonth.textContent = `${monthNames[month]} ${year}`;
  calendarDays.innerHTML = '';

  for (let blank = 0; blank < firstDay; blank += 1) calendarDays.insertAdjacentHTML('beforeend', '<span class="empty"></span>');
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = isoDate(year, month, day);
    const status = isOccupied(date) ? 'occupied' : 'available';
    const label = isOccupied(date) ? 'Ocupada según Booking' : 'Disponible según Booking';
    calendarDays.insertAdjacentHTML('beforeend', `<span class="${status}" aria-label="${day} de ${monthNames[month]}: ${label}">${day}</span>`);
  }
}

document.querySelector('#previous-month').addEventListener('click', () => { viewedMonth.setMonth(viewedMonth.getMonth() - 1); renderCalendar(); });
document.querySelector('#next-month').addEventListener('click', () => { viewedMonth.setMonth(viewedMonth.getMonth() + 1); renderCalendar(); });
renderCalendar();
