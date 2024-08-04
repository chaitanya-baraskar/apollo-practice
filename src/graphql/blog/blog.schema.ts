import { gql } from 'apollo-server-express';

export const blogTypeDefs = gql`
  """
  Blog schema.
  """
  type Blog {
    """
    ID of the blog.
    """
    _id: ID!
    
    """
    Title of the blog.
    """
    title: String!
    
    """
    Blog content.
    """
    content: String!
    
    """
    Blog created by user.
    """
    user: User!
    
    """
    Blog created at timestamp.
    """
    createdAt: String
    
    """
    Blog updated at timestamp.
    """
    updatedAt: String
  }
   
  """
  Add blog schema.
  """
  input AddBlogInput {
    """
    Blog title input.
    """
    title: String!
    
    """
    Blog content input.
    """
    content: String!
    
    """
    Blog created by username.
    """
    username: String!
  }
  
  input UpdateBlogInput {
    """
    Blog ID who's content should be updated.
    """
    id: ID!
    
    """
    New blog title.
    """
    newTitle: String
    
    """
    New blog content.
    """
    newContent: String
  }
  
  type Query {
    blogs: [Blog!]!
    blog(id: ID!): Blog
  }

  type Mutation {
    """
    Add blog mutation.
    """
    createBlog(blogDetails: AddBlogInput!): Blog
    
    """
    Update blog mutation.
    """
    updateBlog(blogDetails: UpdateBlogInput!): Blog
    
    """
    Delete blog mutation. Provide ID for deleting blog.
    """
    deleteBlog(id: ID!): Boolean
  }
`

