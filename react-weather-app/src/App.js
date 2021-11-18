import { useState, useEffect } from "react";
import countries from "i18n-iso-countries";

import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTemperatureLow,
    faTemperatureHigh,
    faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

function App() {
    const [apiData, setApiData] = useState({});
    const [getState, setGetState] = useState("Irvine, USA");
    const [state, setState] = useState("Irvine, USA");

    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${getState}&appid=${apiKey}`;

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setApiData(data));
    }, [apiUrl]);

    const inputHandler = (event) => {
        setGetState(event.target.value);
    };

    const submitHandler = () => {
        setState(getState);
    };

    const kelvinToFahrenheit = (k) => {
        return ((k - 273.15) * 1.8 + 32).toFixed(0);
    };

    return (
        <div className="App">
            <header className="d-flex justify-content-center align-items-center">
                <h2>React weather App</h2>
            </header>
            <div className="container">
                <div className="mt-3 d-flex flex-column justify-content-center align-items-center col-auto">
                    <div className="col-auto">
                        <label
                            htmlFor="location-name"
                            className="col-form-label"
                        >
                            Enter location :
                        </label>
                        <input
                            id="location-name"
                            type="text"
                            className="form-control"
                            onChange={inputHandler}
                            value={getState}
                        />
                        <button
                            className="btn btn-primary mt-2"
                            onClick={submitHandler}
                        >
                            Search
                        </button>
                    </div>
                    <div className="card mt-3 mx-auto">
                        {apiData.main ? (
                            <div className="card-body text-center">
                                <img
                                    className="weather-icon"
                                    src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                                    alt="weather status icon"
                                />
                                <p className="h2">
                                    {kelvinToFahrenheit(apiData.main.temp)}&deg;
                                    F
                                </p>
                                <p className="h5">
                                    <FontAwesomeIcon
                                        className="fas fa-1x mr-2 text-dark"
                                        icon={faMapMarkerAlt}
                                    />{" "}
                                    <strong>{apiData.name}</strong>
                                </p>

                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <p>
                                            <FontAwesomeIcon
                                                className="fas fa-1x mr-2 text-primary"
                                                icon={faTemperatureLow}
                                            />
                                            <strong>
                                                {kelvinToFahrenheit(
                                                    apiData.main.temp_min
                                                )}
                                                &deg; F
                                            </strong>
                                        </p>

                                        <p>
                                            <FontAwesomeIcon
                                                className="fas fa-1x mr-2 text-danger"
                                                icon={faTemperatureHigh}
                                            />
                                            <strong>
                                                {kelvinToFahrenheit(
                                                    apiData.main.temp_max
                                                )}
                                                &deg; F
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p>
                                            {" "}
                                            <strong>
                                                {apiData.weather[0].main}
                                            </strong>
                                        </p>
                                        <p>
                                            {" "}
                                            {countries.getName(
                                                apiData.sys.country,
                                                "en",
                                                {
                                                    select: "official",
                                                }
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h1>Loading.....</h1>
                        )}
                    </div>
                </div>
            </div>
            <footer className="footer">&copy; React Weather App</footer>
        </div>
    );
}

export default App;
