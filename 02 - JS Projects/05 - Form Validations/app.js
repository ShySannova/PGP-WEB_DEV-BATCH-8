
// fetching elements
const spanContainers = document.querySelectorAll('span');
const fields = document.querySelectorAll('input');
const passwords= document.querySelectorAll('[type="password"]') 
const checkbox = document.getElementById('show_password');
const registerBtn = document.getElementById('register_btn');
const displayMsg = document.querySelectorAll('.msg_display');

//initializing variable for final Validation
let finalData;
let newPass;
let confirmPass;
let confirmPassId;

//initializing object to store temporarily value from form
let data = {};

//generating tooltip
let msgSpan;
spanContainers.forEach((span)=>{
    msgSpan = document.createElement('span');
    msgSpan.classList.add('msg_display');
    span.appendChild(msgSpan);
})

//array holding data of form
let allData = [
    {
        id:"name",
        pattern:"[A-Za-z\\s]+$",
        emptyError:"Name is Mandatory",
        patternError:"Name Should not have numbers or special charcaters",
        elementId: null,
        value: null,
        isValidated:false,
    },
    {
        id:"email",
        pattern:"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$",
        emptyError:"Email is Mandatory",
        patternError:"characters followed by an @ sign, followed by more characters, and then a .",
        elementId: null,
        value: null,
        isValidated:false,
    },
    {
        id:"new_password",
        pattern:"(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
        emptyError:"Password is Mandatory",
        patternError:"password must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter",
        elementId: null,
        value: null,
        isValidated:false,
    },
    {
        id:"confirm_password",
        pattern:"(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
        emptyError:"Password is Mandatory",
        patternError:"password must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter",
        elementId: null,
        value: null,
        isValidated:false,
    }
]

//getting values from input & pushing it into allData
fields.forEach((field)=>{
    field.addEventListener('keyup', (e)=>{
        data = allData.find((d)=>{
            return d.id === e.target.id
        });
        data.elementId = e.target.id;
        data.value = field.value;
        displayStatus(validator(data.value, data.pattern));
        btnActive();
    });
});

//display error msg functionality
function displayStatus(feedback){
    if (feedback===1) {
        document.getElementById(data.id).nextElementSibling.innerHTML = data.emptyError;
        document.getElementById(data.id).nextElementSibling.style.opacity = '1';
        data.isValidated = false;
    } else if (feedback===2) {
        document.getElementById(data.id).nextElementSibling.innerHTML = data.patternError;
        document.getElementById(data.id).nextElementSibling.style.opacity = '1';
        data.isValidated = false;
    }else {
        data.isValidated = true;
        document.getElementById(data.id).nextElementSibling.style.opacity = '0';
    };

    finalData = allData.filter((d)=>{
        return d.isValidated === true;
    })
}

//functionality for validating fields value
function validator(value, regex){
    let pattern = new RegExp(regex);
    
    if(value===''){
        return 1;

    }else {
        if(pattern.test(value)!==true){
            return 2;
        }
    }
    return true;
}

//functionality to show/hide password
checkbox.addEventListener('click',()=>{
    if(checkbox.checked===true){
        passwords.forEach((password)=>{
            password.type = 'text'
        });
    }else{
        passwords.forEach((password)=>{
            password.type = 'password'
        });
    };
});

//function to make btn active
function btnActive(){
    newPass = allData[2].value;
    confirmPass = allData[3].value;
    confirmPassId = allData[3].id;

    if(confirmPass!==newPass){
        allData[3].isValidated = false;
        document.getElementById(confirmPassId).nextElementSibling.innerHTML = 'Password doesnot Match';
        document.getElementById(confirmPassId).nextElementSibling.classList.remove('active');
        document.getElementById(confirmPassId).nextElementSibling.style.opacity = '1';
    }else if(confirmPass!==null){
        allData[3].isValidated = true;
        document.getElementById(confirmPassId).nextElementSibling.innerHTML = 'Password Matched';
        document.getElementById(confirmPassId).nextElementSibling.classList.add('active');
        document.getElementById(confirmPassId).nextElementSibling.style.opacity = '1';
        setTimeout(() => {
            document.getElementById(confirmPassId).nextElementSibling.style.opacity = '0';   
        }, 500);
    }

    if(finalData.length===allData.length && newPass===confirmPass){
        registerBtn.disabled = false;
    }else{
        registerBtn.disabled = true;
    };
};

//submission msg
registerBtn.addEventListener('click', ()=>{
    alert(`You Have Been Registered....Enjoy Services ... Thank You!!!`)
});





