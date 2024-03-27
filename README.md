# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

### Clone repository

```
git clone https://github.com/gsidnick/nodejs2024Q1-service.git
```

### Checkout to branch

```
git checkout feat/part-2
```

## Installing NPM modules

```
npm install
```

## Environment

Copy `.env.example` file and then rename it to `.env` before running the application

## Running Application (Docker)

### Run Services

```
npm run docker:up
```

### Stop Services

```
npm run docker:stop
```

### Delete Services

```
npm run docker:down
```

### Delete Services & Volumes

```
npm run docker:down:volumes
```

### Scan Docker Image

```
npm run docker:scan
```

## Running Application (Local)

### Production Mode

```
npm run start
```

### Development Mode

```
npm run start:dev
```

### Build Application

```
npm run start:prod
```

> After starting the app on port (4000 as default) you can open
> in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
> For more information about OpenAPI/Swagger please visit https://swagger.io/.

## User Endpoints

### Get all users

```
GET /user
```

### Create new user

```
POST /user
```

#### Body example

```
{
  "login": "John Doe",
  "password": "3fa85f64"
}
```

### Get single user by ID

```
GET /user/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

### Updates a user's password by ID

```
PUT /user/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

#### Body example

```
{
  "oldPassword": "3fa85f64",
  "newPassword": "2c963f66afa6"
}
```

### Deletes user by ID

```
DELETE /user/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

## Track Endpoints

### Get all tracks

```
GET /track
```

### Add new track information

```
POST /track
```

#### Body example

```
{
  "name": "The Show Must Go On",
  "artistId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "albumId": "5e917cdc-2862-430c-b9fc-3b0ad784a597",
  "duration": 262
}
```

### Get single track by ID

```
GET /track/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

### Update library track information by ID

```
PUT /track/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

#### Body example

```
{
  "name": "Bohemian Rhapsody",
  "artistId": "5e917cdc-2862-430c-b9fc-3b0ad784a597",
  "albumId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "duration": 355
}
```

### Delete track by ID

```
DELETE /track/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

## Album Endpoints

### Get all albums

```
GET /album
```

### Add new album information

```
POST /album
```

#### Body example

```
{
  "name": "Innuendo",
  "year": 1991,
  "artistId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

### Get single album by ID

```
GET /album/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

### Update library album information byID

```
PUT /album/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

#### Body example

```
{
  "name": "Innuendo",
  "year": 1991,
  "artistId": "5e917cdc-2862-430c-b9fc-3b0ad784a597"
}
```

### Delete album by ID

```
DELETE /album/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

## Artist Endpoints

## Get all artists

```
GET /artist
```

### Add new artist information

```
POST /artist
```

#### Body example

```
{
  "name": "Freddie Mercury",
  "grammy": false
}
```

### Get single artist by ID

```
GET /artist/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

### Update library album information byID

```
PUT /artist/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

#### Body example

```
{
  "name": "Freddie Mercury",
  "grammy": false
}
```

### Delete artist by ID

```
DELETE /artist/{id}
```

## Favorites Endpoints

## Get all favorites

```
GET /favs
```

### Add track to the favorites

```
POST /favs/track/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

### Delete track from favorites

```
DELETE /favs/track/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

### Add album to the favorites

```
POST /favs/album/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

### Delete album from favorites

```
DELETE /favs/album/{id}
```

### Add artist to the favorites

```
POST /favs/artist/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

### Delete artist from favorites

```
DELETE /favs/artist/{id}
```

#### Parameters

```
{id} in uuid v4 format
```

#### Parameters

```
{id} in uuid v4 format
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only users test suites

```
npm run test test/users.e2e.spec.ts
```

To run only albums test suites

```
npm run test test/albums.e2e.spec.ts
```

To run only artists test suites

```
npm run test test/artists.e2e.spec.ts
```

To run only tracks test suites

```
npm run test test/tracks.e2e.spec.ts
```

To run only favorites test suites

```
npm run test test/favorites.e2e.spec.ts
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

## Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
