import {
  EditIcon,
  CheckIcon,
  CloseIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { Button, Select } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import apiClient from "../adapters/apiClient";
import { useSearchParams, useLocation } from "react-router-dom";
import classNames from "classnames";

const Questions = () => {
  const client = apiClient();
  const { state } = useLocation()
  let [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [questionsAnswers, setQuestionsAnswers] = useState([]);
  const [savedQuestionsAnswers, setSavedQuestionsAnswers] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [fileFormat, setFileFormat] = useState('pdf')
  const [fileVersion, setFileVersion] = useState('true')
  const selectedQuestionAnswer = useMemo(() => {
    if (questionsAnswers.length === 0) {
      return null;
    }
    if (selectedQuestionIndex > questionsAnswers.length - 1) {
      setSelectedQuestionIndex(questionsAnswers.length - 1);
      return questionsAnswers[questionsAnswers.length - 1];
    }
    return questionsAnswers[selectedQuestionIndex];
  }, [selectedQuestionIndex, questionsAnswers]);
  const totalQuestionsNumber = useMemo(() => {
    return questionsAnswers.length;
  }, [questionsAnswers]);
  const selectedQuestionInvalidAnswers = useMemo(() => {
    if (selectedQuestionAnswer === null) return [];
    return selectedQuestionAnswer.answers.filter((answer) => {
      return answer.isCorrect === false;
    });
  }, [selectedQuestionIndex, questionsAnswers]);
  const fetchQuestionsAnswers = useCallback(async () => {
    const articles = searchParams.get("articles");
    try {
      setIsLoading(true);
      const response = await client.post("/quiz/generate", {
        urls: articles.split(";"),
        articleBase64: state.articleBase64,
      });
      setQuestionsAnswers(response.data)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);
  const saveQuestionAnswer = useCallback(
    (questionAnswer) => {
      setSavedQuestionsAnswers((current) => [...current, questionAnswer]);
    },
    [setSavedQuestionsAnswers]
  );

  const handleRemoveQuestionAnswer = useCallback(
    (questionAnswerIndex) => {
      // Remove question from questions
      setQuestionsAnswers((current) => [
        // Remove current question
        ...current.filter((question, index) => {
          return index !== selectedQuestionIndex;
        }),
      ]);
    },
    [questionsAnswers]
  );

  const exportQuiz = useCallback(async () => {
    try {
      const response = await client.post(
        `/export-document`,
        {
          questions: savedQuestionsAnswers.map((questionAnswer) => {
            return {
              question: questionAnswer.question,
              answer: questionAnswer.answers[0].text
            };
          }),
        },
        {
          responseType: "blob",
          params: {
            fileFormat: fileFormat,
            withAnswers: fileVersion
          },
        }
      );
      console.log(URL.createObjectURL(response.data));
      window.open(URL.createObjectURL(response.data));
    } catch (error) {
      console.error(error);
    }
  }, [
    savedQuestionsAnswers,
    fileFormat,
    fileVersion
  ])

  useEffect(() => {
    fetchQuestionsAnswers();
  }, [searchParams]);

  return (
    <div className="flex">
      <div className=" w-2/4 h-screen bg-white flex flex-col justify-center">
        {questionsAnswers.length > 0 ? (
          <div className="w-4/6 mx-auto">
            <div className="my-4 relative">
              <p className={"text-gray-600"}>
                Question {selectedQuestionIndex + 1} of {totalQuestionsNumber}
              </p>
              <input
                className={
                  "w-full border border-gray-300 rounded p-2 my-2 text-xl font-semibold"
                }
                type="text"
                value={selectedQuestionAnswer.question}
                onChange={(event) => {
                  setQuestionsAnswers((current) => {
                    return current.map((question, index) => {
                      if (index === selectedQuestionIndex) {
                        return {
                          ...question,
                          question: event.target.value,
                        };
                      }
                      return question;
                    });
                  });
                }}
              />
            </div>
            {selectedQuestionAnswer.answers.map((answer, index) => {
              return (
                <div key={index} className={"mt-4"}>
                  <p className={"text-gray-600"}>
                    {answer.isCorrect ? "Right answer" : "Wrong answer"}
                  </p>
                  <div
                    className={classNames(
                      "flex items-center gap-4 bg-slate-100 border-b-4 border-black box-border px-2 py-2 rounded-md",
                      answer.isCorrect
                        ? "border-b-green-600"
                        : "border-b-red-600"
                    )}
                  >
                    {answer.isCorrect ? (
                      <CheckIcon w={3.5} color="green" className={"ml-1"} />
                    ) : (
                      <CloseIcon w={3.5} color="red" className={"ml-1"} />
                    )}
                    <p className="relative w-full text-xl flex items-center">
                      <input
                        type={"text"}
                        value={answer.text}
                        className={
                          "bg-transparent border-none outline-none grow flex flex-1 pr-8"
                        }
                        onInput={(event) => {
                          const value = event.target.value;
                          setQuestionsAnswers((current) => {
                            const newQuestionsAnswers = [...current];
                            newQuestionsAnswers[selectedQuestionIndex].answers[
                              index
                            ].text = value;
                            return newQuestionsAnswers;
                          });
                        }}
                      />
                      <div
                        className={
                          "absolute right-0 mr-2 flex items-center justify-center pointer-events-none"
                        }
                      >
                        <EditIcon w={4} color={"#6e7891"} />
                      </div>
                    </p>
                  </div>
                </div>
              );
            })}
            <Button
              className={"mt-4"}
              onClick={() => {
                setQuestionsAnswers((current) => {
                  const newQuestionsAnswers = [...current];
                  newQuestionsAnswers[selectedQuestionIndex].answers.push({
                    text: "",
                    isCorrect: false,
                  });
                  return newQuestionsAnswers;
                });
              }}
            >
              Add answer
            </Button>
            <div className="flex gap-4 mt-8 mb-4">
              {" "}
              <Button
                onClick={() => {
                  setSelectedQuestionIndex(selectedQuestionIndex - 1);
                }}
                disabled={selectedQuestionIndex === 0}
              >
                <ArrowBackIcon />
              </Button>
              <Button
                colorScheme="green"
                color="white"
                flexGrow={1}
                onClick={() => {
                  saveQuestionAnswer(questionsAnswers[selectedQuestionIndex]);
                  handleRemoveQuestionAnswer(selectedQuestionIndex);
                }}
              >
                Save question
              </Button>
              <Button
                onClick={() => {
                  setSelectedQuestionIndex(selectedQuestionIndex + 1);
                }}
                disabled={selectedQuestionIndex === totalQuestionsNumber - 1}
              >
                <ArrowForwardIcon />
              </Button>
            </div>
            <div className="flex justify-center gap-1">
              <Button
                variant={"link"}
                onClick={() =>
                  handleRemoveQuestionAnswer(selectedQuestionIndex)
                }
                className={"hover:underline cursor-pointer"}
              >
                <CloseIcon w={2.5} />
                <p className="ml-1 text-xs">Decline</p>
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-4/6 mx-auto">
            <div className="my-4 text-center">
              { isLoading ? (
                <p>
                  Loading...<br /> this may take up to two minutes...
                </p>
              ):(
                <p>
                  The database of the questions and answers has been exhausted.
                  <br /> You can export the quiz!
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className=" w-2/4 h-screen bg-slate-100 flex flex-col justify-center">
        <div className=" w-4/6 h-4/6 my-auto mx-auto flex flex-col gap-4 overflow-y-auto">
          <p className=" text-2xl font-medium">Saved questions</p>
          {savedQuestionsAnswers.map((questionAnswer, index) => {
            return (
              <div className=" bg-slate-200 rounded-lg">
                <p className=" bg-white px-4 py-4 rounded-t-lg text-xl font-semibold">
                  {questionAnswer.question}
                </p>

                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="w-1 h-4 bg-green-600 rounded-md"></div>

                  <p className="text-base font-medium">
                    Right answer: {questionAnswer.answers[0].text}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 pt-2 pb-3">
                  <div className="w-1 h-4 bg-red-600 rounded-md"></div>

                  <p className="text-base font-medium">
                    Wrong answers:{" "}
                    {questionAnswer.answers
                      .filter((answer) => answer.isCorrect === false)
                      .map((answer) => answer.text)
                      .join(", ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className=" w-3/4 mx-auto mb-8 flex flex-col gap-2">
          <Select
            id="format"
            placeholder="File format"
            value={fileFormat}
            onChange={(event) => {
              setFileFormat(event.target.value)
            }}
          >
            <option value="docx">DOCX</option>
            <option value="pdf">PDF</option>
          </Select>
          <Select
            id="answerKey"
            value={fileVersion}
            onChange={(event) => {
              setFileVersion(event.target.value)
            }}
            placeholder="Version"
          >
            <option value="true">With an answer key</option>
            <option value="false">Without an answer key</option>
          </Select>
          <Button
            colorScheme="green"
            color="white"
            w="full"
            onClick={exportQuiz}
            disabled={savedQuestionsAnswers.length === 0}
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
