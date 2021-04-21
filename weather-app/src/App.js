import React, { Component } from "react";
import "./App.css";
import Weather from "./app-component/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";
import { WiDaySunny } from "react-icons/wi";
import { WiDayThunderstorm } from "react-icons/wi";
import { WiNightSleet } from "react-icons/wi";
import { WiDayStormShowers } from "react-icons/wi";
import { WiDaySnow } from "react-icons/wi";
import { WiDayFog } from "react-icons/wi";
import { WiFog } from "react-icons/wi";
import Form from "./app-component/form.component";
const apiKey = "dae709b9103b596028287619b98c299b";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: undefined,
      error: false,
    };

    this.weathericon = {
      Thunderstrom: <WiDayThunderstorm />,
      Drizzle: <WiNightSleet />,
      Rain: <WiDayStormShowers />,
      Snow: <WiDaySnow />,
      Atmosphere: <WiFog />,
      Clear: <WiDaySunny />,
      Clouds: <WiDayFog />,
    };
  }

  //=====================================
  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }
  //========================================
  get_WeatherIcon(icons, rangeid) {
    switch (true) {
      case rangeid >= 200 && rangeid <= 232:
        this.setState({ icon: this.weathericon.Thunderstrom });
        break;
      case rangeid >= 300 && rangeid <= 321:
        this.setState({ icon: this.weathericon.Drizzle });
        break;
      case rangeid >= 500 && rangeid <= 531:
        this.setState({ icon: this.weathericon.Rain });
        break;
      case rangeid >= 600 && rangeid <= 622:
        this.setState({ icon: this.weathericon.Snow });
        break;
      case rangeid >= 701 && rangeid <= 781:
        this.setState({ icon: this.weathericon.Atmosphere });
        break;
      case rangeid === 800:
        this.setState({ icon: this.weathericon.Clear });
        break;
      case rangeid >= 801 && rangeid <= 804:
        this.setState({ icon: this.weathericon.Clouds });
        break;

      default:
        this.setState({ icon: this.icon.Clouds });
    }
  }

  //===============================
  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if (city && country) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country},uk&appid=${apiKey}`
      );
      const response = await api_call.json();

      this.setState({
        city: `${response.name},${response.sys.country}`,

        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
      });

      this.get_WeatherIcon(this.weathericon, response.weather[0].id);
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
          icon={this.state.icon}
        />
      </div>
    );
  }
}
export default App;
