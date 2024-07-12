document.addEventListener('DOMContentLoaded', function () {
    const events = {
      '2024-07-13': [
        { time: '10:00 AM', description: 'Drink Boba and Chill' },
      ], // this is how you can insert events into the calendar
      '2024-07-20': [
        { time: '11:30 AM', description: 'Meetup Session' },
        { time: '3:00 PM', description: 'Giveaway' },
      ],
    };
  
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
  
    function renderCalendar(month, year) {
      const firstDay = new Date(year, month).getDay();
      const daysInMonth = 32 - new Date(year, month, 32).getDate();
  
      document.getElementById('month-year').innerText = `${monthNames[month]} ${year}`;
  
      const calendarDays = document.querySelector('.calendar-days');
      calendarDays.innerHTML = '';
  
      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarDays.appendChild(emptyCell);
      }
  
      for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.innerText = day;
        dayCell.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dayCell.addEventListener('click', showEvents);
  
        if (events[dayCell.dataset.date]) {
          dayCell.classList.add('has-events');
        }
  
        if (year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate()) {
          dayCell.classList.add('today');
        }
  
        calendarDays.appendChild(dayCell);
      }
    } 

    function showEvents(event) {
        const date = event.target.dataset.date;
        const eventsList = document.getElementById('events-list');
        eventsList.innerHTML = '';
    
        if (events[date]) {
          events[date].forEach(eventDetail => {
            const eventItem = document.createElement('li');
            eventItem.innerHTML = `<strong>${eventDetail.time}</strong>: ${eventDetail.description}`;
            eventsList.appendChild(eventItem);
          });
        } else {
          eventsList.innerHTML = '<li>No events</li>';
        }
      }
    
      document.getElementById('prev').addEventListener('click', function () {
        if (currentMonth === 0) {
          currentMonth = 11;
          currentYear--;
        } else {
          currentMonth--;
        }
        renderCalendar(currentMonth, currentYear);
      });
    
      document.getElementById('next').addEventListener('click', function () {
        if (currentMonth === 11) {
          currentMonth = 0;
          currentYear++;
        } else {
          currentMonth++;
        }
        renderCalendar(currentMonth, currentYear);
      });
    
      renderCalendar(currentMonth, currentYear);
    });
