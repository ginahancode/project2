# project2 -- Game Pocket

## Project Description

Using the Game Pocket application, gamers can keep track of the video games they've played. 
Game Pocket users can add games to their list, assign scores, write reviews, and categorize by status ("currently playing", "completed", "plan to play", ...). 
There is also a basic social aspect to the site where users can view other game lists.

## Technologies Used

* Angular (Bootstrap for design, VSCode as IDE)
* Spring (Tomcat for server, Hibernate as database link, IntelliJ as IDE)
* Postgres (Amazon Web Services for hosting, DBeaver for viewing and SQL setup)
* IGDB API (video game database)
* CORS-anywhere server (CORS proxy)
* JUnit (testing)
* Log4j (logging)

## Features

List of features
* Create a new Game Pocket account
* Sign in to Game Pocket (the sign-in persits between pages)
* Change account information
* Search for a game to add to you game list
* Add games to your list, and categorize by completion status ("Currently Playing", "Completed", "On Hold", "Dropped", "Plan to Play")
* Delete games from your list
* Add reviews (descriptions) and review scores to your games
* View game info from the IGDB (game database) on your games such as screenshots, critic scores, platforms, and more
* View other user's game lists

To-do list:
* Make the social aspect more robust

## Getting Started
   
type `git clone https://github.com/kacperdudz/project2.git` to clone this repo

## Usage

- A CORS server has to be set up to bypass the CORS when sending requests to the IGDB API (https://www.igdb.com/api). The server to set up, with instructions, can be found here:
https://github.com/Rob--W/cors-anywhere

- A database connection needs to be established. Proper credentials must be provided in the `/project2-server/src/main/resources` directory.

- A Twitch API account (https://dev.twitch.tv/login) must be set up, prodviding credentials in the headers for requests in the proper service classes on the front end, 
in `\project2\project2-client\src\app`. More info about how to set up the Twitch link can be found here: https://api-docs.igdb.com/#account-creation

## Contributors

Gina Han, Jacob Vassas, Kacper Dudzinski
