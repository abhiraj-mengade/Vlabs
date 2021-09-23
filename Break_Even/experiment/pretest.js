
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
      question: "Which of the following is not a fixed cost?",
      answers: {
        a: "New Building/Factory",
        b: "Rent",
        c: "Raw materials",
        d: "Insurance"
      },
      correctAnswer: "c"
    },

    {
      question: "Which of the following is a variable cost?",
      answers: {
        a: "Advertising",
        b: "Shipping costs",
        c: "Salaries",
        d: "Equipment lease"
      },
      correctAnswer: "b"
    },

    {
      question: "What does total revenue depend upon?",
      answers: {
        a: "Selling Price",
        b: "Quantity",
        c: "Both a & b",
        d: "None of the above"
      },
      correctAnswer: "c"
    },
    {
      question: "How is total revenue calculated?",
      answers: {
        a: "Selling Price X Quantity Sold",
        b: "Cost Price X Quantity Sold",
        c: "Selling Price / Quantity Sold",
        d: "Cost Price / Quantity Sold"
      },
      correctAnswer: "a"
    },
    {
      question: "What is a business doing at the break-even point?",
      answers: {
        a: "Making Profit",
        b: "Making Loss",
        c: "Making Profit then loss",
        d: "No profit, No loss"
      },
      correctAnswer: "d"
    },

    {
      question: "Which of the following is true?",
      answers: {
        a: "Break even point (in quantity) decreases with increase in cost",
        b: "Break even point (in quantity) decreases with increase in selling price",
        c: "Break even point (in sales) decreases with increase in cost",
        d: "Break even point (in sales) decreases with decrease in quantity"
      },
      correctAnswer: "b"
    },

    {
      question: "On a break-even chart, which line does the total revenue line meet at the break-even point?",
      answers: {
        a: "Fixed Cost line",
        b: "Variable Cost Line",
        c: "Total Cost Line",
        d: "None of these"
      },
      correctAnswer: "c"
    },
    {
      question: "If the average variable costs Rs. 10, average selling price is Rs. 25 and fixed costs are Rs. 60,000, then what is the break-even output?",
      answers: {
        a: "4000",
        b: "3500",
        c: "5000",
        d: "6000"
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
