# Stock App

This is a React application for viewing stock data.

## Setup Instructions

1. **Clone the repository to your local machine.**

    ```bash
    git clone https://github.com/Matthew-Shill/stockapp-react.git
    ```

2. **Navigate to the project directory.**

    ```bash
    cd stockapp-react
    ```

3. **Install the project dependencies.**

    ```bash
    npm install
    ```

    This will install the following dependencies:

    - `@heroicons/react`: A set of SVG icons for React.
    - `@testing-library/jest-dom`: Custom jest matchers to test the state of the DOM.
    - `@testing-library/react`: Simple and complete React DOM testing utilities.
    - `@testing-library/user-event`: Simulate user events for testing.
    - `react`: The React library.
    - `react-dom`: React package for working with the DOM.
    - `react-scripts`: Scripts and configuration used by Create React App.
    - `recharts`: A composable charting library built on React components.
    - `web-vitals`: A library for measuring Web Vitals.

4. **Obtain API keys from Alpha Vantage and Finnhub:**

    - For Alpha Vantage:
        - Visit [https://www.alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)
        - Click on "Get your free API key".
        - Fill out the form and click "Get Free API Key".
        - Your API key will be displayed on the next page.

    - For Finnhub:
        - Visit [https://finnhub.io/register](https://finnhub.io/register)
        - Fill out the form and click "Get free API Key".
        - Check your email for the API key.

5. **Create a `.env` file in the root of the project directory and add your API keys:**

    ```bash
    REACT_APP_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
    REACT_APP_FINNHUB_API_KEY=your_finnhub_api_key
    ```

6. **Start the project.**

    ```bash
    npm start
    ```

    The application should now be running at `http://localhost:3000`.

Replace `your_alpha_vantage_api_key` and `your_finnhub_api_key` with the actual API keys you obtained.