// const quoteText = document.getElementById("text");
// const authorText = document.getElementById("author");
// const newBtn = document.getElementById("newBtn");
// const copyBtn = document.getElementById("copyBtn");
// flag = 0
// async function getQuote() {
//     quoteText.textContent = "Loading...";
//     authorText.textContent = "Please wait...";

//     try {
//         const response = await fetch("https://api.quotable.io/random");
//         const data = await response.json();

//         quoteText.textContent = data.content;
//         authorText.textContent = `- ${data.author}`;
//     } catch (error) {
//         quoteText.textContent = "Oops! Couldn’t fetch a quote.";
//         authorText.textContent = "";
//         console.error("Error fetching quote:", error);
//     }
// }
// function copyQuote() {
//     const textToCopy = `"${quoteText.textContent}" ${authorText.textContent}`;
//     navigator.clipboard.writeText(textToCopy)
//         .then(() => {
//             if (flag == 0) {
//                 copyBtn.innerHTML = "✅Quote copied ";
//                 flag = 1;
//             }
//         })
//         .catch(err => {
//             console.error("Error copying text: ", err);
//         });
// }

// newBtn.addEventListener("click", getQuote);
// copyBtn.addEventListener("click", copyQuote);
// // setTimeout(function () {  // This part is not integeted , working ho rhi hai 
// //     copyBtn.innerHTML = "copy";
// //     console.log("This will not be executed if cleared.");
// // }, 2000);

// getQuote();




const quoteText = document.getElementById("text");
const authorText = document.getElementById("author");
const newBtn = document.getElementById("newBtn");
const copyBtn = document.getElementById("copyBtn");

const quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
  },
  {
    text: "It’s not whether you get knocked down, it’s whether you get up.",
    author: "Vince Lombardi",
  },
  {
    text: "If you are working on something exciting, it will keep you motivated.",
    author: "Steve Jobs",
  },
  {
    text: "Success is not in what you have, but who you are.",
    author: "Bo Bennett",
  },
];

function getRandomQuote() {
  quoteText.classList.remove("show");
  authorText.classList.remove("show");

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    quoteText.textContent = quote.text;
    authorText.textContent = `- ${quote.author}`;

    quoteText.classList.add("show");
    authorText.classList.add("show");
  }, 100);
}

function copyQuote() {
  const textToCopy = `"${quoteText.textContent}" ${authorText.textContent}`;
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert("✅ Quote copied to clipboard!");
    })
    .catch(err => {
      console.error("Error copying text: ", err);
    });
}

newBtn.addEventListener("click", getRandomQuote);
copyBtn.addEventListener("click", copyQuote);
