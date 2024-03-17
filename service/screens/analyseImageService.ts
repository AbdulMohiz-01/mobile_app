import { Response } from "model/response"
import { predictImage, preprocessImage } from "service/artifact/artifactService"

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
        const status = await preprocessImage(imageUri);

        if (status) {
            // now predict the image
            const results = await predictImage();
            response.status = true;
            response.message = "Image analysed successfully!";
            response.data = results;
            return response;
        }
    } catch (error) {
        console.log(error);
    }

}