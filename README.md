
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
## Usage Notes

### Validations

The request data is validated according to the following rules. If validation fails, the response will return an appropriate error message:

- **date**: Required. Must be a string in ISO-8601 format.  
- **products**: Optional. If provided, it must be one of `"Heatpumps"` or `"SolarPanels"`. If omitted, the response will include available slots for any product.  
- **language**: Optional. If provided, it must be either `"German"` or `"English"`. If omitted, the response will include available slots for any language.  
- **rating**: Optional. If provided, it must be one of `"Gold"`, `"Silver"`, or `"Bronze"`. If omitted, the response will include available slots for any rating.  

An additional validation could be added to ensure the date is today or later. However, to simplify testing with fixed data samples, this constraint has been omitted.  

### Database

A **composite index** was added for `slots.start_date` and `slots.end_date`. This is an optimal choice for scenarios requiring frequent data queries with fewer write operations.  

The provided `init.sql` file remains unchanged. Instead, the index is created in a separate file, `0_create-tables.sql`. The tables are re-created in this file to enforce the correct index creation order before inserting data.

## Contact Information
For questions or support, please contact gustavo.peixoto.jobs@gmail.com

## License
GNU General Public License v3
