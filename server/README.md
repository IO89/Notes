# Notes app server

Notes app server is server that uses websocket connection to communicate with client.
It syncs notes between clients and saves new notes to MongoDB database.

## How to run locally

To install necessary dependencies run:

```shell
yarn
```

## To run server locally

In order to run server you would need to run MongoDB in container. First, lets build container:

```shell
docker-compose build
```

or if use podman-compose

```shell
podman-compose build
```

Next you can start MongoDB in container:

```shell
docker-compose up
```

or if use podman-compose

```shell
podman-compose up
```

After we have our DB up and running we can start server in watch mode:

```shell
yarn run dev
```

## Future improvements

- Remove notes from db.
- Save multiple notes to db.
- Add tests that would interact with db.
- Use id that comes from note as id for saving or opposite use db id to use it in note.
- Place server container in docker-compose file.
