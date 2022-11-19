import apiClient from './apiClient'

export const login = (email, password) => {
	return apiClient().post('/auth/login', {
		email,
		password
	})
}
