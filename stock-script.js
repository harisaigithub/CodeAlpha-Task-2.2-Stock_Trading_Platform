document.addEventListener('DOMContentLoaded', function () {
    const marketDataDisplay = document.getElementById('market-data-display');
    const portfolioDisplay = document.getElementById('portfolio-display');
    const tradeForm = document.getElementById('trade-form');
    const buyButton = document.getElementById('buy-button');
    const sellButton = document.getElementById('sell-button');

    // Simulated market data
    const marketData = {
        AAPL: 150.00,
        GOOGL: 2750.00,
        AMZN: 3400.00
    };

    // Portfolio data
    const portfolio = {
        AAPL: 0,
        GOOGL: 0,
        AMZN: 0,
        cash: 100000 // Starting with $100,000 cash
    };

    // Function to update market data display
    function updateMarketDataDisplay() {
        marketDataDisplay.innerHTML = '';
        for (let stock in marketData) {
            const stockElement = document.createElement('div');
            stockElement.textContent = `${stock}: $${marketData[stock].toFixed(2)}`;
            stockElement.classList.add('market-item');
            marketDataDisplay.appendChild(stockElement);
        }
    }

    // Function to update portfolio display
    function updatePortfolioDisplay() {
        portfolioDisplay.innerHTML = '';
        for (let item in portfolio) {
            const portfolioElement = document.createElement('div');
            portfolioElement.textContent = `${item}: ${portfolio[item]}`;
            portfolioElement.classList.add('portfolio-item');
            portfolioDisplay.appendChild(portfolioElement);
        }
    }

    // Function to handle trade (buy/sell)
    function handleTrade(action) {
        const stockSymbol = document.getElementById('stock-symbol').value.toUpperCase();
        const stockQuantity = parseInt(document.getElementById('stock-quantity').value);

        if (marketData[stockSymbol] && stockQuantity > 0) {
            const stockPrice = marketData[stockSymbol];
            const tradeValue = stockQuantity * stockPrice;

            if (action === 'buy' && portfolio.cash >= tradeValue) {
                portfolio[stockSymbol] += stockQuantity;
                portfolio.cash -= tradeValue;
                showAlert('success', `Bought ${stockQuantity} shares of ${stockSymbol}`);
            } else if (action === 'sell' && portfolio[stockSymbol] >= stockQuantity) {
                portfolio[stockSymbol] -= stockQuantity;
                portfolio.cash += tradeValue;
                showAlert('success', `Sold ${stockQuantity} shares of ${stockSymbol}`);
            } else {
                showAlert('error', 'Invalid trade.');
                return;
            }
            updatePortfolioDisplay();
        } else {
            showAlert('error', 'Invalid stock symbol or quantity.');
        }
    }

    // Function to show alert
    function showAlert(type, message) {
        const alert = document.createElement('div');
        alert.classList.add('alert', type);
        alert.textContent = message;
        document.body.appendChild(alert);
        
        // Delay to apply show class for transition effect
        setTimeout(() => {
            alert.classList.add('show');
        }, 10);

        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 3000);
    }

    buyButton.addEventListener('click', () => handleTrade('buy'));
    sellButton.addEventListener('click', () => handleTrade('sell'));

    // Initial display update
    updateMarketDataDisplay();
    updatePortfolioDisplay();
});
