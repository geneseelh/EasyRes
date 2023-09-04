[![Forks][forks-shield]][https://github.com/geneseelh/restaurant-reservation/forks]
[![Stargazers][stars-shield]][https://github.com/geneseelh/restaurant-reservation/stargazers]
[![Issues][issues-shield]][https://github.com/geneseelh/restaurant-reservation/issues]
[![LinkedIn][linkedin-shield]][www.linkedin.com/in/genesee-harmon]

## About The Project

<!-- dashboard screenshot -->

<!-- PROJECT HEADER -->
<br />
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

<!-- [![Project Screenshot][project-screenshot]](https://example.com) -->

    Restaurant Reservation is a full-stack application that allows restaurant managers to create and manage their customer reservations. It offers an efficient platform for overseeing reservations and table management for each day, featuring a responsive design that ensures a user-friendly experience across various devices.

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
   ```
4. Start
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES EXAMPLES -->
## Features

<!-- Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. -->
Dashboard: View and manage customer reservations and table capacities by date.
<!-- screenshot of dashboard -->

Create a New Reservation: Input customer information to create a new reservation.
<!-- screenshot of new reservation form -->

Create a New Table: Input table information to create a new table name and capacity.
<!-- screenshot of new table form -->

Search For a Customer Reservation: Input a phone number of a specific customer to list all reservations of that customer.
<!-- screenshot of search page -->

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