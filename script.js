//Get DOM ELEMENTS FROM HTML FILE

const currencyOne = document.getElementById('currency-one');
const amountCurrencyOne  = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountCurrencyTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');


function calculate(){
    // Geting values for currency 1&2
    const currencyOneCode = currencyOne.value;
    const currencyTwoCode = currencyTwo.value;
    //Fetching API
    fetch(`https://v6.exchangerate-api.com/v6/c318a083f98eaa6605753f75/pair/${currencyOneCode}/${currencyTwoCode}`)
    .then(res => res.json())
    .then(data => {
        //Get the converion rate from currency 1 to 2
        const conversionRate = data.conversion_rate;
        //Update the dom to display the conversion rate
        rate.innerText= `1 ${currencyOneCode} = ${conversionRate} ${currencyTwoCode}`;
        // Formatting Currency Two Amount
        const amount2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyTwoCode }).format((amountCurrencyOne.value * conversionRate).toFixed(2));
        // Updating DOM
        amountCurrencyTwo.value = amount2;
    });

};

//EventLitenrs 
// calculate when currecy 1 will chnage
currencyOne.addEventListener('change',calculate);
// calculate when Amount 1 will change
amountCurrencyOne.addEventListener('input' ,calculate);
// calculate when currecy 2 will chnage
currencyTwo.addEventListener('change',calculate);
// calculate when Amount 2 will change
amountCurrencyTwo.addEventListener('input' ,calculate);
// for swap button
swap.addEventListener('click' , ()=>{
    // save the value of currency 1 code to temp variable
    const temp = currencyOne.value;
    // saving the value of currency 1 code to 2
    currencyOne.value = currencyTwo.value;
    // Copy Currency One Code from temp variable to Currency Two
    currencyTwo.value = temp;
    // Recalculate exchange rate after swap
    calculate();
})




// on page reload rum this to update the dom
calculate();