import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

const Login = () => {
  return (
    <div className="bg-slate-100 w-screen h-screen flex items-center justify-center ">
      <div className="bg-white w-2/5 rounded-3xl flex flex-col items-center p-8">
        <p className="text-slate-700 font-lato font-bold text-3xl text-center">
          Zaloguj się
        </p>
        <div className=" w-3/5 mx-auto flex flex-col items-center">
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
            />
          </InputGroup>
          <Button mt={10} mx="auto" size="lg" colorScheme="blue">
            Zaloguj
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
