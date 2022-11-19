import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Link as LinkRouter, useNavigate } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-400 gap-4">
      <h1 className=" text-4xl text-center text-white font-semibold ">
        ERROR 404
        <br /> <span className="text-2xl font-medium"> - Page Not Found -</span>
      </h1>
      <Button colorScheme="blue">
        <Link as={LinkRouter} to={"/"}>
          Take me back
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
