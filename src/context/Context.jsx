import { createContext, useState } from "react";
import runChat from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const boldWords = (text) => {
    const regex = /\*\*(.*?)\*\*/g;
    return text.replace(regex, "<b>$1</b>");
  };

  const delayPara = async (index, nextWord) => {
    setTimeout(() => setResultData(prev => prev + nextWord), 25 * index);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let boldWords;
    if (prompt !==undefined) {
      boldWords = await runChat(prompt)
      setRecentPrompt(prompt)
    }
    else
    {
      setRecentPrompt(prev=>[...prev, input])
      setRecentPrompt(input)
      boldWords = await runChat(input)
    }
    setRecentPrompt(input);
    setPrevPrompts((prev) => [...prev, input]);

    const response = await runChat(input);

    setResultData(response)
    console.log("run chat response", response);
    setLoading(false)
    setInput("")

    const boldResponse = boldWords(response);

    const newResponseArray = boldResponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) 
    {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    // {
    //   boldResponse += '<b>' + newResponseArray[i]+'<br>';
    // }
    // let newResponse2 = nextWord.split("*").join("</br>")
    // setResultData(newResponse2)
    // let newResponse2 = 
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;


