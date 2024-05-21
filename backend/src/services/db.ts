import mongoose, { ConnectOptions } from 'mongoose'

export const mongooseConnection = (): void => {
  const connectionString = process.env.MONGO_URI as string
  const password = process.env.MONGO_URI_PASSWORD as string
  const DB = connectionString.replace('<password>', password)
  const options: ConnectOptions = {
    autoIndex: false,
  }
  mongoose
    .connect(DB, options)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error)
    })
}
