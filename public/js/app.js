console.log('Client side javascript is loaded.');

fetch('/weather?address=!').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error);
        } else {
            console.log(data);
        }
    })
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    
    console.log(location);

    const url = 'http://localhost:3000/weather?address=' + location;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = 'Error: ' + data.error;
                console.log(data.error);
            } else {
                messageOne.textContent = 'Location: ' + data.location;
                messageTwo.textContent = 'Forecast: ' + data.forecast;
                console.log(data);
            }
        })
    })
})