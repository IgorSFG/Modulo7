# Image from PostgreSQL
FROM postgres:latest

# Variables from PostgreSQL
ENV POSTGRES_DB = postgres
ENV POSTGRES_USER = postgres
ENV POSTGRES_PASSWORD = postgres

# Copy init.sql to create table and insert data
COPY init.sql /docker-entrypoint-initdb.d/