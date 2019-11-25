UC Davis Web Development Bootcamp June 2019 (Part-Time) 

Instructor: Josh McKenny

Team: Lyn Tan, John Babin, Connor Paxton, Fiona Zhou 

Hosted using Heroku: http://car-a-ok.herokuapp.com/

[hosted AR randomizer add-on here?]

https://github.com/JohnEBabinJr/Final-Project 

*To run outside of hosted version via downloaded or cloned Github, please note that it will require setup of own database to save playlists to and npm install. 

# Car-A-OK - "Collaborate on the ultimate roadtrip playlist with your friends using Spotify. Share the link, queue up songs, and export your playlist to relive the memories."

Car-a-ok (rebranded, thanks Tesla) is a Spotify playlist creation application that allows multiple users to create a single playlist to be played from a single device. Never fight for the aux cord or Bluetooth connection ever again! (Optional: When using Google Maps, Spotify has native integration that allows for display and usage of player controls overlaid on the map. Safety note: try to limit unnecessary phone usage while driving and have another occupant in the vehicle use the device)

*Before creating the playlist, please sign into an existing Spotify account.

[gif of the front page]

[gif of the user entry and example codes]

[gif of the playlist creation]

## Other Use Cases

Car-A-OK can run double duty to create short term playlists for parties or events when you're not on the go, or just a simple listening room amongst friends.

We have also included a link to our previous travel planning app, Jon. Use it find open bathrooms at odd hours or in an emergency. Users can also search for specific resources such as baby-changing stations.

## Build Information

The app is hosted on Heroku and was scaffolded using create-react-app. This is our first custom React project utilizing the Spotify API for userbase and song searching.

-AJAX is used to for asynchronous calls to retrieve OAuth Token.

-Axios JS library is utilized to get, delete, and save tracks that have been found through the Spotify API.

-Bootstrap/React Bootstrap is utilized as the front-end framework in order to create a sleek, responsive experience for use on mobile devices and full desktop browsers.

-Dotenv/NODE_ENV used to state whether a particular environment is a production or a development environment

-Eslint configuration for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

-Node.js+Mongodb for back-end, database functionality, and object modeling.
