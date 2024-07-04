import API_ENDPOINTS from "constants/apiEndpoints";

export const getContentFromGemini = async (className) => {
    try {
        // Create the request payload
        const payload = { className };

        // Make the request to the backend endpoint
        const response = await fetch(API_ENDPOINTS.genai, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        // Check if response is ok
        if (!response.ok) {
            return null;
        }

        // Parse the response data
        const data = await response.json();

        console.log("Data", data)

        // Ensure the response matches the expected structure
        const content = {
            [className]: {
                description: data[className]?.description || "No description available",
                details: {
                    short_description: data[className]?.details?.short_description || "No short description available",
                    stage: data[className]?.details?.stage || "No stage information available",
                    precautions: data[className]?.details?.precautions || "No precautions available"
                }
            }
        };

        console.log("content", content)

        return content;
    } catch (error) {
        console.error("Error fetching content from Gemini:", error);
        return { error: "Failed to fetch content. Please try again later." };
    }
};
