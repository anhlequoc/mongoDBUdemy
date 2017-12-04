# Readme
- course link: https://www.udemy.com/the-complete-developers-guide-to-mongodb
- Github Reference Repo: https://github.com/StephenGrider/MongoCasts

Command to start mongodb server:
> cd  C:\Users\user_name
>"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "F:\STUDY\MongoDatabase\data"

## Section 11
Mongooes - is ORM or OTM 
    - ORM: Object Relational Mapper
    - OTM: Object Data Mapping
> Mongooes allows us to work with our Mongo database in a much easier way than using Mongo's core APIs

- Sometime we work with Mongo but most times we work with Mongooes because it's industry standard for everything have to do with Mongo

## Section 12
- Mongo allow storing multiple internal database inside of a single mongo instance
![Mongo - Multiple Databases In One Instance](https://i.imgur.com/rHpIJ3Y.png)

- In a specified database, there are **collections** that are used to store data. For example: collection of books, collections of states - stores different type of data

## Section 17
- model: a class in database (like user), model & class giống nhau, có thể dùng interchangeably: user class & user model - represet for entire collection of data that's sitting inside of our database
- collection: 
- schema: is a list of properties that are expected that model should have

## Section 19
How mocha works:
