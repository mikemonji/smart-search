# Smart Search API

## Introduction

This project implements a smart search algorithm using NestJS, TypeORM, PostgreSQL, and Swagger for API documentation. The search algorithm extracts entities such as cities, brands, dish types, and diets from a search term and returns possible combinations.

## Technologies Used

- NestJS
- TypeORM
- PostgreSQL
- Swagger
- TypeScript
- Yarn

## Getting Started

### Prerequisites

- Node.js (>=12.x)
- Yarn
- PostgreSQL

### Installation

1. Clone the repository:

```
git clone <repository-url>
cd smart-search
```

1. Install dependencies:

```
yarn install
```

### Set up the `.env` file:

- The .env file is not included in the git repository and needs to be created at the root level of the project.
- The content of the `.env` file will be provided via email.
- Example of `.env` content:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=yourusername
DB_PASSWORD=yourpassword
DB_NAME=smart_search
```

### Run database migrations to set up the schema and import initial data:

```
yarn migration:run
```

```
yarn migration:run
```

## Running the Application

### Start the NestJS application:

```
yarn start
```

### Access Swagger UI:

- Navigate to `http://localhost:3000/api` in your browser to explore the API documentation and test endpoints.

## Smart Search Endpoint

- Endpoint: `GET /smart-search`
- Query Parameter: `term` (The search term to find entities)
- Example: `http://localhost:3000/smart-search?term=Veg sushi`

## Example Responses

- For term=Veg sushi, the response will be:

```
[
  {
    "diets": { "id": 1, "name": "Vegan" },
    "dishTypes": { "id": 72, "name": "Sushi" }
  },
  {
    "diets": { "id": 2, "name": "Vegetarian" },
    "dishTypes": { "id": 72, "name": "Sushi" }
  }
]
```

## Project Structure

- Entities: Located in `src/entities`
- Migrations: Located in `src/migration`
- Service: Smart search logic is implemented in `src/smart-search/smart-search.service.ts`
- Controller: API endpoint is defined in `src/smart-search/smart-search.controller.ts`
