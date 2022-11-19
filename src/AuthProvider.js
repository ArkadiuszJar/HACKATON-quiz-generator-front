import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { getUser } from './adapters/getUser'
import { Button } from '@chakra-ui/react'

const AuthProvider = ({ children }) => {
	const [isBearerTokenLoaded, setIsBearerTokenLoaded] = useState(false)
	const [cookies, _, removeCookie] = useCookies(['bearerToken'])
	const navigate = useNavigate()
	useEffect(() => {
		if (isBearerTokenLoaded) return
		const bearerToken = cookies.bearerToken
		getUser(bearerToken)
			.then(() => {
				navigate('/quiz/articles')
			}).catch(() => {
				removeCookie('bearerToken', { path: '/' })
				navigate('/login')
			}).finally(() => {
				setIsBearerTokenLoaded(true)
			})
	}, [cookies, isBearerTokenLoaded, navigate, removeCookie])

	return <>
		{ children }
		{cookies.bearerToken && (
			<div
				className={'fixed top-4 right-4'}
			>
				<Button
					onClick={() => {
						removeCookie('bearerToken', { path: '/' })
						navigate('/login')
					}}
				>
					Wyloguj się
				</Button>
			</div>
		)}
	</>
}

export default AuthProvider
