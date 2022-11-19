import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { LockIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"
import { EmailIcon } from "@chakra-ui/icons"
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { login } from '../adapters/login'

const Login = () => {
  const navigate = useNavigate()
  const [, setCookie] = useCookies(['bearerToken'])
  const [
    loginButtonLoading,
    setLoginButtonLoading,
  ] = useState(false)
  const[
    email,
    setEmail
  ] = useState('')
  const [
    password,
    setPassword
  ] = useState('')
  const handleLogin = async () => {
    try {
      setLoginButtonLoading(true)
      const response = await login(email, password)
      setCookie('bearerToken', response.data.bearerToken)
      navigate('/quiz/articles')
    } catch (error) {
      console.error(error)
    } finally {
      setLoginButtonLoading(false)
    }
  }
  return (
    <div className="bg-slate-100 w-screen h-screen flex items-center justify-center ">
      <div className="bg-white w-1/4 rounded-3xl flex flex-col items-center p-8">
        <p className="text-slate-700 font-lato font-bold text-3xl text-center">
          Zaloguj się
        </p>
        <div className="mx-auto flex flex-col items-center">
          <InputGroup mt={6}>
            <InputLeftElement
              h={12}
              pointerEvents="none"
              children={<EmailIcon color="black" />}
            />
            <Input
              size="lg"
              placeholder="Adres e-mail"
              _placeholder={{ opacity: 1, color: "black" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type={'email'}
            />
          </InputGroup>
          <InputGroup mt={4}>
            <InputLeftElement
              h={12}
              pointerEvents="none"
              children={<LockIcon color="black" />}
            />
            <Input
              size="lg"
              color="black"
              placeholder="Hasło"
              _placeholder={{ opacity: 1, color: "black" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={'password'}
            />
          </InputGroup>
          <Button
            mt={10}
            mx="auto"
            size="lg"
            colorScheme="blue"
            onClick={handleLogin}
            isLoading={loginButtonLoading}
          >
            Zaloguj
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
