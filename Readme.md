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
- mỗi model có 1 schema, list các attributes mà 1 record sẽ có trong collection
- schema: is a list of properties that are expected that model should have

```javascript
  //match the file with a model/class in database
  module.exports = User;

```

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

## Lecture 45
- không tạo post model mà chỉ tạo post schema bên trong user model do post luôn đi với user, và không có post nào đứng riêng lẻ
- chỉ tạo mongoose model khi cần trao đổi với collection trong db

## Lecture 46:
- represent for relationship 1 - n between 2 schemas:

```javascript
const UserSchema = new Schema ({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: "Name should be longer than 2 characters"
    },
    required: [true, "Name is required!"]
  },
  postCount: Number,
  posts: [PostSchema] //represent for 1 - n relationship 
});
```

## Lecture 48
- khi thay đổi 1 attribute của 1 record trong collection thì cần save record đó, không phải search attribute (theo ví dụ - dùng user.save())

## lecture 50 - Virtual Type
- attribute postCount hiện đang fix cứng và ko liên quan gì đến attribute posts của existing record
- muốn postCount là số number của posts[], dùng Virtual Type
- Khái niệm Virtual Type / Virtual Property / Virtual Field nghĩa là chỉ một field mà không thực sự được lưu trên MongoDB, nó có thể được lưu ở server, xem hình dưới
![Virtual Type - postCount](https://i.imgur.com/mQTaivq.png)

- Virtual Type được khai báo ở schema, theo dạng dùng getter và setter ở ES6 (dùng function(), không phải arrow function), mục đích là để bất kỳ khi nào gọi đến attribute kiểu virtual type này, js và mongoose sẽ ko tìm ở result trả về của mongoose nữa, mà sẽ chạy hàm getter, setter ở trên để lấy ra giá trị của attribute đó

## Lecture 59
Note:
  - khi lấy data từ db về, mongoose tự động biến chữ hoa thành chữ thường, do đó blogPosts -> blogposts

## lecture 60
code:
  - association_test.js:

  - todo
    + beforeEach():
      setup sample instance and association between instances
      then save these instances to database, use Promise.all (from ES6)
      Promise.all([joe.save(), blogPost.save(), comment.save()])
        .then(() => done());

    +it: saves relation between user and blogpost
  
  - it.only: mocha sẽ chỉ chạy test case này (trong trường hợp có vài trăm test case -> save time)

## lecture 61:
mongodb query: see image
![MongoDB Query](https://i.imgur.com/O0scTaC.png)

- in previous way, use .exec() instead of .then()
- để query trả về nhiều data theo mình mong muốn hơn, dùng modifier
>User.findOne({name: 'joe'}).modifier.then()

- ví dụ: User.findOne({name: 'joe'}).populate('blogPosts').then()
  + populate: load all blogPosts an user has (blogPosts là attribute dạng array của user)

- Note: mongoose will not let you automatically walk through an association and just recursively load up all the different associated records (tức nó chỉ cho load user và blog post của user, ko load được comment của blog post **của user đó**) nhằm tránh crash

- todo:
  + user blogpost title is same as title of blogPost instance

## lecture 62:
- todo:
  + it should save full relation between user, blogPosts, comments
    ```javascript
      .populate({
        path: 'blogPosts', //attribute của object user
        populate: { /*nghĩa là trong blogPosts, load comments của blogpost ra */
          path: 'comments',
          model: 'comment', //model name gắn với blogPosts
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
    ```
    assert name of each instance (4 assertions)

## lecture 63:
problem: when user somehow is deleted, what happen with his blog posts and comments?
solution: his blog posts and comments should be deleted also -> using mongoose middle ware to solve this case

Middleware:
![Middleware](https://i.imgur.com/a7vb5Us.png)

>middleware piece 1, 2, 3, 4 are functions that execute before and after some distinct events take place with mongoose

2 types of middleware:
- pre: trước event xảy ra thì làm gì
- post: sau event xảy ra thì làm gì

## lecture 64: Handling Cyclic Requires
- todo:
  + edit user.js to add pre middleware
  + sẽ cần remove BlogPost của user -> cần load module BlogPost ra
Như sau:
```users.js
  const BlogPost = require('../src/blogPosts');
```
Nhưng ở file blogPosts.js, nếu sau này cũng cần load module user, sẽ viết
```blogPosts.js
  const User = require('../src/users');
```
-> bị tình trạng Cyclics requires, application không biết load thằng nào trước khi User require BlogPost và BlogPost require User

- fix: chỉ load module BlogPost khi chạy function của pre middleware
  const BlogPost = mongoose.model('blogPost'); //blogPost la model name

## lecture 65: 
```javascript
BlogPost.remove({_id: {$in: this.blogPosts} })
  .then(() => next());
//Go through all blog post, lookup the id, if id is in id of this.blogPosts -> remove
```

## lecture 66: test pre middleware

## lecture 67: skip and limit
> skip and limit are two query modifiers for pagination
![Mongo - Pagination](https://i.imgur.com/D5wQSss.png)

## lecture 68 + 69
- note:
```
Promise.all([a.save(), jane.save(), b.save(), c.save()]) // các user được save cùng lúc nên không biết user nào vào trước, user nào vào sau
      .then(() => done());
```      
- todo:
  + beforeEach: add 4 users
  + User.find({}).skip(1).limit(2) -> get 2nd and 3rd users

## lecture 97
API request:
![API requet for Uber app](https://i.imgur.com/rtQshIi.png)

## lecture 98
front-end app: (react, iOS, angular) sends http request to communicate with nodejs/exrepss server

Request Method:
  - POST: request type (other types: DELETE, PUT, GET... defines the general purpose of request)
  - User-Agent: type of device sends request
  - Host: domain of request
  - content-type: ...

Request Body: contain any information to send from client to request to hanle in server

App Structure:
![App Structure](https://i.imgur.com/Wb2ONzc.png)

## lecture 100: 
Node vs Express:
![Node vs Express](https://i.imgur.com/z5SAhas.png)

Express simplifies effort while working with Node. Everything express does, Node can do but it takes a lot of more effort

## lecture 101:
App model:
![App Model](https://i.imgur.com/MXDkeXd.png)

## lecture 105:
Break express into 3 module: Route, Controller, Model for easy manngement