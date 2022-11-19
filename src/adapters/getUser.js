import apiClient from './apiClient'

export const getUser = (bearerToken) => {
	return apiClient({ bearerToken }).get('/auth')
}
