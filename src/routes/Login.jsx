import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { Button, Link } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { login } from "../adapters/login";

const Login = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["bearerToken"]);
  const [loginButtonLoading, setLoginButtonLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      setLoginButtonLoading(true);
      const response = await login(email, password);
      setCookie("bearerToken", response.data.bearerToken);
      navigate("/quiz/articles");
    } catch (error) {
      console.error(error);
    } finally {
      setLoginButtonLoading(false);
    }
  };
  return (
    <div className="bg-slate-100 w-screen h-screen flex items-center justify-center ">
      <div className="bg-white w-1/4 rounded-3xl flex flex-col items-center p-8">
        <p className="text-slate-700 font-lato font-bold text-3xl text-center">
          Login
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
              placeholder="E-mail address"
              _placeholder={{ opacity: 1, color: "black" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              type={"email"}
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
              placeholder="Password"
              _placeholder={{ opacity: 1, color: "black" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              type={"password"}
            />
          </InputGroup>
          <Button
            mt={10}
            mb={2}
            mx="auto"
            size="lg"
            colorScheme="blue"
            onClick={handleLogin}
            isLoading={loginButtonLoading}
          >
            Login
          </Button>
          <Link as={LinkRouter} to={"/register"}>
            Don't have an account? Register now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
