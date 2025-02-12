import { database } from "./data.js";
console.log(database)
let savedUsers = JSON.parse(localStorage.getItem("users")) || [];

// Instead of reassigning `database`, update its contents
if (savedUsers.length) {
    database.length = 0;  // Clear the original array
    database.push(...savedUsers);  // Add stored users
}

// Function to select DOM elements
function selectItem(selector) {
    return document.querySelector(selector);
}

// Select DOM elements using the selectItem function
const buttonLogIn = selectItem('#buttonLogin');
const buttonSignIn = selectItem('#buttonCreate');
const inputName = selectItem('#inputName');
const accountNumber = selectItem('#inputAccNumber'); // Corrected selector
const code = selectItem('#code');
const signUp = selectItem('#clickSignUp');
const signUpContainer = selectItem('.signup');
const logInContainer = selectItem('.login');
const clickLogIn = selectItem('#clickLogIn'); // Use selectItem for consistency

// Prevent form submission
document.querySelector('#formLogIn').onsubmit = (e) => {
    e.preventDefault();
};

// Login function
const login = () => {
    let users = JSON.parse(localStorage.getItem('users')) || database;
    const isValidUser = users.some((data) =>
        inputName.value.trim().toLowerCase() === data.name.toLowerCase() &&
        Number(accountNumber.value) === data.accNumber &&
        Number(code.value) === data.code
    );
    if (isValidUser) {
        selectItem('#error').style.display = 'none';
        document.querySelectorAll('.input').forEach((e) => {
            e.style.border = '1px solid rgba(128, 128, 128, 0.562)';
        });
        newPage();
    } else {
        selectItem('#error').style.display = 'block';
        document.querySelectorAll('.input').forEach((e) => {
            e.style.border = '2px solid red';
        });
    }
};

// Add event listener for login button
buttonLogIn.addEventListener('click', login);

// Next Page
const newPage = () => {
    selectItem('#styleSheet').href = `main.css`;
    selectItem('body').innerHTML = `
    <i class="fa-solid fa-bars" id='bar'></i>
        <header>
            <nav class='first'> 
                <div id='home' > Home </div>
                <div id='deposit'> Deposit Money </div>
                <div id='withdraw'> Withdraw Money </div>
                <div id='showAccount'> Show Account </div>
                <div id='about'> About Us </div>
            </nav>
            <nav>
                <div><button id="logout">Log Out<i class="fa-solid fa-right-from-bracket"></i></button></div>
            </nav>
        </header>

        <div class="new-page" id='main'>
            <h1 id='newPageHeading'>Hello, <span id='name'>${inputName.value}!</span></h1>
            <h2> Welcome to our Bank!</h2>
            <h2 id='bank'> Simple and Safe Banking </h2>
            <p>We will give you best service we can</p>
        </div>

        
        <script src="main.js"></script>
    `;

    // Add event listener for logout after rendering the button
    document.getElementById("logout").addEventListener("click", () => {
        window.location.reload(); // Reload to reset login state
    });

    document.getElementById('bar').addEventListener('click', () => {
        document.querySelector('header').classList.toggle('header-animation');
        document.querySelector('.new-page').classList.toggle('new-page-animation');
    });
    
    // adding functions to nav

    const home = document.querySelector('#home');
    const deposit = document.querySelector('#deposit');
    const withdraw = document.querySelector('#withdraw');
    const showAccountDetails = document.querySelector('#showAccount');
    const about = document.querySelector('#about');
    const main = document.querySelector('#main');
    // const balance = document.querySelector('#balance');

    home.addEventListener('click', () => {
        main.innerHTML = `
            <h1 id='newPageHeading'>Hello, <span id='name'>${inputName.value}!</span></h1>
            <h2> Welcome to our Bank!</h2>
            <h2 id='bank'> Simple and Safe Banking </h2>
            <p>We will give you best service we can</p>
        `
    });

    showAccountDetails.addEventListener('click', () => {
        main.innerHTML = `
            <section>
                <h1>Account Details</h1>
                <p>Keep your money safe and secure in our bank</p>
                <h3><span>Name:</span> ${inputName.value}</h3>
                <h3><span>Account Number:</span> ${accountNumber.value}</h3>
                <h3><span>Amount Balance:</span> 0</h3>
                <h3><span>Account Code: </span> ${code.value}</h3>
            </section>
        `
    });

    about.addEventListener('click', () => {
        main.innerHTML = `
            <h1 id='aboutUsHeading'>About Us</h1>
            <i id='img' class="fa-solid fa-piggy-bank"></i>
            <p>Welcome to our Bank Management System, a secure and efficient platform designed to streamline banking operations. Our system provides customers with a seamless banking experience, offering essential services such as account management, deposits, withdrawals, fund transfers, and transaction history tracking.
            <br>
            Our mission is to enhance banking efficiency by providing a user-friendly and secure platform for both customers and bank administrators. The system ensures data security, quick transactions, and an intuitive interface for smooth navigation.
            <br>
            We are committed to improving financial services with technology, making banking accessible and hassle-free.</p>
        `
    })

};



