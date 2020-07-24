// getting elements 
const inputEl = document.getElementById('input');
const formEl = document.querySelector('.form-wrapper__form');
const errorEl = document.querySelector('.form-wrapper__msg--error');

formEl.addEventListener('submit', e => {
    e.preventDefault();
    const inputValue = inputEl.value;
    if (inputValue && inputValue != 0) {
        if (emailIsValid(inputValue)) {
            sendPostRequest(inputValue);
        } else {
            errorEl.innerText = "Please check your email";
        }
    } else {
        errorEl.innerText = "Please enter an email";
    }
})


// functions

function emailIsValid(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}



function sendPostRequest(validEmail) {
    axios.post('https://api.staging.fourthwall.com/api/mailing-list', {
            email: validEmail
        }, {
            headers: {
                'X-ShopId': 'sh_9f57832f-456b-44f3-888f-8a370b155a18',
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            if (response.status > 200 && response.status < 300) {
                inputEl.value = '';
                errorEl.innerText = 'Thank you. Your email has been sent';
                errorEl.classList.add('form-wrapper__msg--success');
            }
        })
        .catch(function(error) {
            errorEl.innerText = "Error, something went wrong. Please try again later";
        });
}