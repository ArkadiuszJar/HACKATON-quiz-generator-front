import {
  EditIcon,
  CheckIcon,
  CloseIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  WarningIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import { Button, ButtonGroup } from "@chakra-ui/react";

const Questions = () => {
  const qNum = 1;
  const qTotal = 40;
  const question = "W którym roku wydarzyło się Powstanie Warszawskie?";
  const question2 =
    " Która z podanych osób nie była żoną Henryka Sienkiewicza?";
  const answer = "1944";
  const wrongAnswer = "1945";
  const wrongAnswer2 = "1943";

  return (
    <div className="flex">
      <div className=" w-2/4 h-screen bg-white flex flex-col justify-center">
        <div className=" w-4/6 mx-auto">
          <div className="my-4">
            <p>
              Pytanie {qNum} z {qTotal}
            </p>
            <p className=" text-2xl font-medium">
              {question}{" "}
              <span className=" text-xs">
                <EditIcon />
                Edytuj
              </span>
            </p>
          </div>
          <div>
            <p>Poprawna odpowiedź</p>
            <div className="flex items-center gap-4 bg-slate-200 border-b-4 border-b-green-600 border-black box-border p-2 rounded-md">
              <CheckIcon w={6} color="green" />{" "}
              <p className="text-2xl font-light">
                {answer}
                <span className="text-xs ml-3">
                  <EditIcon />
                  Edytuj
                </span>
              </p>
            </div>
          </div>

          <div className="my-4">
            <p>Niepoprawne odpowiedzi</p>
            <div className="flex items-center gap-4 bg-slate-200 border-b-4 border-b-red-600  box-border p-3 rounded-md">
              <CloseIcon w={4} color="red" />{" "}
              <p className="text-2xl font-light">
                {wrongAnswer}
                <span className="text-xs ml-3">
                  <EditIcon />
                  Edytuj
                </span>
              </p>
            </div>
          </div>
          <div className="my-4">
            <div className="flex items-center gap-4 bg-slate-200 border-b-4 border-b-red-600  box-border p-3 rounded-md">
              <CloseIcon w={4} color="red" />{" "}
              <p className="text-2xl font-light">
                {wrongAnswer2}
                <span className="text-xs ml-3">
                  <EditIcon />
                  Edytuj
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-8 mb-4">
            {" "}
            <Button>
              <ArrowBackIcon />
            </Button>
            <Button colorScheme="green" color="white" flexGrow={1}>
              Zapisz do quizu
            </Button>
            <Button>
              <ArrowForwardIcon />
            </Button>
          </div>
          <div className=" flex justify-center gap-1">
            <WarningIcon />
            <p className="text-xs">zgłoś pytanie jako niepoprawne</p>
          </div>
        </div>
      </div>

      <div className=" w-2/4 h-screen bg-slate-100 flex flex-col justify-center">
        <div className=" w-4/6 h-4/6 my-auto mx-auto flex flex-col gap-4">
          <p className=" text-2xl font-medium">Zapisane pytania</p>

          <div className=" bg-slate-200 rounded-xl">
            <p className=" bg-white px-4 py-4 rounded-xl text-xl font-semibold">
              {question}
            </p>

            <div className="flex items-center gap-2 px-4 py-2">
              <div className=" w-2 h-4 bg-green-700"></div>

              <p className=" text-base font-medium">
                Poprawna odpowiedź: {answer}
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className=" w-2 h-4 bg-red-700"></div>

              <p className=" text-base font-medium">
                Niepoprawne odpowiedzi: {wrongAnswer}, {wrongAnswer2}
              </p>
            </div>
          </div>
          <div className=" bg-slate-200 rounded-xl">
            <p className=" bg-white px-4 py-4 rounded-xl text-xl font-semibold">
              {question2}
            </p>

            <div className="flex items-center gap-2 px-4 py-2">
              <div className=" w-2 h-4 bg-green-700"></div>

              <p className=" text-base font-medium">
                Poprawna odpowiedź: {answer}
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className=" w-2 h-4 bg-red-700"></div>

              <p className=" text-base font-medium">
                Niepoprawne odpowiedzi: {wrongAnswer}, {wrongAnswer2}
              </p>
            </div>
          </div>
        </div>
        <Button colorScheme="green" color="white" w={96} mb={20} mx="auto">
          Eksportuj quiz
        </Button>
      </div>
    </div>
  );
};

export default Questions;
