# Use the official PostgreSQL image from the Docker Hub
FROM postgres:16

# Add the 0_create-indexes.sql script to the Docker image
COPY 0_create-tables.sql /docker-entrypoint-initdb.d/

# Add the init.sql script to the Docker image
COPY init.sql /docker-entrypoint-initdb.d/
