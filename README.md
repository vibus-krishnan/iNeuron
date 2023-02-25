# iNeuron


# CRUD Rest API Nodejs with Typescript

Sample Nodejs API with Typescript and Mongodb

## Script:

- npm install
- npm start

## Nodejs Typescript project

Follow these steps to create a new nodejs project with Typescript

- npm init
- tsc --init
- configure tsconfig.json file:
  - "outDir": "./build", ( Redirect output structure to the directory. )
  - "rootDir": "./src", ( Specify the root directory of input files. Use to control the output directory structure with outDir.)

## Mongodb

Mongodb options you can use a local :

- Local ("mongodb://localhost:27017/MyDb")

## Endponts:

### User:

- create user : localhost:3000/user/
- get user : localhost:3000/user/userId
- update user : localhost:3000/user/


## Swagger UI

localhost:3000/api-docs


## To run Tests

mocha -r ts-node/register 'src/tests/**/*.ts'
