// Seletores
let container = document.querySelectorAll('.container')[0];
let img_time = document.querySelector('#img_time');
let description = document.querySelector('#description');
let day = document.querySelector('#day');
let hours = document.querySelector('#hours');
let uni_humidity = document.querySelector('#uni_humidity');
let uni_temperature = document.querySelector('#uni_temperature');
let uni_wind = document.querySelector('#uni_wind');

// Eventos
let button_card = document.querySelector('#button_card');
button_card.addEventListener('click', () => {
    Time_API();
    Weather_API();
});

// Funções
async function Time_API() {
    const input_card = document.querySelector('#country');
    const URL = `https://timeapi.io/api/time/current/zone?timeZone=${input_card.value}`;
    const resp = await fetch(URL);

    if (resp.status === 200) {
        const time_json = await resp.json();

        time_json.dayOfWeek = translateDay(time_json.dayOfWeek);

        console.log(time_json);
        day.innerHTML = `${time_json.dayOfWeek}, ${time_json.day}/${time_json.month}/${time_json.year}`;
        hours.innerHTML = `${time_json.time}<sup id="seconds"> ${time_json.seconds}</sup>`;
    }
}

async function Weather_API() {
    const input_card = document.querySelector('#country');
    const convert_input_card = (input_card.value).substring(input_card.value.lastIndexOf("/") + 1).replace(/_/g, " ");
    console.log(convert_input_card);
    const API_KEY = "cc799acc54ba454ffc607df0924b0b0c";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${convert_input_card}&appid=${API_KEY}&units=metric&lang=pt_br`;
    console.log(URL);
    const resp = await fetch(URL);
    if (resp.status === 200) {
        const weather_json = await resp.json();
        console.log(weather_json);
        description.innerHTML = `${weather_json.weather[0].description}`;
        uni_humidity.innerHTML = `${weather_json.main.humidity}<sup> %</sup>`;
        uni_temperature.innerHTML = `${(weather_json.main.temp).toFixed(1)}<sup> C°</sup>`;
        uni_wind.innerHTML = `${weather_json.wind.speed}<sup> KM/H</sup>`;
        img_time.setAttribute('src', `https://openweathermap.org/img/wn/${weather_json.weather[0].icon}@2x.png`);

        if (weather_json.weather[0].description == "algumas nuvens") {
            //container.classList.add("algumas_nuvens");
        }
    }
}

function translateDay(dayOfWeek) {
    const traducoes = {
        "Sunday": "Domingo",
        "Monday": "Segunda-feira",
        "Tuesday": "Terça-feira",
        "Wednesday": "Quarta-feira",
        "Thursday": "Quinta-feira",
        "Friday": "Sexta-feira",
        "Saturday": "Sábado",
    };
    return traducoes[dayOfWeek] || dayOfWeek;
}
