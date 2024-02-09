import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  _id: string;
  @Prop({ required: true })
  FirstName: string;
  @Prop({ required: true })
  LastName: string;
  @Prop({ required: true, unique: true })
  Email: string;
  @Prop({ required: true, unique: true })
  Username: string;
  @Prop()
  Bio: string;
  @Prop({ required: true, unique: true })
  Password: string;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  followers: string[];
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  followees: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
