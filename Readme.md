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

## Lecture 25
- isNew property: isNew là true nếu chưa save vào mongodb, sau khi save rồi thì sẽ là false
- hàm assert luôn nhận giá trị true để mocha có thể run tiếp câu lệnh dưới

## Lecture 30
- nodemon command to run with mocha
```
 "scripts": {
    "test": "nodemon --exec \"mocha -R min\""
  },
```

## Lecture 36
- có thể cân nhắc tách phần set (update) attribute ra riêng 1 hàm, xong rồi mới gọi hàm save(), tránh đụng vào database nhiều lần như trong file code

## Lecture 39
> where to start learning a lot more about performance inside of MongoDB

- Các lecture trước: lấy data từ mongodb về server, update data rồi gửi lại lên cho mongodb
- từ lecture 39: từ server gửi lệnh thẳng vào mongodb để update collections ở đó, không lấy về server nữa

![Send command direct to MongoDB from server](https://i.imgur.com/izBis99.png)

## Lecture 41
Working with Mongo, via Mongoose
![Working with Mongo via Mongoose](https://i.imgur.com/fDnmpuO.png)

## Lecture 42
- validateSync(): return an object
- nếu cần làm việc với db, webservice để validate thì dùng callback:

```javascript
validate((validationResult) => {...
});
```

## Lecture 43

```javascript
//1 attribute của object property trong model class, dùng cho validate những thứ phức tạp
validate: {
      validator: (name) => name.length > 2,
      message: "Name should be longer than 2!"
    }
```