
# Sales Agenda Application

## Introduction

This application is designed to demonstrate how to structure and implement the architecture of an agenda system (only the part for querying available slots). It uses modern web technologies and a scalable design to handle real-time slot bookings efficiently. 

You can find more projects on my portfolio listing: https://github.com/gustavobap/Portfolio

The application comprises:
- **Backend**: A NestJS application handling database interactions.
- **Database**: PostgreSQL database for persisting sales manager's meeting times and calculating available slots. 
- **Docker**: Used to containerize and orchestrate services with Docker Compose.

## Setup Instructions

### Clone repositories

```bash
git clone github.com:gustavobap/SalesAgenda.git
```

### Configure and run

This project uses **docker** and **docker-compose** to build all infrastructure. You will need both installed.
**The setup was only tested in Ubuntu**

First configure server's and client's IPs and ports in the **docker/.env** file. Default values are shown bellow.

```bash
API_PORT=3000
DB_HOST=database
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=mypassword123!
DB_NAME=coding-challenge
```

Then change to the project root directory to build infrastructure and run the application:

```bash
docker-compose up
```

It will take some time for all the building to finish. After it's done you can access the app at the configured URL. 

eg. http://localhost:3000

You can remove docker images and containers running following script

```bash
docker-compose down --rmi all
```
## Usage Instructions

TODO

## Contact Information
For questions or support, please contact gustavo.peixoto.jobs@gmail.com

## License
GNU General Public License v3
