import axios from 'axios'

const apiClient = ({ bearerToken }) => axios.create({
	baseURL: 'http://localhost:3000',
	headers: {
		Authorization: `Bearer ${bearerToken}`
	}
})
