import axios from "@/plugins/axios";

export const fetchAllProducts = async () => {
  const { data } = await axios.get("/todos");
  console.log(data, "data all");
  return data;
};
