import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { getUser } from './adapters/getUser'

const AuthProvider = ({ children }) => {
	const [cookies] = useCookies(['bearerToken'])
	const navigate = useNavigate()
	useEffect(() => {
		const bearerToken = cookies.bearerToken
		if (bearerToken) {
			getUser(bearerToken)
				.then(() => {
					navigate('/quiz/articles')
				}).catch(() => {
					navigate('/login')
				})
		}
	}, [cookies, navigate])

	return <>
		{ children }
	</>
}

export default AuthProvider
