import type { Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import { UserModel } from '../models/userModel'

async function userExists(userId: string): Promise<boolean> {
  const users = (await UserModel.findOne({ userId })) || null
  return !!users
}

const saveUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.query.id as string
  if (await userExists(userId)) {
    return res.status(201).json({
      message: 'User already exists',
    })
  }
  const userData = req.body
  userData['userId'] = userId
  const data = await UserModel.create(userData)
  return res.status(200).json({
    status: 'success',
    data,
  })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.query.id as string
  const newUserData = req.body

  const data = await UserModel.updateOne({ userId }, newUserData)
  return res.status(201).json({
    status: 'success',
    data,
  })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.query.id as string

  await UserModel.deleteOne({ userId })
  return res.status(200).json({
    status: 'success',
  })
})

const getAllHistoryUsers = catchAsync(async (req: Request, res: Response) => {
  const data = await UserModel.find({}).lean()
  return res.status(200).json({
    status: 'success',
    data,
  })
})

export { deleteUser, updateUser, saveUser, getAllHistoryUsers }
