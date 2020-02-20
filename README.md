# :rocket: Colling Chat(bot) API

This chatbot has been developed and improved so that it looks more and more like its users, its natural language processing algorithm (NLP) is able to understand and process typos and questions that are not registered in the database.

## :vertical_traffic_light: Getting Started

Essas instruções fornecerão uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento.

### :minidisc: Installing

We recommend using Yarn, but you can use npm

  * First you need to have the [Docker](https://hub.docker.com/_/node/) installed on your computer;
  * You will need to run the docker images:
  
    **MySQL:**
    ```
    docker run --name mysqldb -e MYSQL_ROOT_PASSWORD=yourpassword -p 3306:3306 -d mysql:latest 
    ``` 

    **MongoDB:**
    ```
    docker run --name mongodb -p 27017:27017 -d -t mongo  
    ```
  * In mongodb create a database with the name "chatbot";
  * You need to install the dependencies:
  
    **Using NPM:**
    ```
    npm install
    ```
    **Using Yarn:**
    ```
    yarn install
    ```
  * Create the databases using:
    ```
    npx sequelize db:migrate
    ```
  * Start the application:
  
    **Using NPM:**
    ```
    npm start
    ```
    **Using Yarn:**
    ```
    yarn start
    ```

## :hammer: Built With

* [NodeJS](https://nodejs.org/en/docs/) - Runtime
* [Docker](https://hub.docker.com/_/node/) - Conteiners
* [ExpresJS](https://expressjs.com/) - Web Framework
* [MySql2](https://www.npmjs.com/package/mysql2) - Used to manage SQL data
* [MongooseJS](https://mongoosejs.com/) - Used to manage NoSQL data(ODM)

## Contributing

Please read [CONTRIBUTING.md](https://github.com/esdrasac/chatbot/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

1.0.0

## Authors

* **Esdras Aguilar** - *Initial work* - [esdrasac](https://github.com/esdrasac)

See also the list of [contributors](https://github.com/esdrasac/chatbot/blob/master/CONTRIBUTORS.md) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/esdrasac/chatbot/blob/master/LICENSE) file for details

## Acknowledgments

* To God for his infinite goodness
* To my college teachers
* To my parents
