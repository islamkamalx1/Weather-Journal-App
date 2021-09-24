/* Global Variables */
const apiKey = '&appid=27fef22d37db984858d6e5a2a52ed892';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// select the button and store it
const generate = document.querySelector('#generate')
// event listener with async function as a second parameter
generate.addEventListener('click',()=>{
// get the value of zipCode which the user will enter
const zipCode = document.querySelector('#zip').value
// get the value of feeling which the user will enter
const feelings = document.querySelector('#feelings').value

    const mainURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
    // fetch api url
    getTemp(mainURL,zipCode,apiKey)
    .then((data)=>{
        postData('http://localhost:3000/addWeatherData',{date: newDate, temperature: data.main.temp, user_response: feelings})
        .then(()=>{
            updateUi()
        })
    })
    
})

const getTemp = async(mainURL, zipCode, apiKey)=>{

    const response = await fetch(mainURL + zipCode + apiKey + "&units=metric")
    console.log(response)
    try{
    const data = await response.json()
    console.log(data)
    return data
    }catch(err){
        console.log('error',err)
    }
}

const postData = async (url = '' ,data = {} ) =>{

    const requestData = await fetch(url, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            try{
            const postRequest = await requestData.json()
            return postRequest
            }catch(err){
                console.log('error',err)
            }
}

const updateUi = async()=>{
    const dataReceived = await fetch('http://localhost:3000/all')
    const finalData = await dataReceived.json()
    console.log(finalData)
    document.querySelector('#date').innerHTML = finalData.date
    document.querySelector('#temp').innerHTML = finalData.temperature
    document.querySelector('#content').innerHTML = finalData.user_response
}