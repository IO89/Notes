# Notes app client

Notes app help to communicate trough shared board for different users via sticky notes.
It is possible to create/edit/delete and re-arrange notes.

Notes saved to local storage of a browser, and the will persists even if connection is lost.
Notes synchronised via server that uses web socket connection to broadcast notes for other clients.

## How to install

Switch to client folder and install client's dependencies (from root folder):

```shell
cd client && yarn
```

Switch to server folder and install server's dependencies (from root folder):

```shell
cd server && yarn
```

## How to run application

To run client(from client's folder):

```shell
yarn run dev
```

To run server in watch mode(from server's folder):

```shell
yarn  run dev
```

To run db in a container(from server's folder):

```shell
docker-compose up -d
```

or

```shell
podman-compose up -d
```

## Future improvements

- Convert project to monorepo and share types/code
- Create pipeline to deploy client to S3 buckets and use Cloudfront CDN to serve client.
- Create pipeline to deploy containerized server to AWS Fargate to be able to scale on demand.
- Evaluate which DB would fit this case and find managed service.
