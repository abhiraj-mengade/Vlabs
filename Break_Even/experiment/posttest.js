
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  

// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

  const myQuestions = [
    {
      question: "In any organization, profits depends mainly upon?",
      answers: {
        a: "Production cost",
        b: "Production output",
        c: "Revenue",
        d: "All of the above"
      },
      correctAnswer: "d"
    },

    {
      question: "Given selling price is Rs 10 per unit, variable cost is Rs 6 per unit and fixed cost is Rs 5,000. What is the break-even point?",
      answers: {
        a: "500 units",
        b: "1000 units",
        c: "1250 units",
        d: "None of These"
      },
      correctAnswer: "c"
    },

    {
      question: "The breakeven point is obtained at intersection of ?",
      answers: {
        a: "Total revenue and Total cost line",
        b: "Total cost and variable cost line",
        c: "Variable cost and fixed cost line",
        d: " Fixed cost and total cost line"
      },
      correctAnswer: "a"
    },

    {
      question: "Given Break even sales is 40,000 Profit earned is Rs 2,000 and fixed cost is Rs 8,000. Determine actual sales.",
      answers: {
        a: "Rs. 50000",
        b: "Rs. 20000",
        c: "Rs. 32000",
        d: "None of the above"
      },
      correctAnswer: "a"
    },

    {
      question: "The Break-even Point of a company is that level of sales income which will equal the sum of its fixed cost.",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "a"
    },

    {
      question: "While measuring break-even analysis, it is considered that during a specific period there will be no change in general price level, i.e., labor, cost of material and other overheads.",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "a"
    },


  ];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
