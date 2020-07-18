const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const mesOne = document.querySelector('#msg-one');
const mesTwo = document.querySelector('#msg-two');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const location = search.value;
    mesOne.textContent = 'Loading...';
    mesTwo.textContent = '';
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data)=>{
        if(data.error){
            mesOne.textContent = data.error;
            return;
        }
        mesOne.textContent= 'Temperature is : ' + data.temperature + ' humidity is '+ data.humidity + ' cloud over is '+data.cloudover;
        mesTwo.textContent= data.placeName;
    });  
});

})