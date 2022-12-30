let quotes_txt;
let quotes = [];
async function loadQuotes(){
    quotes_txt = await fetch("quotes.txt");
    quotes_txt = await quotes_txt.text();
    quotes_txt = quotes_txt.split("\n\n");
    console.log("hi");
    for(let i=0;i<quotes_txt.length;i++){
        quotes[i] = {};
        quotes[i].text = quotes_txt[i].split("--")[0];
        quotes[i].auther = quotes_txt[i].split("--")[1].split(".")[0];
    }
    console.log(quotes);
}
const quotesContainer = document.getElementById("content");
const createquotes = () => {
    const quoteContent = quotes[Math.floor(Math.random() * quotes.length)];
  let quote_element = document.createElement("div");
  quote_element.innerHTML = `
            <a class = "quote-text">
               ${quoteContent.text}
            </a>
            <div class = "quote-seperator">

            </div>
            <a class = "quote-auther">
                ${quoteContent.auther}
            </a>
            <div class = "quote-line"></div>
  `;

};
const addquotess = async () => {
  for (let i = 0; i <= 3; i++) {
    await createquotes();
  }
};

const handleInfiniteScroll = () => {
  window.removeEventListener("scroll", handleInfiniteScroll);
  setTimeout(() => {
    const endOfPage =
      window.innerHeight + window.pageYOffset +100 >= document.body.offsetHeight;
    if (endOfPage) {
      addquotess();
    }
    window.addEventListener("scroll", handleInfiniteScroll);
  }, 250);
};

async function init() {
loadQuotes();
  window.addEventListener("scroll", handleInfiniteScroll);
  while (document.body.scrollHeight <= window.innerHeight) {
    await createquotes();
  }
}
init();

