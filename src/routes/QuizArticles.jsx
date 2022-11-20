import {
  FormLabel,
  Input,
  IconButton,
  Divider,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useCallback, useMemo, useState } from "react";
import apiClient from "../adapters/apiClient";
import cx from "classnames";
import { Link } from "react-router-dom";
import { Buffer } from 'buffer'

const QuizArticles = () => {
  const client = apiClient();
  const [articleFilename, setArticleFilename] = useState(null)
  const [articleBuffer, setArticleBuffer] = useState(null)
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchButtonLoading, setSearchButtonLoading] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const searchArticles = useCallback(async () => {
    try {
      setSearchButtonLoading(true)
      const response = await client.get("/articles/search", {
        params: {
          query: searchQuery,
          size: 15
        }
      })
      setArticles(
        response.data.articles.filter((e, index, array) => {
          return array.findIndex((article) => article.url === e.url) === index;
        })
      )
    } catch (error) {
      console.error(error);
    } finally {
      setSearchButtonLoading(false);
    }
  }, [client, searchQuery]);
  const questionsPageLink = useMemo(() => {
    const selectedArticlesQuery = selectedArticles.map((article) => article.url).join(",");
    return `/questions?articles=${selectedArticlesQuery}`;
  }, [selectedArticles]);
  return (
    <div className={"w-full h-full flex"}>
      <div className={"p-16 w-1/2 h-full flex flex-col items-start"}>
        <FormLabel width={"100%"}>
          <label className={"font-semibold text-xl"}>
            Search for articles topic
          </label>
          <div className={"flex items-center mt-2"}>
            <Input
              placeholder="Warsaw uprising"
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
              Preview
            </a>
          </div>
        ))}
      </div>
      <div className={"p-16 w-1/2 h-full flex flex-col"}>
        <div className={"w-full bg-white border-b py-4 flex items-center space-x-2"}>
          <Link
            to={questionsPageLink}
            as={"button"}
            state={{ articleBase64: articleBuffer && Buffer.from(articleBuffer).toString('base64') }}
          >
            <Button
              colorScheme={"teal"}
              disabled={selectedArticles.length === 0 && !articleBuffer}
            >
              Generate quiz
            </Button>
          </Link>
          <Button
            onClick={() => {
              setSelectedArticles([])
              setArticleBuffer(null)
              setArticleFilename(null)
            }}
            disabled={selectedArticles.length === 0 && !articleBuffer}
          >
            Clear
          </Button>
          <input
            id={'file-picker'}
            type={'file'}
            onChange={(e) => {
              const reader = new FileReader()
              const file = e.target.files[0]
              reader.readAsArrayBuffer(file)
              setArticleFilename(file.name)
              reader.onload = (e) => {
                setArticleBuffer(e.target.result)
              }
            }}
            value={articleFilename ? undefined : ''}
          />
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
