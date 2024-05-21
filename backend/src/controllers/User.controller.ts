import type {  Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { apiConnectProxy } from '../services/HttpClient.service'
import { methodRequestType } from '../types/enums'



const getRandomUsers = catchAsync(async (req: Request, res: Response) => {
  const query = req.query.results || 10
  const path = process.env['RANDOM_USERS_API'] as string
  const params = {
    results: query,
  }
  const data = await apiConnectProxy(path, methodRequestType.GET, null, params)
  return res.status(200).json(data)
})


export { getRandomUsers}
