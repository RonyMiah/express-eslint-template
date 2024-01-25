import { TUser } from './user.interface'
import { User } from './user.model'


const createUserIntoDB = async (payload: TUser) => {
  await User.create(payload)

 


  return {}
}

export const userServices = {
  createUserIntoDB,
}
