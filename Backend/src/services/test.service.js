import { createGoogleGenerativeAI } from "@google/genai";
import 'dotenv/config';

const ai = createGoogleGenerativeAI({ apiKey: "AIzaSyC5-NZu2ruZSPLaT92a7qzT4b7fd7dPKrM"});

async function listAvailableModels() {
  try {
    // The SDK returns an object, we need to access the .models property
    const response = await ai.models.list();
    
    console.log("--- Connection Successful ---");
    
    // Check if the property exists and is an array
    const modelsArray = response.models || response; 

    if (Array.isArray(modelsArray)) {
      modelsArray.forEach((m) => {
        console.log(`- Name: ${m.name}`);
      });
    } else {
      console.log("Response structure:", response);
    }
  } catch (error) {
    console.error("Error listing models:", error.message);
  }
}

listAvailableModels();

