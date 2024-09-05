import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../services/apiArticles";

export function useArticles() {
  const {
    isLoading,
    data: { data: articles, count } = {},
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(),
  });

  return { isLoading, error, articles, count };
}

export function useArticleSearch(
  searchTerm,
  articles,
  setFilteredArticles,
  setSearchTerm
) {
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [searchTerm, articles]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return { handleSearch };
}

const retrievedData = JSON.parse(localStorage.getItem("articleData"));
if (Array.isArray(retrievedData)) {
  retrievedData.reverse();
}
export function useRetrievedDataSearch(
  searchTerm,
  setRetrievedData,
  setSearchTerm
) {
  useEffect(() => {
   
    if (searchTerm === "") {
      setRetrievedData(retrievedData);
    } else {
      const filtered = retrievedData.filter((data) =>
        data.articleTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setRetrievedData(filtered);
    }
  }, [searchTerm]);

  const handleSearch2 = (e) => {
    setSearchTerm(e.target.value);
  };

  return { handleSearch2 };
}

export function findMinTimeArticles(articles) {
  let minTimeArticle1 = null;
  let minTimeArticle2 = null;
  let minTimeArticle3 = null;

  if (articles && articles.length > 0) {
    minTimeArticle1 = articles[0];
    for (let i = 1; i < articles.length; i++) {
      if (articles[i].time < minTimeArticle1.time) {
        minTimeArticle3 = minTimeArticle2;
        minTimeArticle2 = minTimeArticle1;
        minTimeArticle1 = articles[i];
      } else if (!minTimeArticle2 || articles[i].time < minTimeArticle2.time) {
        minTimeArticle3 = minTimeArticle2;
        minTimeArticle2 = articles[i];
      } else if (!minTimeArticle3 || articles[i].time < minTimeArticle3.time) {
        minTimeArticle3 = articles[i];
      }
    }
  }

  return { minTimeArticle1, minTimeArticle2, minTimeArticle3 };
}

export function findMinTimeBusinessArticles(articles) {
  const businessArticles = articles?.filter((article) => {
    return article?.category === "Business";
  });

  let minTimeArticle1 = null;
  let minTimeArticle2 = null;
  let minTimeArticle3 = null;

  if (businessArticles && businessArticles.length > 0) {
    minTimeArticle1 = businessArticles[0];
    for (let i = 1; i < businessArticles.length; i++) {
      if (businessArticles[i].time < minTimeArticle1.time) {
        minTimeArticle3 = minTimeArticle2;
        minTimeArticle2 = minTimeArticle1;
        minTimeArticle1 = businessArticles[i];
      } else if (
        !minTimeArticle2 ||
        businessArticles[i].time < minTimeArticle2.time
      ) {
        minTimeArticle3 = minTimeArticle2;
        minTimeArticle2 = businessArticles[i];
      } else if (
        !minTimeArticle3 ||
        businessArticles[i].time < minTimeArticle3.time
      ) {
        minTimeArticle3 = businessArticles[i];
      }
    }
  }

  return { minTimeArticle1, minTimeArticle2, minTimeArticle3 };
}

export function findMinTimeBusinessArticlesFromLocalStorage() {
  const retrievedData = JSON.parse(localStorage.getItem("articleData"));
  const articles = retrievedData.articles;

  const businessArticles = retrievedData?.filter((article) => {
    return article?.category === "Business";
  });

  let minTimeArticle4 = null;
  let minTimeArticle5 = null;
  let minTimeArticle6 = null;

  if (businessArticles && businessArticles.length > 0) {
    minTimeArticle4 = businessArticles[0];
    for (let i = 1; i < businessArticles.length; i++) {
      if (businessArticles[i].time < minTimeArticle4.time) {
        minTimeArticle6 = minTimeArticle5;
        minTimeArticle5 = minTimeArticle4;
        minTimeArticle4 = businessArticles[i];
      } else if (
        !minTimeArticle5 ||
        businessArticles[i].time < minTimeArticle5.time
      ) {
        minTimeArticle6 = minTimeArticle5;
        minTimeArticle5 = businessArticles[i];
      } else if (
        !minTimeArticle6 ||
        businessArticles[i].time < minTimeArticle6.time
      ) {
        minTimeArticle6 = businessArticles[i];
      }
    }
  }

  return { minTimeArticle4, minTimeArticle5, minTimeArticle6 };
}
