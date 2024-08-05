import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import clearSky from "./assets/clearSky.jpg";
import clearSkyNight from "./assets/clearSkyNIght.jpg"
import fewClouds from "./assets/fewClouds.jpg";
import fewCloudsNight from "./assets/fewCloudsNight.jpg";
import scatteredClouds from "./assets/scatteredClouds.jpg";
import scatteredCloudsNight from "./assets/scatteredCloudsNight.jpg";
import brokenClouds from "./assets/brokenClouds.jpg";
import brokenCloudsNight from "./assets/brokenCLoudsNIght.jpg";
import showerRain from "./assets/showerRain.jpg";
import showerRainNight from "./assets/showerRainNight.jpg";
import Rain from "./assets/Rain.jpg";
import RainNight from "./assets/RainNight.jpg";
import thunderStorm from "./assets/thunderStorm.jpg";
import thunderStormNight from "./assets/thunderStormNight.jpg";
import snow from "./assets/snow.jpg";
import snowNight from "./assets/snowNight.jpg";
import mist from "./assets/mist.jpg";
import mistNight from "./assets/mistNight.jpg";
import "./App.css";

const back = [
  {
    id: "01d",
    img: clearSky,
  },
  {
    id: "01n",
    img: clearSkyNight,
  },
  {
    id: "02d",
    img: fewClouds,
  },
  {
    id: "02n",
    img: fewCloudsNight,
  },
  {
    id: "03d",
    img: scatteredClouds,
  },
  {
    id: "03n",
    img: scatteredCloudsNight,
  },
  {
    id: "04d",
    img: brokenClouds,
  },
  {
    id: "04n",
    img: brokenCloudsNight,
  },
  {
    id: "09d",
    img: showerRain,
  },
  {
    id: "09n",
    img: showerRainNight,
  },
  {
    id: "10d",
    img: Rain,
  },
  {
    id: "10n",
    img: RainNight,
  },
  {
    id: "11d",
    img: thunderStorm,
  },
  {
    id: "11n",
    img: thunderStormNight,
  },
  {
    id: "13d",
    img: snow,
  },
  {
    id: "13n",
    img: snowNight,
  },
  {
    id: "50d",
    img: mist,
  },
  {
    id: "50n",
    img: mistNight,
  }
]

function App() {
  const WEATHER_API_KEY = import.meta.env.VITE_PUBLIC_WEATHER_API_KEY;
  const TIMEZONE_API_KEY = import.meta.env.VITE_PUBLIC_TIMEZONE_API_KEY;
  const [place, setPlace] = useState("mumbai");
  const [weather, setWeather] = useState(null);
  const [timeZone, setTimeZone] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [backgrd, setBackgrd] = useState(clearSky);

  

  const getWeather = async () => {
    if (place && place.length > 0) {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${WEATHER_API_KEY}`;
        let res = await fetch(url);
        let data = await res.json();
        setWeather(data);
        
        let url2 = `https://us1.locationiq.com/v1/timezone?key=${TIMEZONE_API_KEY}&lat=${data.coord.lat}&lon=${data.coord.lon}&format=json`;
        let res2 = await fetch(url2);
        let data2 = await res2.json();
        setTimeZone(data2.timezone);
        back.map((dat)=>{
          if(dat.id === data.weather[0].icon){
            setBackgrd(dat.img);
          }
        })
      } catch (err) {
        alert("City Not Found");
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    if (timeZone) {
      const updateCurrentTime = () => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: timeZone.name,
        });
        setCurrentTime(formatter.format(now));
      };
      updateCurrentTime();
      const intervalId = setInterval(updateCurrentTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timeZone]);

  const sty = {
    backgroundImage: `url(${backgrd})`,
    backgroundSize: "cover"
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen transition-all duration-100 ease-in-out" style={sty}>
      {/* Search bar */}
      <div className="flex items-center m-2 bg-black/70 rounded-full scale-125">
        <input
          className="outline-none border-gray-400 border-solid border-2 rounded-s-full p-2 px-4 bg-transparent text-gray-300"
          type="search"
          placeholder="City Name"
          onChange={(e) => {
            setPlace(e.target.value);
          }}
        />
        <button
          onClick={getWeather}
          className="border-gray-400 border-solid border-2 rounded-e-full p-2 py-3 border-l-0 text-gray-300"
        >
          <FaSearch />
        </button>
      </div>
      {/* Temperature, feels-like, weather */}
      {weather && (
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center w-full">
          {/* Part 1 */}
          <div className="bg-black/70 px-3 text-white rounded-xl my-3 border-2 border-gray-400">
            <div>
              <div className="flex gap-3 items-end my-3">
                <p className="text-5xl sm:text-7xl">{weather.name},</p>
                <p className="text-2xl sm:text-3xl">{weather.sys.country}</p>
              </div>
            </div>
            <div className="flex">
              <div>
                {timeZone && <p className="text-3xl sm:text-4xl w-24">{currentTime}</p>}
              </div>
              <div className="h-20 border-l-2 my-1 border-gray-400"></div>
              <div className="mx-2">
                <div className="flex">
                  <img
                    className="-translate-y-3"
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather logo"
                  />
                  <div>
                    <p className="text-4xl sm:text-5xl">{weather.weather[0].main} </p>
                    <p className="text-xl sm:text-2xl">{weather.weather[0].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Part 2 */}
          <div className="bg-black/70 px-3 text-white rounded-xl my-3 border-2 border-gray-400">
            <div className="flex gap-2 px-2 py-3 items-center">
              <p className="text-6xl sm:text-7xl">
                {(weather.main.temp - 273.15).toFixed(1)}{" "}
                <span className="text-2xl sm:text-3xl">°C</span>
              </p>
              <div className="h-20 border-l-2 my-1 border-gray-400"></div>
              <div>
                <p className="text-xl text-gray-300">Feels Like</p>
                <p className="text-5xl">
                  {(weather.main.feels_like - 273.15).toFixed(1)}{" "}
                  <span className="text-xl">°C</span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 my-2 gap-y-1">
              <p>Humidity: {weather.main.humidity}% </p>
              <p>Wind: {(weather.wind.speed).toFixed(1)} kph</p>
              <p>Cloudiness: {weather.clouds.all}%</p>
              <p>Visibility: {(weather.visibility / 1000).toFixed(2)} km</p>
              {timeZone && <p>Time Zone: {timeZone.short_name}</p>}
              <p>Lat: {(weather.coord.lat).toFixed(2)}°   Lon: {(weather.coord.lon).toFixed(2)}°</p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
