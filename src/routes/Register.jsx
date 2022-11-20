import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { Button, Link } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { register } from "../adapters/register";

const Register = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["bearerToken"]);
  const [registerButtonLoading, setRegisterButtonLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async () => {
    try {
      setRegisterButtonLoading(true);
      const response = await register(email, password);
      setCookie("bearerToken", response.data.bearerToken);
      navigate("/quiz/articles");
    } catch (error) {
      console.error(error);
    } finally {
      setRegisterButtonLoading(false);
    }
  };
  return (
    <div className="bg-slate-100 w-screen h-screen flex items-center justify-center ">
      <div className="bg-white w-1/4 rounded-3xl flex flex-col items-center p-8">
        <p className="text-slate-700 font-lato font-bold text-3xl text-center">
          Register
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
                  handleRegister();
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
                  handleRegister();
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
            onClick={handleRegister}
            isLoading={registerButtonLoading}
          >
            Register now
          </Button>
          <Link as={LinkRouter} to={"/login"}>
            Have account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
