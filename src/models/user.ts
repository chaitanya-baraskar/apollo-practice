import {Schema, model, Document, ObjectId} from 'mongoose';

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

export interface IUser extends Document {
    _id: ObjectId
    firstname: string
    lastname: string
    username: string
    password: string
    role: UserRole
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, enum: UserRole, required: true},
    },
    {
        timestamps: true
    })

userSchema.index({role: 1})

export const User = model<IUser>('user', userSchema);
