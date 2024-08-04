# apollo-practice

### Pre-requisites
- Node version > 21.0
- Docker


### To start docker
Run below command to start mongodb
```shell
docker compose up
npm install
npm start 
```

### TODO
Due to time crunch I couldn't address following topics
- RBAC at query level, e.g. I am not restricting access for User node
- Username, password for mongodb. Something is wrong at infra level.
- Implementing decorator or annotation for RBAC. (My current implementation is really basic.)
- Validating user id which is received in the token. (There's a case it might got deleted)
- 

Use following graphql queries for testing
```
mutation login ($userDetails: AddUserInput!, $loginDetails: LoginInput!){
  # registerUser(userDetails: $userDetails) {
  #   firstname
  #   _id
  # }
  login(loginDetails: $loginDetails) {
    token
    user {
      firstname
      _id
    }
  }
}

mutation deleteUser($deleteUserId: ID!){
  deleteUser(id: $deleteUserId)
}

mutation blog($blogDetails: AddBlogInput!, $deleteBlogId: ID!, $updateBlogBlogDetails2: UpdateBlogInput!){
  # createBlog(blogDetails: $blogDetails) {
  #   _id
  #   content
  # }
  updateBlog(blogDetails: $updateBlogBlogDetails2) {
    _id
  }
  # deleteBlog(id: $deleteBlogId)
}

query getAllBlogs($blogId: ID!){
  # blogs {
  #   _id
  #   content
  #   title
  #   createdAt
  #   user {
  #     firstname
  #   }
  # }
  blog(id: $blogId) {
    _id
    createdAt
    title
  }
}

query getAllUsers($userId: ID!, $username: String!){
  # user(id: $userId) {
  #   firstname
  #   lastname
  #   username
  # }

  # userByUsername(username: $username) {
  #   firstname
  #   lastname
  #   username
  # }
  users {
    _id
    firstname
    lastname
    username
    blogs {
      _id
      title
    }
  }
}
```

Use following environment variables
```json
{
  "userId": "66ae38f399fc65b71eba2e6e",
  "username": "john.doe",
  "password": "john.doe1",
  "userDetails": {
    "firstname": "John1",
    "lastname": "Doe1",
    "role": "user",
    "username": "test",
    "password": "password"
  },
  "loginDetails": {
    "username": "test",
    "password": "password"
  },
  "blogDetails": {
    "content": "123",
    "title": "This is test blog 1",
    "username": "john.doe2"
  },
  "deleteBlogId": "66af9957323683bd512cdd6e",
  "blogId": "66af7985efa39b99ce1930ec",
  "updateBlogBlogDetails2": {
    "id": "66af9957323683bd512cdd6e",
    "newContent": "This is updated content.",
    "newTitle": "Update 1"
  },
  "deleteUserId": "66af98e3323683bd512cdd67"
}
```

