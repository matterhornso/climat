// import { User } from '../../domain/index'

// const _serializeSingleUser = (user: User) => {
//   return {
//     id: user.id,
//     email: user.email,
//     fullName: user.fullName
//   }
// }

// export class UserSerializer {
//   serialize(data: any) {
//     if (!data) {
//       throw new Error('expect data to be not undefined nor null')
//     }
//     if (Array.isArray(data)) {
//       return data.map(_serializeSingleUser)
//     }
//     return _serializeSingleUser(data)
//   }
// }