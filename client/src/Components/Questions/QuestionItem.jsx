import React from 'react';

export default function Questions({ question }) {
  return (
    <div className="container">
      Question Item
      <div>Q:{question.question_body}</div>
      <div>A:{Object.keys(question.answers)}</div>
      <div>By {question.asker_name},{question.question_date} | Helpful? Yes({question.question_helpfulness}) | Report:{question.reported}</div>
    </div>
  );
}
