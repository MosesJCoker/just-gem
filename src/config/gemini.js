import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import axios from 'axios';


const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyD_2AXgH2FaRhSTwEO20KlvwVYx1FQcFF4";


async function runChat(prompt) {
  console.log('prompt:', prompt);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  
  const raw = JSON.stringify({
    "query": prompt
  });
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

   

const message = await fetch("http://localhost:3000", requestOptions);
const text = await message.json();
  console.log(text);

  return text.answer;

  // const response = await message.json();

  // console.log('message from api', response);

  // const genAI = new GoogleGenerativeAI(API_KEY);
  // const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  // const generationConfig = {
  //   temperature: 0.9,
  //   topK: 1,
  //   topP: 1,
  //   maxOutputTokens: 2048,
  // };

  // const safetySettings = [
  //   {
  //     category: HarmCategory.HARM_CATEGORY_HARASSMENT,
  //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //   },
  //   {
  //     category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //   },
  //   {
  //     category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
  //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //   },
  //   {
  //     category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  //     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //   },
  // ];

  // const chat = model.startChat({
  //   generationConfig,
  //   safetySettings,
  //   history: [],
  // });

  // const result = await chat.sendMessage(prompt);
  // const response = result.response;
  // console.log(response.text());
  // return response.text();
}

export default runChat;


