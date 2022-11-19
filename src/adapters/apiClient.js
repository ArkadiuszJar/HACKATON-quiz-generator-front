import axios from 'axios'

const apiClient = (data) => axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		Authorization: `Bearer ${data?.bearerToken}`
	}
})

export default apiClient
