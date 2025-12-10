document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('weekly-forecast');
	if (!container) return;

	const ICONS = {
		clear: '☀️', partly: '⛅', fog: '🌫️', rain: '🌧️', snow: '❄️', storm: '⛈️', default: '🌤️'
	};

	function codeToIcon(code) {
		if (code === 0) return ICONS.clear;
		if (code >= 1 && code <= 3) return ICONS.partly;
		if ([45,48].includes(code)) return ICONS.fog;
		if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code)) return ICONS.rain;
		if ([71,73,75,77].includes(code)) return ICONS.snow;
		if ([95,96,99].includes(code)) return ICONS.storm;
		return ICONS.default;
	}

	function shortDayName(dateStr) {
		return new Date(dateStr).toLocaleDateString(undefined, { weekday: 'short' });
	}

	function prettyDate(dateStr) {
		return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
	}

	function setCurrentDate() {
		const el = document.getElementById('current-date');
		if (!el) return;
		el.textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
	}

	function render(days) {
		setCurrentDate();
		container.innerHTML = '';
		const grid = document.createElement('div');
		grid.className = 'forecast-grid';
		days.forEach(d => {
			const card = document.createElement('div');
			card.className = 'forecast-day';
			card.innerHTML = `
				<div class="day-name">${shortDayName(d.date)}</div>
				<div class="date-text">${prettyDate(d.date)}</div>
				<div class="weather-icon">${codeToIcon(d.weathercode)}</div>
				<div class="temp-range">${Math.round(d.min)}° / ${Math.round(d.max)}°</div>
			`;
			grid.appendChild(card);
		});
		container.appendChild(grid);
	}

	async function fetchForecast(lat, lon) {
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=7`;
		const res = await fetch(url);
		if (!res.ok) throw new Error('Weather fetch failed');
		const json = await res.json();
		const { time = [], temperature_2m_min = [], temperature_2m_max = [], weathercode = [] } = json.daily || {};
		const days = time.map((date, i) => ({ date, min: temperature_2m_min[i], max: temperature_2m_max[i], weathercode: weathercode[i] }));
		render(days);
	}

	function mock() {
		const t = new Date();
		const days = new Array(7).fill(0).map((_, i) => {
			const d = new Date(t); d.setDate(t.getDate() + i);
			return { date: d.toISOString(), min: 8 + i, max: 14 + i, weathercode: 1 };
		});
		render(days);
	}

	// Use browser's native geolocation prompt
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			pos => fetchForecast(pos.coords.latitude, pos.coords.longitude).catch(() => mock()),
			() => mock()
		);
	} else {
		mock();
	}
});



