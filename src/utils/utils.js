import axios from "axios";


const farenheitToCelsius = (tempFarenheit) => {
    return (tempFarenheit - 32) * 5 / 9;
}

const kelvinToCelsius = (temKelvin) => {
    return (temKelvin - 273.15);
}



export {
    kelvinToCelsius,
    farenheitToCelsius,
}