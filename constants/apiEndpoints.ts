import { Retina } from "./environment";

const API_ENDPOINTS = {
  predict: Retina + "/predict",
  preprocess: Retina + "/preprocess",
  ping: Retina + "/ping",
  xai: Retina + "/xai",
};

export default API_ENDPOINTS;
