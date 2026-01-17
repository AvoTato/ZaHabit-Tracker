const calendarEl = document.getElementById("calendar");
const monthYearEl = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

const streakEl = document.getElementById("streakCount");
const habitInput = document.getElementById("habitName");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitTitleEl = document.getElementById("habitTitle");
const habitListEl = document.getElementById("habitList");

const longestStreakEl = document.getElementById("longestStreak");
const totalCompletedEl = document.getElementById("totalCompleted");
const completionRateEl = document.getElementById("completionRate");
const monthlyConsistencyEl = document.getElementById("monthlyConsistency");

const dailyQuoteEl = document.getElementById("dailyQuote");
const newQuoteBtn = document.getElementById("newQuoteBtn");

// Data Structure
let data = JSON.parse(localStorage.getItem("multiHabitData")) || {
  habits: [],
  activeHabitId: null
};

// Current Date
let currentDate = new Date();

function saveData() {
  localStorage.setItem("multiHabitData", JSON.stringify(data));
}

// Add Habit
addHabitBtn.addEventListener("click", () => {
  const name = habitInput.value.trim();
  if (!name) return alert("Enter a habit");

  const newHabit = {
    id: Date.now(),
    name,
    completed: {}
  };

  data.habits.push(newHabit);
  data.activeHabitId = newHabit.id;
  habitInput.value = "";
  saveData();
  renderHabits();
  renderCalendar();
});

// Render Habit List
function renderHabits() {
  habitListEl.innerHTML = "";

  data.habits.forEach(habit => {
    const el = document.createElement("div");
    el.className = "habit-item";
    if (habit.id === data.activeHabitId) el.classList.add("active");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = habit.name;

    // Delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "✖";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent selecting habit when deleting

      const confirmDelete = confirm(`Delete habit "${habit.name}"?`);
      if (!confirmDelete) return;

      data.habits = data.habits.filter(h => h.id !== habit.id);

      if (data.activeHabitId === habit.id) {
        data.activeHabitId = data.habits.length ? data.habits[0].id : null;
      }

      saveData();
      renderHabits();
      renderCalendar();
    });

    el.addEventListener("click", () => {
      data.activeHabitId = habit.id;
      saveData();
      renderHabits();
      renderCalendar();
    });

    el.appendChild(nameSpan);
    el.appendChild(deleteBtn);
    habitListEl.appendChild(el);
  });
}


function getActiveHabit() {
  return data.habits.find(h => h.id === data.activeHabitId);
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Calendar
function renderCalendar() {
  const habit = getActiveHabit();
  calendarEl.innerHTML = "";

  if (!habit) {
    habitTitleEl.textContent = "Select a habit";
    return;
  }

  habitTitleEl.textContent = `Habit: ${habit.name}`;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYearEl.textContent = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Empty slots
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    calendarEl.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const key = `${year}-${month + 1}-${day}`;
    const dayEl = document.createElement("div");
    dayEl.className = "day";
    dayEl.textContent = day;

    if (habit.completed[key]) {
      dayEl.classList.add("completed");
    }

    dayEl.addEventListener("click", () => {
      habit.completed[key] = !habit.completed[key];
      saveData();
      renderCalendar();
    });

    calendarEl.appendChild(dayEl);
  }

  calculateStats(habit);
}


// Statistics
function calculateStats(habit) {
  // Current streak
  let streak = 0;
  const today = new Date();
  for (let i = 0; ; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    if (habit.completed[key]) streak++;
    else break;
  }
  streakEl.textContent = streak;

  // Total completed
  const completedDays = Object.values(habit.completed).filter(Boolean).length;
  totalCompletedEl.textContent = completedDays;

  // Completion rate
  const totalDays = Object.keys(habit.completed).length;
  const rate = totalDays ? ((completedDays / totalDays) * 100).toFixed(1) : 0;
  completionRateEl.textContent = `${rate}%`;

  // Longest streak
  longestStreakEl.textContent = getLongestStreak(habit);

  // Monthly consistency
  monthlyConsistencyEl.textContent = `${getMonthlyConsistency(habit)}%`;
}

function getLongestStreak(habit) {
  let longest = 0, current = 0;
  const dates = Object.keys(habit.completed).sort((a, b) => new Date(a) - new Date(b));
  for (const date of dates) {
    if (habit.completed[date]) current++;
    else current = 0;
    if (current > longest) longest = current;
  }
  return longest;
}

function getMonthlyConsistency(habit) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  let total = 0, done = 0;

  for (const key in habit.completed) {
    const [y, m] = key.split("-").map(Number);
    if (y === year && m === month) {
      total++;
      if (habit.completed[key]) done++;
    }
  }

  return total ? ((done / total) * 100).toFixed(1) : 0;
}


// Daily Motivation
const quotes = [
  "Always remember why you started.",
  "Small steps every day lead to big results.",
  "Consistency beats motivation.",
  "You are building the future you want.",
  "Progress, not perfection.",
  "Your habits shape your destiny.",
  "One day or day one. You decide.",
  "Discipline is choosing what you want most.",
  "You showed up today. That matters.",
  "Success is built on tiny daily wins.",
  "Your future self will thank you.",
  "Don’t break the chain.",
  "The hardest part is showing up.",
  "Habits turn goals into reality."
];

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// Show one quote per day (stored in localStorage)
function loadDailyQuote() {
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem("quoteDate");
  const savedQuote = localStorage.getItem("dailyQuote");

  if (savedDate === today && savedQuote) {
    dailyQuoteEl.textContent = savedQuote;
  } else {
    const newQuote = getRandomQuote();
    localStorage.setItem("dailyQuote", newQuote);
    localStorage.setItem("quoteDate", today);
    dailyQuoteEl.textContent = newQuote;
  }
}

// Get a new random quote
newQuoteBtn.addEventListener("click", () => {
  const quote = getRandomQuote();
  dailyQuoteEl.textContent = quote;
});

// Load on startup
loadDailyQuote();
renderHabits();
renderCalendar();


