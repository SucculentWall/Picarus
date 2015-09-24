# Picarus

> An on demand photo sharing app that allows users to both post their own original photos and request new photos from others.

## Team

  - __Product Owner__: JP Ji
  - __Scrum Master__: Edwin Lin
  - __Front-end Lead__: Ning Xia
  - __Back-end Lead__: Albert Tang

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

Visit Picarus to browse original, eye catching photos from the community.  Login with Facebook to submit a request for original photos in less than 60 seconds.  Earn karma points for submitting original photos.

## Requirements

`ImageMagick`
`Node`
`PostgreSQL`

## Development

### Installing Dependencies

Then install PostgreSQL:

- Install the Postgres app from [http://postgresapp.com/](http://postgresapp.com/)
  - [Next, follow these instructions to set up your bash profile $PATH](http://postgresapp.com/documentation/cli-tools.html)
- Run the Postgres app from your Applications folder
- Create a `picarus` database

```sh
npm install
gulp
```

Starting the server:
```
node server/server.js
```

### Roadmap

View the project roadmap [here](https://github.com/SucculentWall/Picarus/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
