import { Document, Model, model, Schema } from 'mongoose'
import { CollectionsNames } from '../config/consts'

interface PictureObject {
  large: string
  thumbnail: string
}

interface DobObject {
  date: string
  age: number
}

interface StreetObject {
  number: number
  name: string
}

interface AddressObject {
  street: StreetObject
  city: string
  state: string
  country: string
}

export interface User extends InputUserData, Document {}

export interface InputUserData {
  name: string
  gender: string
  email: string
  phone: string
  picture: PictureObject
  userId: string
  dob: DobObject
  address: AddressObject
}

const PictureSchema: Schema = new Schema<PictureObject>({
  large: { type: String, required: true },
  thumbnail: { type: String, required: true },
})

const DobSchema: Schema = new Schema<DobObject>({
  date: { type: String, required: true },
  age: { type: Number, required: true },
})

const StreetSchema: Schema = new Schema<StreetObject>({
  name: { type: String, required: true },
  number: { type: Number, required: true },
})

const AddressSchema: Schema = new Schema<AddressObject>({
  street: { type: StreetSchema, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
})

const UserSchema: Schema = new Schema<User>(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    picture: { type: PictureSchema, required: true },
    dob: { type: DobSchema, required: true },
    address: { type: AddressSchema, required: true },
  },
  { collection: CollectionsNames.Users }
)

export const UserModel: Model<User> = model<User>(CollectionsNames.Users, UserSchema)
