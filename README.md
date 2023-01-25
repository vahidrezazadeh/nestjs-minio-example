
# Nest.js Min.io Example

A simple example of Min.io implementation in Nest.js

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MINIO_ENDPOINT`

`MINIO_PORT`

`MINIO_ACCESS_KEY`

`MINIO_SECRET_KEY`

`MINIO_BUCKET_NAME`


## Run Locally

Clone the project

```bash
  git clone https://github.com/vahidrezazadeh/nestjs-minio-example
```

Go to the project directory

```bash
  cd nestjs-minio-example
```

Run min.io with Docker Compose ( you can change min.io console password in environment variables in docker-compose.yml)

```bash
  docker compose  -f docker-compose.yml up
```

Login into http://localhost:9001/ with username/password and Create AccessKey/SecretKey and  and set to your .env and Run Nest.js Project With

```bash
  nest start
```


## Related

Here are some related projects

[Nest.js](https://github.com/nestjs/nest)

[Min,io](https://github.com/minio/minio)

## Authors

- [Vahid Rezazadeh](https://www.github.com/vahidrezazadeh)

