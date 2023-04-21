import network from './network.services'

const getUsers = async () => {
  return await network.get('/api/users')
}

const getUsersById = async (id) => {
  return await network.get(`/api/user/${id}`)
}

const postUser = async (user) => {
  return await network.post('/api/user', user)
}

const putUser = async (user, id) => {
  return await network.put(`/api/users/${id}`, user)
}

const deleteUser = async (id) => {
  return await network.delete(`/api/users/${id}`)
}

export default {
  getUsers,
  getUsersById,
  postUser,
  putUser,
  deleteUser,
}
