import request from "@/utils/request";
export const fetchAppData = () => {
  return request({
    url: "/visualization",
  });
};
