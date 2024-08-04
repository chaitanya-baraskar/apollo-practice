import {Schema, model, Document, ObjectId} from 'mongoose';

export interface IBlog extends Document {
    title: string;
    content: string;
    user: ObjectId;
}

const blogSchema = new Schema<IBlog>({
    title: {type: String, required: true},
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
}, {
    timestamps: true
});

export const Blog = model<IBlog>('blog', blogSchema);
