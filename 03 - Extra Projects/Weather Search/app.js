//fetching elements

const 
container = document.querySelector('.container'),
cityTitle = container.querySelector('.title'),
temperature = container.querySelector('.temp_unit span'),
condition = container.querySelector('.condition'),
dailyForecasts = container.querySelectorAll('.day_report'),
riseSet = container.querySelectorAll('.rise_set div span');
moreDetails = container.querySelectorAll('.more_details div h2');
weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


function search(){
    cityName = document.querySelector('input').value;
    getData(cityName, display); 
}

function display(cityData, data){
    data = data.DailyForecasts;
    let degVal = ((data[0].Temperature.Maximum.Value)+(data[0].Temperature.Minimum.Value)) / (2);
    let thirdDay = new Date(data[0].Date).getDay();
    cityTitle.innerText = cityData.LocalizedName;
    temperature.innerText = degVal.toFixed(1);
    condition.innerText =  data[0].Day.IconPhrase;
    dailyForecasts.forEach((day, i)=>{
        day.querySelector('.day .weekday').innerHTML = weekday[thirdDay+i];
        day.querySelector('.day .weekday').nextElementSibling.innerText = data[i].Day.IconPhrase;
        day.querySelector('.deg_range span').innerHTML = data[0].RealFeelTemperature.Maximum.Value;
        day.querySelector('.deg_range span').nextElementSibling.innerText = data[0].RealFeelTemperature.Minimum.Value;
    });
    riseVal = new Date(data[0].Sun.Rise);
    setVal = new Date(data[0].Sun.Set);
    riseSet[0].innerText = riseVal.toLocaleTimeString();
    riseSet[1].innerText = setVal.toLocaleTimeString();
    let realFeel = ((data[0].RealFeelTemperatureShade.Minimum.Value+data[0].RealFeelTemperatureShade.Maximum.Value)/2);
    moreDetails[0].innerText = realFeel;
    moreDetails[2].innerText = data[0].Day.RainProbability+'%';
    moreDetails[4].innerText = data[0].Day.Wind.Speed.Value+data[0].Day.Wind.Speed.Unit;
    moreDetails[5].innerText = data[0].AirAndPollen[0].Category;
}
