import axios from 'axios'

const BASE_URL = 'http://localhost:3002/'

export const signIn = async (params) => {
  try {
    const response = await axios.post(`${BASE_URL}signin`, params)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const signUp = async (params) => {
  try {
    const response = await axios.post(`${BASE_URL}signup`, params)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getVehicles = async (filters) => {
  try {
    const response = await axios.get(`${BASE_URL}vehicles`, { params: filters })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getUser = async (filters) => {
  try {
    const response = await axios.get(`${BASE_URL}users`, { params: filters })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
