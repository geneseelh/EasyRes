<a name="readme-top"></a>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

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

## About The Project

Restaurant Reservation is a full-stack application that allows restaurant managers to create and manage their customer reservations. It offers an efficient platform for overseeing reservations and table management for each day, utilizing a responsive design that ensures a user-friendly experience across various devices.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- **Frontend:** React, JavaScript, Bootstrap
- **Backend:** Node.js, Express.js, Knex
- **Database:** PostgreSQL

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Installation

1. Fork and Clone the repository
   ```sh
   git clone https://github.com/geneseelh/restaurant-reservation.git
   ```
2. Install NPM packages
   ```sh
   npm install
   npm start
   ```
   <p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

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

## Contact

Genesee Harmon - geneseelh@gmail.com

Project Link: [https://github.com/geneseelh/restaurant-reservation](https://github.com/github_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[forks-shield]: https://img.shields.io/github/forks/geneseelh/restaurant-reservation.svg?style=for-the-badge
[forks-url]: https://github.com/geneseelh/restaurant-reservation/forks
[stars-shield]: https://img.shields.io/github/stars/geneseelh/restaurant-reservation.svg?style=for-the-badge
[stars-url]: https://github.com/geneseelh/restaurant-reservation/stargazers
[issues-shield]: https://img.shields.io/github/issues/geneseelh/restaurant-reservation.svg?style=for-the-badge
[issues-url]: https://github.com/geneseelh/restaurant-reservation/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/genesee-harmon
