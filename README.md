<a name="readme-top"></a>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT HEADER -->
<div align="center">
<h3 align="center">Restaurant Reservation</h3>

  <p align="center">
    <a href="https://github.com/geneseelh/restaurant-reservation/issues">Report Bug</a>
    ·
    <a href="https://github.com/geneseelh/restaurant-reservation/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Restaurant Reservation is a full-stack application that allows restaurant managers to create and manage their customer reservations. It offers an efficient platform for overseeing reservations and table management for each day, utilizing a responsive design that ensures a user-friendly experience across various devices.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- **Frontend:** React, JavaScript, Bootstrap
- **Backend:** Node.js, Express.js, Knex
- **Database:** PostgreSQL

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Fork and Clone the repository
   ```sh
   git clone https://github.com/geneseelh/restaurant-reservation.git
   ```
3. Install NPM packages
   ```sh
   npm install
   npm start
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES EXAMPLES -->
## Features

<!-- Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. -->
**Dashboard:** View and manage customer reservations and table capacities by date.
<!-- screenshot of dashboard -->
![dashboard](https://github.com/geneseelh/restaurant-reservation/assets/129642269/986531ea-febe-4f2e-b282-3e9dd2431103)

**Create a New Reservation:** Input customer information to create a new reservation.
<!-- screenshot of new reservation form -->
![new-reservation](https://github.com/geneseelh/restaurant-reservation/assets/129642269/e39effb8-2b2e-414c-846d-a4d3456ed6b6)

**Create a New Table:** Input table information to create a new table name and capacity.
<!-- screenshot of new table form -->
![create-table](https://github.com/geneseelh/restaurant-reservation/assets/129642269/906ffc2a-3198-462c-836a-b8a645abf263)

**Search For a Customer Reservation:** Input a phone number of a specific customer to list all reservations of that customer.
<!-- screenshot of search page -->
![search](https://github.com/geneseelh/restaurant-reservation/assets/129642269/096525a8-23c2-42e2-b0cd-47a669c920a5)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- API DOCUMENTATION -->
## API Documentation

#### `GET /api/reservations`

**Description**: Fetches a list of all reservations.

**Response**:

```json
{
  "data": [
    {
      "first_name": "Rick",
      "last_name": "Sanchez",
      "mobile_number": "202-555-0164",
      "reservation_date": "2020-12-31",
      "reservation_time": "20:00:00",
      "people": 6,
      "status": "booked",
      "created_at": "2020-12-10T08:30:32.326Z",
      "updated_at": "2020-12-10T08:30:32.326Z"
    },
    {
      "first_name": "Frank",
      "last_name": "Palicky",
      "mobile_number": "202-555-0153",
      "reservation_date": "2020-12-30",
      "reservation_time": "20:00",
      "people": 1,
      "status": "booked",
      "created_at": "2020-12-10T08:31:32.326Z",
      "updated_at": "2020-12-10T08:31:32.326Z"
    },
    {
      "first_name": "Bird",
      "last_name": "Person",
      "mobile_number": "808-555-0141",
      "reservation_date": "2020-12-30",
      "reservation_time": "18:00",
      "people": 1,
      "status": "booked",
      "created_at": "2020-12-10T08:31:32.326Z",
      "updated_at": "2020-12-10T08:31:32.326Z"
    },
    {
      "first_name": "Tiger",
      "last_name": "Lion",
      "mobile_number": "808-555-0140",
      "reservation_date": "2025-12-30",
      "reservation_time": "18:00",
      "people": 3,
      "status": "booked",
      "created_at": "2020-12-10T08:31:32.326Z",
      "updated_at": "2020-12-10T08:31:32.326Z"
    },
    {
      "first_name": "Anthony",
      "last_name": "Charboneau",
      "mobile_number": "620-646-8897",
      "reservation_date": "2026-12-30",
      "reservation_time": "18:00",
      "people": 2,
      "status": "booked",
      "created_at": "2020-12-10T08:31:32.326Z",
      "updated_at": "2020-12-10T08:31:32.326Z"
    }
  ]
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Genesee Harmon - geneseelh@gmail.com

Project Link: [https://github.com/geneseelh/restaurant-reservation](https://github.com/github_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[forks-shield]: https://img.shields.io/github/forks/geneseelh/restaurant-reservation.svg?style=for-the-badge
[forks-url]: https://github.com/geneseelh/restaurant-reservation/forks
[stars-shield]: https://img.shields.io/github/stars/geneseelh/restaurant-reservation.svg?style=for-the-badge
[stars-url]: https://github.com/geneseelh/restaurant-reservation/stargazers
[issues-shield]: https://img.shields.io/github/issues/geneseelh/restaurant-reservation.svg?style=for-the-badge
[issues-url]: https://github.com/geneseelh/restaurant-reservation/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/genesee-harmon
<!-- [product-screenshot]: images/screenshot.png -->


<!-- ## Restaurant Reservation System

## Features

1. **Flexible Reservation Handling:** Effortlessly generate, modify, and view reservations for well-organized day-to-day tracking.
2. **Intuitive Table Management:** Allocate particular tables to reservations and monitor real-time table availability.
3. **Search Capability:** Retrieve reservations instantly using mobile numbers.
4. **Reservation Status:** Visualize the status of reservations (booked, seated, finished) for efficient management.
5. **Future Reservation Constraints:** Ensure reservations are made only on open days and during eligible hours.
6. **User-friendly Interface:** Navigate and manage reservations with efficient, responsive, and intuitive UI.

## Tech Stack

- **Frontend:** React, JavaScript, Bootstrap
- **Backend:** Node.js, Express.js, Knex
- **Database:** PostgreSQL

## API Documentation

#### `GET /api/reservations`

**Description**: Fetches a list of all reservations.
**Response**:

```json
{
  "data": [
    {
      "reservation_id": 6,
      "first_name": "John",
      "last_name": "Doe",
      "mobile_number": "555-491-5285",
      "reservation_date": "2023-08-17T00:00:00.000Z",
      "reservation_time": "12:25:00",
      "people": 3,
      "created_at": "2023-08-17T16:26:09.060Z",
      "updated_at": "2023-08-17T16:26:09.060Z",
      "status": "seated"
    },
    {
      "reservation_id": 7,
      "first_name": "Sally",
      "last_name": "May",
      "mobile_number": "555-895-4216",
      "reservation_date": "2023-08-17T00:00:00.000Z",
      "reservation_time": "13:26:00",
      "people": 4,
      "created_at": "2023-08-17T16:26:58.324Z",
      "updated_at": "2023-08-17T16:26:58.324Z",
      "status": "booked"
    },
    {
      "reservation_id": 8,
      "first_name": "Peter",
      "last_name": "Clark",
      "mobile_number": "555-216-8957",
      "reservation_date": "2023-08-17T00:00:00.000Z",
      "reservation_time": "15:28:00",
      "people": 1,
      "created_at": "2023-08-17T16:28:23.241Z",
      "updated_at": "2023-08-17T16:28:23.241Z",
      "status": "booked"
    },
    {
      "reservation_id": 5,
      "first_name": "Anthony",
      "last_name": "Charboneau",
      "mobile_number": "620-646-8897",
      "reservation_date": "2026-12-30T00:00:00.000Z",
      "reservation_time": "18:00:00",
      "people": 2,
      "created_at": "2020-12-10T08:31:32.326Z",
      "updated_at": "2020-12-10T08:31:32.326Z",
      "status": "booked"
    },
    {
      "reservation_id": 3,
      "first_name": "Bird",
      "last_name": "Person",
      "mobile_number": "808-555-0141",
      "reservation_date": "2020-12-30T00:00:00.000Z",
      "reservation_time": "18:00:00",
      "people": 1,
      "created_at": "2020-12-10T08:31:32.326Z",
      "updated_at": "2020-12-10T08:31:32.326Z",
      "status": "booked"
    },
    {
      "reservation_id": 4,
      "first_name": "Tiger",
      "last_name": "Lion",
      "mobile_number": "808-555-0140",
      "reservation_date": "2025-12-30T00:00:00.000Z",
      "reservation_time": "18:00:00",
      "people": 3,
      "created_at": "2020-12-10T08:31:32.326Z",
      "updated_at": "2020-12-10T08:31:32.326Z",
      "status": "booked"
    },
    {
      "reservation_id": 1,
      "first_name": "Rick",
      "last_name": "Sanchez",
      "mobile_number": "202-555-0164",
      "reservation_date": "2020-12-31T00:00:00.000Z",
      "reservation_time": "20:00:00",
      "people": 6,
      "created_at": "2020-12-10T08:30:32.326Z",
      "updated_at": "2020-12-10T08:30:32.326Z",
      "status": "booked"
    },
    {
      "reservation_id": 2,
      "first_name": "Frank",
      "last_name": "Palicky",
      "mobile_number": "202-555-0153",
      "reservation_date": "2020-12-30T00:00:00.000Z",
      "reservation_time": "20:00:00",
      "people": 1,
      "created_at": "2020-12-10T08:31:32.326Z",
      "updated_at": "2020-12-10T08:31:32.326Z",
      "status": "booked"
    }
  ]
}
```

## Installation Instructions

### Clone the Repository

Clone and Fork the repository.

### Install with npm

```bash
  npm install
  npm start
``` -->
