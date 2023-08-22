# Microservices for DIP-CP Partners

**RESTful API** based in **SOLID** principles for data controll and management of DIP-CP Partners. This Microservice applies useful concepts (**Dependency Injection**, **Repository Pattern** etc.) and use **MongoDB Atlas** as database.

## Table of contents

- [Microservices for DIP-CP Partners](#microservices-for-dip-cp-partners)
  - [Table of contents](#table-of-contents)
  - [Entity Structure](#entity-structure)
  - [Companies - Routes](#companies---routes)
  - [User - Routes](#user---routes)
  - [Technologies](#technologies)
  - [Setup](#setup)
  - [Environment Variables](#environment-variables)
  - [Author](#author)

## Entity Structure

The company entity has the following structure:

- Name: string
- Online image: string (url)
- Description of the business segment: string
- Company partner's website: string (url)

## Companies - Routes

- **GET**
  - `/companies` - **Get** all partners companies.
    - **Returns:** An array of companies.
  - `/companies/:id` - **Get** a partner company by id.
    - **Returns:** A company.
- **POST**
  - `/companies` - **Create** a partner company.
    - **Returns:** The created company.
    - **NEEDS:** The login token.
    - **NOTE:** The body of the request must be a JSON object with the following structure:
      ```json
      {
      "name": [string],
      "image": [string (url)],
      "description": [string],
      "link": [string (url)]
      }
      ```
      The company's id will be generated automatically by MongoDB.
- **PATCH**
  - `/companies/:id` - **Update** a partner company.
    - **Returns:** The updated company.
    - **NEEDS:** The login token.
    - **NOTE:** The body of the request must be a JSON object with the following structure:
      ```json
      {
      "name": [string],
      "image": [string (url)],
      "description": [string],
      "link": [string (url)]
      }
      ```
      All of these properties are optional, so it's possible to update one property or all of them.
- **DELETE**
  - `/companies/:id` - **Delete** a partner company.
    - **Returns:** The deleted company.
    - **NEEDS:** The login token.

## User - Routes

- **POST**
  - `/login` - **Get** the login validation (**token**).
    - **Returns:** If the login matchs, return the token for **POST**, **PATCH** and **DELETE** routes.
      ```json
      {
      "username": [string],
      "password": [string]
      }
      ```

## Technologies

- Node
- Yarn
- Typescript
- Express
- MongoDB Atlas

## Setup

Clone this repository and run the following commands:

```bash
$ yarn install
$ yarn start:dev
```

The server will be running on `http://localhost:{PORT}`.

**NOTE:** You must have a MongoDB Atlas running on your machine.

## Environment Variables

- `PORT` - Port where the server will be running.
- `MONGODB_URL` - MongoDB Atlas URL.
- `MONGODB_USERNAME` - MongoDB Atlas editor username.
- `MONGODB_PASSWORD` - MongoDB Atlas editor password.

## Author

- [Enzo Sakamoto](https://github.com/enzosakamoto)
