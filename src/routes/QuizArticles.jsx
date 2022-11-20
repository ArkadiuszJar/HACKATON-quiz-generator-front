import {
  FormLabel,
  Input,
  IconButton,
  Divider,
  Button,
} from "@chakra-ui/react";
import { SearchIcon, LinkIcon } from "@chakra-ui/icons";
import { useCallback, useMemo, useState } from "react";
import apiClient from "../adapters/apiClient";
import cx from "classnames";
import { Link, redirect } from "react-router-dom";

const QuizArticles = () => {
  const client = apiClient();
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchButtonLoading, setSearchButtonLoading] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const searchArticles = useCallback(async () => {
    try {
      setSearchButtonLoading(true);
      const response = await client.get("/articles/search", {
        params: {
          query: searchQuery,
          size: 15,
        },
      });
      setArticles(
        response.data.articles.filter((e, index, array) => {
          return array.findIndex((article) => article.url === e.url) === index;
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSearchButtonLoading(false);
    }
  }, [client, searchQuery]);
  const questionsPageLink = useMemo(() => {
    return `/questions?articles=${selectedArticles
      .map((article) => article.url)
      .join(",")}`;
  }, [selectedArticles]);
  return (
    <div className={"w-full h-full flex"}>
      <div className={"p-16 w-1/2 h-full flex flex-col items-start"}>
        <FormLabel width={"100%"}>
          <label className={"font-semibold text-xl"}>
            Wyszukaj temat artykułów
          </label>
          <div className={"flex items-center mt-2"}>
            <Input
              placeholder="Powstanie warszawskie"
              size={"lg"}
              variant={"filled"}
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  searchArticles();
                }
              }}
              disabled={searchButtonLoading}
            />
            <IconButton
              marginLeft={3}
              aria-label="Search database"
              icon={<SearchIcon />}
              size={"lg"}
              onClick={searchArticles}
              isLoading={searchButtonLoading}
            />
          </div>
        </FormLabel>
        <Divider marginY={4} />
        {articles.slice(0, 10).map((article, index) => (
          <div className="flex my-4 gap-4 w-full">
            <button
              className={cx(
                "w-full text-left hover:opacity-75 active:opacity-50",
                "py-3 px-4 rounded-lg duration-100 text-white",
                selectedArticles.find((e) => e.url === article.url)
                  ? "bg-teal-800"
                  : "bg-teal-600"
              )}
              key={article.title + index}
              onClick={() => {
                if (selectedArticles.find((e) => e.url === article.url)) {
                  setSelectedArticles(
                    selectedArticles.filter((e) => e.url !== article.url)
                  );
                } else {
                  setSelectedArticles([...selectedArticles, article]);
                }
              }}
            >
              {article.title}
            </button>
            <a
              target="_blank"
              className=" bg-blue-500 text-white mx-auto py-3 px-4 rounded-lg :hover:opacity-80 text-center"
              href={article.url}
            >
              Podgląd
            </a>
          </div>
        ))}
      </div>
      <div className={"p-16 w-1/2 h-full flex flex-col"}>
        <div className={"w-full bg-white border-b py-4 flex space-x-2"}>
          <Link to={questionsPageLink} as={"button"}>
            <Button
              colorScheme={"teal"}
              disabled={selectedArticles.length === 0}
            >
              Generuj quiz
            </Button>
          </Link>
          <Button
            onClick={() => setSelectedArticles([])}
            disabled={selectedArticles.length === 0}
          >
            Wyczyść
          </Button>
        </div>
        <div className={"grid grid-cols-4 grid-rows-4 gap-6 mt-4"}>
          {selectedArticles.map((article, index) => (
            <button
              key={article.title + index + "file"}
              className={cx(
                "flex flex-col items-center justify-between bg-neutral-100 p-4 rounded-lg",
                "hover:opacity-75 active:opacity-50 duration-100"
              )}
              onClick={() => {
                setSelectedArticles(
                  selectedArticles.filter((e) => e.url !== article.url)
                );
              }}
            >
              <img
                alt={article.title.slice(0, 15) + "..."}
                src={require("../assets/images/file-image.png")}
              />
              <span>{article.title.slice(0, 15) + "..."}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizArticles;
