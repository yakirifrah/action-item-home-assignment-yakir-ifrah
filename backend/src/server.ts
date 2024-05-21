import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, `./env/${process.env.NODE_ENV}.env`) })

import app from './app'
import { mongooseConnection } from './services/db'

const main = async () => {
  try {
    mongooseConnection()
    app.listen(5000, () => console.log('Listening on port 5000'))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
main()