signUp.addEventListener('click', () => {
    logInContainer.classList.add("hidden");
    setTimeout(() => {
        logInContainer.style.display = 'none';
        signUpContainer.style.display = 'flex';
        signUpContainer.classList.remove("hidden");
    }, 300);
});

clickLogIn.addEventListener('click', () => {
    signUpContainer.classList.add("hidden");
    setTimeout(() => {
        signUpContainer.style.display = 'none';
        logInContainer.style.display = 'flex';
        logInContainer.classList.remove("hidden");
    }, 300);
});


// signin

const fullName = selectItem("#fullName");
const email = selectItem('#email');
const password = selectItem('#password');
const address = selectItem('#address');
const accountNumberSignIn = selectItem('#accountNumber');

selectItem('#formSignIn').addEventListener('submit', (e) => {
    e.preventDefault();
    transferData();
});

let flagFullName = false;
let flagEmail = false;
let flagAddress = false;
let flagConfirmPassword = false;
let flagAccountNumber = false;

function displayInvalid(message, element, messageElement){
    messageElement.innerHTML = message;
    element.style.border = `2px solid red`;
    messageElement.style.color = 'red';
}
function showCorrectMessage(message, element, messageElement){
    messageElement.innerHTML = message;
    element.style.border = `2px solid green`;
    messageElement.style.color = 'green';
}

function validateFullName(){
    flagFullName = false;
    const fullNameMessage = selectItem('.fullNameMessage');
    if(fullName.value.length < 3){
        displayInvalid('Please enter a valid full name', fullName, fullNameMessage);
    }else{
        showCorrectMessage('Correct', fullName, fullNameMessage);
        flagFullName = true;
    }
}
fullName.addEventListener('keyup', validateFullName);

function validateEmail() {
    flagEmail = false;
    const emailMessage = selectItem('.emailMessage');
    
    let emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z]+\.[a-z]{2,4}$/;
    if (!email.value.match(emailRegex)) {
        displayInvalid('Please enter a valid Email', email, emailMessage);
    } else {
        showCorrectMessage('Correct', email, emailMessage);
        flagEmail = true;
    }
}
email.addEventListener('keyup', validateEmail);

function validatePassword() {
    flagConfirmPassword = false;
    const passwordMessage = selectItem('.passwordMessage');
    
    if (password.value.length < 4) {
        displayInvalid('Please enter a valid Password of 4 digits', password, passwordMessage);
    } else {
        showCorrectMessage('Correct', password, passwordMessage);
        flagConfirmPassword = true;
    }
}
password.addEventListener('keyup', validatePassword);

function validateAddress() {
    flagAddress = false;
    const addressMessage = selectItem('.addressMessage');
    
    if (address.value.length < 4) {
        displayInvalid('Please enter a valid Address', address,addressMessage);
    } else {
        showCorrectMessage('Correct', address, addressMessage);
        flagAddress = true;
    }
}
address.addEventListener('keyup', validateAddress);

function validateAccountNumber() {
    flagAccountNumber = false;
    const accountNumberMessage = selectItem('.accountNumberMessage');
  
    if (accountNumberSignIn.value.length < 6) {
        displayInvalid('Please enter a valid Account Number', accountNumberSignIn, accountNumberMessage);
    } else {
        showCorrectMessage('Correct', accountNumberSignIn, accountNumberMessage);
        flagAccountNumber = true;
    }
}
accountNumberSignIn.addEventListener('keyup', validateAccountNumber);

buttonSignIn.addEventListener('click', () => {   
    validateFullName();
    validateEmail();
    validatePassword();
    validateAddress();
    validateAccountNumber();
});

function transferData(){
    if(flagFullName && flagEmail && flagConfirmPassword && flagAddress && flagAccountNumber){
        console.log("confirm");
        database.push({
            name: fullName.value,
            accNumber: Number(accountNumberSignIn.value),  // Convert to number
            code: Number(password.value)  // Convert to number
        });
        console.log(database);
        signUpContainer.classList.add("hidden");
        setTimeout(() => {
            signUpContainer.style.display = 'none';
            logInContainer.style.display = 'flex';
            logInContainer.classList.remove("hidden");
        }, 300);
        storeData();
    } else {
        console.log("error");
    }
}

function storeData(){
    localStorage.setItem("users", JSON.stringify(database));
}

function loadData(){
    let savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    console.log(savedUsers);
}
loadData();
