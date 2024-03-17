import API_ENDPOINTS from "constants/apiEndpoints";

export const preprocessImage = async (imageUri) => {
  const formData = new FormData();
  formData.append("image", {
    uri: imageUri.uri,
    type: "image/jpeg",
    name: "image.jpg",
  });

  const response = await fetch(API_ENDPOINTS.preprocess, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // check if response is ok
  if (!response.ok) {
    throw new Error("Error while preprocessing image");
  }
  return true;
};

export const predictImage = async () => {
  const response = await fetch(API_ENDPOINTS.predict, {
    method: "GET",
  });

  // check if response is ok
  if (!response.ok) {
    throw new Error("Error while predicting image");
  }

  return await response.json();
};
