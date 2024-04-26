# Price Tracker App

A web application used to track the real time prices of popular cryptocurrency coins as well as view the historical prices data of the coins for the past 3 days.
## Technologies used

React, Typescript, Jest, React Testing Library, Web Sockets
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

For running tests

### `npm run build`

For building the app

## Important Packages Used and their explanation

### MUI
Easy to use UI components & icons with customization possible.

### Apex Charts
A wide variety of charts. More specifically, best candlestick graph support as it is the best for real time value updates.

### Jest
Already configured with React & widely used with it. For typescript, I had to add further configurations but it works well with typescript as well.

### dayjs
A good lightweight alternative for moment. Needed this package in order to format the dates displayed on the graph.

### react-router-dom
Popular for routing and navigation & easy to use. Can easily get parameter value to keep the data updated. For example, in this case current coin code is added to the url as a param value.

### react-loading-dot
For indication of loading while the real time data is being fetched.


## Assumptions & Information
- The real-time current price value of coin is displayed adjusted to 5 decimal places. The value color changes to green if price increases and to red if it decreases.

- Historical price data displayed is for past 3 days with 30 minute intervals.

- Only the few popular coins are listed for tracking.

- The UI is divided into logical components and the folder is made as such that the relavant files are grouped so it is easy to understand.

- Have added basic theme colors in _variables.scss so that if the theme colors have to be changed, we can change it at one place only. Similarly for use of colors in tsx components the theme colors are added as constants in the common folder.

- Helper functions are added in utils so that they can be used whenever required and the code is not redundant.

- scss files are used & container class for the specific component is wrapped for that component's scss so that the components styling are not mixed.

- Not Found page is added in case user enters the wrong coincode in the url for tracking price.

- Favicon and title are updated according to the app as well.

- Each test file is located inside the specific component folder.
### Folder Structure
- `common` folder consists of the common information i.e. the data, interfaces, constants & util/helper functions.
- `components` folder contains the components which are children components.
- `images` folder consists of all the images used. In this case, coin logos & app logo.
- `pages` folder contains the components which are directly rendered i.e. which have routes.
- `src` folder has all the global files & configs.

## APIs used

After doing some research, used Binance APIs as they were free priced, accurate & didn't require API Keys or secret to fetch data as well. Two APIs are used:
- **Web Socket API:** To get real time price updates for coins. The current trade price value with usdt is fetched for each coin.
- **KLines API:** To get historical price data for a coin for past 3 days. The interval set is 30 minutes so the open, high, low, close data is returned as response with the 30 minutes intervals.

## Units Tests

The app is tested on a total of 4 unit tests:
- **Coin Card Click Test:** Verifies if the user is redirected to the correct coin's URL on card click.
- **Historical Data Chart Test:** Verifies if the chart is rendered & if it contains the accurate information using mock data.
- **Web Socket API Test:** Verifies if the real-time current price is correctly updated when web socket response is get using mock response.
- **Coin Cards Render Test:** Verifies if all the coins are rendered in the list as in the coinData file

## Other References
### Icons
The icons used in this project are downloaded from [https://logowik.com/](https://logowik.com/)