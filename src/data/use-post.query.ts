import { useQuery } from "react-query";
import API from "../lib/api";

const fetchData = async () => {
  const res = await API.get("/posts");
  return res.data;
};

export const usePostQuery = () => {
  return useQuery("posts", fetchData);
};
