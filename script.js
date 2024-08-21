document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertButton = document.getElementById('convert-button');
    const resultDiv = document.getElementById('result'); 

    const fromFlag = document.querySelector('.from .select-container img');
    const toFlag = document.querySelector('.to .select-container img');
    const exchangeIcon = document.querySelector('.fa-arrow-right-arrow-left');

    const apiURL = 'https://open.er-api.com/v6/latest/USD';

    fetch(apiURL)
        .then(response => response.json())
        .then(data => { 
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrencySelect.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrencySelect.appendChild(option2);
            });

            fromCurrencySelect.value = 'USD';
            toCurrencySelect.value = 'NPR';  

            updateFlag(fromCurrencySelect.value, fromFlag);
            updateFlag(toCurrencySelect.value, toFlag);  
        });
  
    const updateFlag = (currencyCode, imgElement) => {
        imgElement.src = `https://flagsapi.com/${currencyCode.slice(0, 2)}/flat/64.png`;
    };

    fromCurrencySelect.addEventListener('change', () => {
        updateFlag(fromCurrencySelect.value, fromFlag);
    });

    toCurrencySelect.addEventListener('change', () => {
        updateFlag(toCurrencySelect.value, toFlag);
    });

    const convertCurrency = () => {
        const amount = amountInput.value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (amount === '' || isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount';
            return;
        }

        exchangeIcon.classList.add('spin');

        const conversionURL = `https://open.er-api.com/v6/latest/${fromCurrency}`;

        fetch(conversionURL)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            })
            .catch(error => {
                console.error('Error fetching conversion rate:', error);
                resultDiv.textContent = 'Error fetching conversion rate';
            })
            .finally(() => {
                setTimeout(() => {
                    exchangeIcon.classList.remove('spin');
                }, 1000);  // Duration of the animation
            });
    };

    convertButton.addEventListener('click', (event) => {
        event.preventDefault();
        convertCurrency();
    });

    amountInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            convertCurrency();
        }
    });

    fromCurrencySelect.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            convertCurrency();
        }
    });

    toCurrencySelect.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            convertCurrency();
        }
    });
});
