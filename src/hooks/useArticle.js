import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getArticle } from "../services/apiArticles";

export function useArticle() {
  const { BusinessId } = useParams();

  const {
    isLoading,
    data: article,
    error,
  } = useQuery({
    queryKey: ["articles", BusinessId],
    queryFn: () => getArticle(BusinessId),
    retry: false,
  });

  return { isLoading, error, article };
}
