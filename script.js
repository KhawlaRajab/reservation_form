'use strict';
let disableDate = document.querySelector('#arrival-date');
let arrivalDate=disableDate;
let userName = document.querySelector('#fullName');
let email = document.querySelector('#email');
let num = document.querySelector('#personNum');
let packages = document.querySelector('.Package');
console.log(packages);
let btn = document.querySelector('.button');
let form = document.querySelector('form');
let services = document.querySelectorAll('.box');
let terms = document.querySelectorAll('.agreement');

let content = document.querySelector('.content');
let popUp = document.querySelector('.popup');
let overlay = document.querySelector('.overlay');

let valid = true;
let emailVal, userNameVal, arrivalDateVal, packageVal, serviceList='', personNum;


//disable past dates
let minDate = new Date().toISOString().split('T')[0];
// console.log(minDate);
disableDate.min = minDate;






//enable button if all fields filled correctly
form.addEventListener('input', function () { 
    valid = true;     
 
    if (userName.value === "" || !userName.value.includes(' '))
        valid = false;

     if (email.value === "" || !email.value.includes('@'))
        valid = false;
      
    if (arrivalDate.value === '')
        valid = false;

    if (isNaN(num.value) || num.value === '' || num.value<=0)
        valid = false;

    let checkboxValidity=false,radioValdity=false;
    for (let checkBox of services) {
        if (checkBox.checked)
            checkboxValidity = true;
    }

    for (let radio of terms) {

        //radioButton with value agree should be selected 
        if (radio.checked && radio.value==='agree')
            radioValdity = true;
    
    }

    if (!radioValdity || !checkboxValidity)
        valid = false;
        
        
    if (valid) {
        btn.disabled = false;
        btn.classList.add('enable');
    } else {
        btn.disabled = true;
        btn.classList.remove('enable');

    }
});



// show a popup with user info 
btn.addEventListener('click', function (e) {
    e.preventDefault();
    userNameVal = userName.value;
    emailVal = email.value;
    arrivalDateVal = arrivalDate.value;
    personNum = num.value;
    for (let service of services) {
        if (service.checked)
            serviceList += service.value + " ";
    }

    content.innerHTML = `User Information: 
    <span class="close"><i class="fa fa-close"></i></span>
    <br><br>
     fullName : ${userNameVal} <br>
    email : ${emailVal} <br>
    package : ${packages.value} <br>
    arrival date : ${arrivalDateVal} <br>
    personNumber : ${personNum} <br>
    services : ${serviceList} <br>
    `;
    
    popUp.style.display = 'block';
    overlay.style.display = 'block';

// close the popup
    let closebtn = document.querySelector('.close');
    closebtn.addEventListener('click', function () {
        popUp.style.display = 'none';
        overlay.style.display = 'none';
    });

    //disable the button and reset the form
    userName.value = email.value = arrivalDate.value = num.value = '';
    for (let service of services)
        service.checked = false;
    
    for (let radio of terms)
        radio.checked = false;

    btn.disabled = true;
    btn.classList.remove('enable');

});







