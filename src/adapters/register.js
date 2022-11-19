import apiClient from './apiClient'

export const register = (email, password) => {
	return apiClient().post('/auth/register', {
		email,
		password
	})
}
