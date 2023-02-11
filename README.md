<a name="readme-top"></a>
<div align="center">
  <h3 align="center">App Logistic Company Node JS</h3>
</div><br>

## Access AngularJS front-end

[![Repository](https://img.shields.io/badge/Angular-Frontend-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://github.com/wbilibio/app-logistic-company)

## About The Project

Application that performs the manage storage, inventory and transportation(shipments) of the packages. 
It is possible to create storage locations with package limits and then create packages and relate them in these storages.

API:
* Controls all business rules
* Stock limitations for each storage location
* Validators
* Complete documentation with all endpoints

### Built With

The main technologies used on API are listed below:

* [![Node][Node.js]][Node-url]
* [![Nest][Nest.js]][Nest-url]
* [![Jest][Jest.js]][Jest-url]
* [![TypeORM][TypeORM.js]][TypeORM-url]
* [![Swagger][Swagger.js]][Swagger-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Follow the instructions to run the API correctly:

### Prerequisites

1. Create a Schema on <a href="https://www.postgresql.org/download/">PostgreSQL</a> Database called "logistic"

2. <a href="https://redis.io/docs/getting-started/installation/">Install Redis</a> and configure
   ```sh
    REDIS_HOST=""
    REDIS_PASS=""
    REDIS_PORT=""
   ```

### Start

1. Clone the repo
   ```sh
   git clone git@github.com:wbilibio/app-logistic-company-api.git
   ```
2. Duplicate and rename from .env.example to .env
### Intalation with Docker

1. Run build develop environment:
```sh
  docker compose -f "docker-compose.yml" up --build dev 
```

2. Get environment variables on .env and start a Postgres connection, then create a schema called "logistic".

3. Access container docker:
```sh
  docker exec -it logistic_company_api_dev s
```  

3. Run migration:
```sh
  yarn migration:run:dev
```

### Instalation without Docker

1. Create a Schema on <a href="https://www.postgresql.org/download/">PostgreSQL</a> Database called "logistic"

2. <a href="https://redis.io/docs/getting-started/installation/">Install Redis</a> and configure
   ```sh
    REDIS_HOST=""
    REDIS_PASS=""
    REDIS_PORT=""
   ```

2. Install NPM packages
   ```js
   yarn install
   ```
3. Create and seed the migrations
   ```js
   yarn migration:run:dev
   ```
4. Unit tests
   ```js
   yarn test
   ```

5. Run project
   ```js
   yarn dev
   ```
6. Access the documentation for more details.
   ```sh
   base_url+'/api/static/index.html'
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[Node.js]: https://img.shields.io/badge/Node-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[Nest.js]: https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[Nest-url]: https://nestjs.com/
[Jest.js]: https://img.shields.io/badge/JestJS-C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io
[TypeORM.js]: https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=typeorm&logoColor=white
[TypeORM-url]: https://typeorm.io
[Swagger.js]: https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black
[Swagger-url]: https://swagger.io
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org
