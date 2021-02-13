import axios from 'axios'

const BASE_URL = 'http://localhost:3002/'

export const getVehicles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}vehicles`)

    return response.data
  } catch (error) {
    console.error(error)
  }
}
