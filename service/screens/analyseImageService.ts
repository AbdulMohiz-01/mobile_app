import { Response } from "model/response"
import { preprocessImage } from "service/artifact/artifactService"

export const analyseImage = async (imageUri: any) => {
    const response: Response = {
        status: false,
        message: "Image not found!",
        data: null
    }

    if (imageUri === null) {
        return response;
    }

    // analyse the image
    try {
        const result = await preprocessImage(imageUri);
        console.log("🔴🔴🔴")
        console.log(result);
        console.log("🔴🔴🔴")
    } catch (error) {
        console.log(error);
    }

}