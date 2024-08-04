import logger from "../../utils/logger";
import {User} from "../../models/user";
import {Blog} from "../../models/blog";
import {Types} from "mongoose";

export const blogResolvers = {
    Query: {
        blogs: async () => {
            logger.debug('Fetching all blogs');
            return Blog.find().populate('user');
        },
        blog: async (_: any, {id}: { id: string }) => {
            logger.debug(`Fetching blog with id: ${id}`);
            return Blog.findOne({"_id": new Types.ObjectId(id)}).populate('user');
        },
    },
    Mutation: {
        addBlog: async (_: any, {blogDetails}: { blogDetails: any }) => {
            const {title, content, username} = blogDetails;

            let result = await User.findOne({"username": username})

            if (!result) {
                logger.error(`Unable to find user with username ${username}`)
                throw new Error(`User with username ${username} not found.`)
            }

            const newBlog = new Blog({
                title,
                content,
                user: result._id,
            });

            logger.info(`Creating new blog with title ${title}`);

            try {
                const savedBlog = await newBlog.save();
                logger.info(`Saved blog with ID ${savedBlog._id}`);

                // Update the user with the new blog
                await User.findOneAndUpdate({username: username}, {
                    $push: {blogs: savedBlog.title}
                });

                return savedBlog;
            } catch (error) {
                logger.error(`Failed to save blog with error ${error}`);
                throw new Error(`Failed to save blog: ${error}`);
            }
        },

        updateBlog: async (_: any, {blogDetails}: { blogDetails: any }) => {
            const {id, newTitle, newContent} = blogDetails;

            logger.info(`Updating blog with ID: ${id}`);

            try {
                const blog = await Blog.findOne({"_id": new Types.ObjectId(id)});
                if (!blog) {
                    throw new Error(`Blog with ID ${id} not found`);
                }

                if (newTitle) {
                    blog.title = newTitle;
                }
                if (newContent) {
                    blog.content = newContent;
                }

                const updatedBlog = await blog.save();
                logger.info(`Updated blog with title ${updatedBlog.title}`);
                return updatedBlog;
            } catch (error) {
                logger.error(`Failed to update blog with error ${error}`);
                throw new Error(`Failed to update blog: ${error}`);
            }
        },

        deleteBlog: async (_: any, {id}: { id: any }) => {
            logger.info(`Attempting to delete blog ${id}`)
            const result = await Blog.findOneAndDelete({"_id": new Types.ObjectId(id)})
            if (!result) {
                logger.error(`Blog with ID ${id} not found`)
                throw new Error(`Failed to delete blog with ID ${id}.`)
            }
            return true
        }
    },
};