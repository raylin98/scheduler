# Interview Scheduler

## Project Description
Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. This Application utilizes many built-in functions from React in addition to customized hooks which allows users to add or delete appointments and allows a user to edit appointments. 

## Features

* Appointment days are displayed on the left-hand side displaying Monday to Friday and is color differentiated
* Each day shows user's s how many spots are available
* User can freely switch between days and the information associated with the day
* User's can book interviews so long as there is availability and allows user's to choose from a range of available interviwers
* User's can freely edit or cancel any appointments by clicking on the associated icons
* Slot availbility is updated as soon as an appointment is booked or cancelled
## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Demo


https://github.com/raylin98/scheduler/assets/124003437/eac56a11-2a54-47e6-b246-0750a2520263


## Server/Database Setup

To utilize the application's full features you have to run both the client and the API server simultatenously

* First, follow the instructions by forking and cloning the [Scheduler-Api](https://github.com/lighthouse-labs/scheduler-api) server
* Follow the instructions from the README to setup

## Stack
**Front-End**: React, Axios, JSX, HTML, SASS and JavaScript

**Back-End**: Express, PostgresSQL

**Testing**: Storybook, Jest, Cypress

## Dependencies
* Axios
* Babel
* Classnames
* Cypress
* Jest
* Normalize.css
* React
* React-dom
* React-scripts
* Storybook
* Babel
* Storybook
