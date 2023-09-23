import "./questionColumn.css";
import React from "react";
import Question from "./Question.js";
import { getFaq } from "../../api/faq";
import { useState, useEffect, useRef } from "react";
function Column() {
  //var questionList = require('../../data/texts/FAQ.json');
  const [questionList, setQuestionList] = useState([]);
  useEffect(() => {
    getFaq().then((data) => {
      setQuestionList(data);
    });
  }, []);
  //console.log(questionList);

  return (
    <div className="questions">
      {questionList.map((question) => {
        return (
          <Question
            question={question["question"]}
            answer={question["answer"]}
          />
        );
      })}
    </div>
  );
}

export default Column;
