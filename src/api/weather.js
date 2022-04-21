import Http from "@/http/index";
import baseUrl from '@/http/baseUrl'

const url = baseUrl;

export const getWeather= () => {
  return Http.get(`${url}/api/weather/info`);
};