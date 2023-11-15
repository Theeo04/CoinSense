import React, { useState } from "react";
import axios from "axios";

const QuestionAnswer = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const getAnswer = async () => {
    // Make a request to the ChatGPT API
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions", // Replace with the actual API endpoint
        {
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: question },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_API_KEY", // Replace with your actual API key
          },
        }
      );

      // Update the answer state with the API response
      setAnswer(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching answer:", error.message);
      // Handle errors, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <h1>Question Answer App</h1>
      <div>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={getAnswer}>Get Answer</button>
      </div>
      {answer && (
        <div>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswer;
