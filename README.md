# Hotel Finder

Simple web app to search for hotel offers in some cities in Portugal, Spain, Italy and Brazil.

Worlking example: [https://hotelfinder-prod.vercel.app/](https://hotelfinder-prod.vercel.app/)

The app uses amadeus API [Amadeus API](https://developers.amadeus.com/self-service/category/hotel/api-doc/hotel-search/api-reference) to search for hotel offers and [AccuWeather API]([https://developer.accuweather.com/]) to get a 5 days forecast of the weather in the searched location.

The app is made with Next.js for frontend and node/express for the backend to make API endpoints, save data to database (MongoDB). You can find the backend application on the backend folder in this repo root.


**The app has 3 pages**:

- **home page** - With just the search bar and some cards with the available countrys and cities to search
- **search results page** - Shows search bar and the results from the search with order and filter options. Cards with the results are clickable to see more details of the hotel room (goes to details page)
- **details page** - Shows the details of an available hotel offer


## How to run it

#### Backend

First, get the backend to run.

Inside backend folder, you should add a ``.env`` file with the following environment variables:

```bash
MONGO_USER=<mongoDB user>
MONGO_PW=<mongoDB password>
MONGO_DB=<mongoDB database name>

AMADEUS_CLIENT_ID=<Amadeus PI client ID>
AMADEUS_CLIENT_SECRET=<Amadeus API secret>

ACCUWEATHER_API_KEY=<AccuWeather API key>
```

Then run:

``npm install``

and

``npm start``

The server will run by default on http://localhost:3007/


#### Frontend


The application will be served by default on http://localhost:3000


NOTE:

After runing npm install on backend and frontend, you can use the command

``npm run app-start``


### External APIs used

Please do keep in mind that a test Amadeus API is used and not all the information is available in the locations searched (hotel images are only populated for some major cities and  offers for the cities mentioned above are not always available).



**Amadeus API Documentation:**

- [https://developers.amadeus.com/self-service/category/hotel/api-doc/hotel-search/api-reference](https://developers.amadeus.com/self-service/category/hotel/api-doc/hotel-search/api-reference)


**AccuWeather API Documentation**:

- [https://developer.accuweather.com/](https://developer.accuweather.com/)


## Points of improvement:

- Add Automated tests;
- Infinite scroll pagination;
- Weather forecast card UI;
- Add currency em localization selection;
- Auth middleware for the backend API routes;
