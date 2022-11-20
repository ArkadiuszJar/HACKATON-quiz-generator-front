import axios from 'axios'
import env from "react-dotenv"

const apiClient = (data) => axios.create({
	baseURL: env.API_BASE_URL,
	headers: {
		Authorization: `Bearer ${data?.bearerToken}`
	}
})

export default apiClient
