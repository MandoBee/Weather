
document.getElementById("searchInput").addEventListener("keyup", (event) => {
    mySearch(event.target.value);
});

var myData = [];

async function mySearch(city) {
    try {
        var myAPI = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=33974f1c34a145fc89e41638240912&q=${city}&days=3`);
        if (myAPI.ok) {
            myData = await myAPI.json();
            display(myData.forecast.forecastday[0].date);
        } else {
            console.error("Failed to fetch data");
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var getFDay = (date) => {
    return `${days[new Date(date).getDay()]}`;
};



var getFDate = (date) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}-${months[dateObj.getMonth()]}-${dateObj.getFullYear()}`;
};

mySearch("Giza");

function display(toDate) {
    const forecastContainer = document.getElementById("forecast");
    if (!forecastContainer) return;

    forecastContainer.innerHTML = `
        <div class="forecast card text-white bg-secondary mb-3 today col-4">
            <div class="card-header">
                <div class="forecast-header d-flex justify-content-between" id="today">
                    <div class="day">${getFDay(toDate)}</div>
                    <div class="date">${getFDate(toDate)}</div>
                </div>
            </div>
            <div class="card-body text-center d-flex justify-content-center align-items-center">
                <div class="forecast-content" id="current">
                    <div class="location text-warning fs-1 mb-3">${myData.location.name}</div>
                    <div class="degree">
                        <div class="forecast-icon">
                            <img src="${myData.forecast.forecastday[0].day.condition.icon}" alt="" width="90">
                        </div>
                        <div class="degree fs-2">${myData.forecast.forecastday[0].day.avgtemp_c}<sup>o</sup>C</div>
                        <div class="custom text-primary fs-4 mb-5">${myData.forecast.forecastday[0].day.condition.text}</div>
                    </div>
                    <span><img src="images/icon-umberella.png" alt=""> ${myData.current.wind_degree}%</span>
                    <span><img src="images/icon-wind.png" alt=""> ${myData.current.wind_kph} km/h</span>
                    <span><img src="images/icon-compass.png" alt=""> East</span>
                </div>
            </div>
        </div>
        <div class="forecast card tomorrow text-white bg-secondary mb-3 col-4">
            <div class="card-header">
                <div class="forecast-header d-flex justify-content-between">
                    <div class="day">${getFDay(myData.forecast.forecastday[1].date)}</div>
                    <div class="date">${getFDate(myData.forecast.forecastday[1].date)}</div>
                </div>
            </div>
            <div class="card-body text-center d-flex justify-content-center align-items-center">
                <div class="forecast-content">
                    <div class="forecast-icon">
                        <img src="${myData.forecast.forecastday[1].day.condition.icon}" alt="" width="50">
                    </div>
                    <div class="degree fs-2">${myData.forecast.forecastday[1].day.avgtemp_c}<sup>o</sup>C</div>
                    <div class="custom text-primary fs-4">${myData.forecast.forecastday[1].day.condition.text}</div>
                </div>
            </div>
        </div>
        <div class="forecast card text-white bg-secondary mb-3 col-4">
            <div class="card-header">
                <div class="forecast-header d-flex justify-content-between">
                    <div class="day">${getFDay(myData.forecast.forecastday[2].date)}</div>
                    <div class="date">${getFDate(myData.forecast.forecastday[2].date)}</div>
                </div>
            </div>
            <div class="card-body text-center d-flex justify-content-center align-items-center">
                <div class="forecast-content">
                    <div class="forecast-icon">
                        <img src="${myData.forecast.forecastday[2].day.condition.icon}" alt="" width="48">
                    </div>
                    <div class="degree fs-2">${myData.forecast.forecastday[2].day.avgtemp_c}<sup>o</sup>C</div>
                    <div class="custom text-primary fs-4">${myData.forecast.forecastday[2].day.condition.text}</div>
                </div>
            </div>
        </div>
    `;
}
