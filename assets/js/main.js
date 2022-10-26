// Logic variables
const BASE_API = "https://api.adviceslip.com";

// UI variables
let adviceNumber = null;
let adviceButton = null;
let adviceText = null;
let adviceContainer = null;
let spinner = null;
let spinnerContainer = null;

// Set elements
const bindElements = () => {
    adviceNumber = document.querySelector('#advice-number');
    adviceText = document.querySelector('#advice-text');
    adviceButton = document.querySelector('#advice-button');
    adviceContainer = document.querySelector('#advice-container');
    spinnerContainer = document.querySelector('.loader');
    spinner = document.querySelector('.loader__spinner');
}

// Get advice from API
const fetchAdviceInfo = async () => {
    let advice = null;

    try {
        const response = await fetch(`${BASE_API}/advice`, 
            { method: 'GET', mode: 'cors', cache: 'no-cache' }
        );
        if (response.ok) {
            return advice = await response.json();
        }
        return Promise.reject(response);
    } catch (error) {
        console.log(error);
        console.log('Sorry, there was an error fetching the advice.');
    }
}

// Set listeners for form
const setFormListeners = () => {
    adviceButton.addEventListener('click', async (event) => {
        showAdvance();
    });
}

const showAdvance = () => {
    adviceContainer.classList.add('hidden');
    spinnerContainer.classList.add('visible');
    adviceButton.classList.add('btn--disabled');
    spinner.textContent = 'Loading...';
    
    // Set delay to fetchAdviceInfo() to show spinner
    setTimeout(async () => {
        await fetchAdviceInfo().then((advice) => {
            adviceNumber.textContent = advice.slip.id;
            adviceText.textContent = `“${advice.slip.advice}”`;
            spinner.textContent = 'Done!';
        }).catch((error) => {
            adviceNumber.textContent = '0';
            adviceText.textContent = 'Sorry, there was an error fetching the advice.';
            spinner.textContent = 'Error!';
        }).finally(() => {
            adviceContainer.classList.remove('hidden');
            spinnerContainer.classList.remove('visible');
            adviceButton.classList.remove('btn--disabled');
        });
    }, 1000);
}

// Main function
const main = () => {
    bindElements();
    setFormListeners();
    //showAdvance();
}

// Run main function
main();