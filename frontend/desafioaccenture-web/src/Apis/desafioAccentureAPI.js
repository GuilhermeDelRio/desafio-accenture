import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:5215/api/v1/'
})