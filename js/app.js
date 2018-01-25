//developed by Vivek Maru - vivekmaru.com

(function() {
  const body = document.body;
  const next = document.getElementById("next");
  const container = document.querySelector(".container");
  const url =
    "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";
  const tweetButton = document.getElementById("twwt");
  const Quote = {
    quote: document.querySelector(".quote"),
    author: document.querySelector(".author")
  };
  let clientX, clientY;

  next.addEventListener("click", nextQuote);
  //touch
  body.addEventListener(
    "touchstart",
    function(e) {
      // Cache the client X/Y coordinates
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    },
    false
  );

  body.addEventListener(
    "touchend",
    function(e) {
      var deltaX, deltaY;
      deltaX = e.changedTouches[0].clientX - clientX;
      deltaY = e.changedTouches[0].clientY - clientY;
      if (deltaX > 0) {
        nextQuote();
      }
      // Process the data ...
    },
    false
  );

  function getRandomColor() {
    color =
      "rgb(" +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 255) +
      "," +
      Math.round(Math.random() * 255) +
      ")";
    return color;
  }
  function nextQuote() {
    Quote.quote.style.opacity = "0";
    Quote.author.style.opacity = "0";

    fetch(url, {
      headers: {
        "X-Mashape-Key": "50ecP4Lxixmshac2dup832Jona4Ep1UO0acjsnFzPur0AyfFED",
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        //quote.style.opacity = '1';
        return response.json();
      })
      .then(data => {
        Quote.quote.style.opacity = "1";
        Quote.author.style.opacity = "1";
        Quote.quote.innerHTML = `<q>${data.quote}</q>`;
        Quote.author.innerHTML = `<span>${data.author}</span>`;
        tweetButton.href = `https://twitter.com/intent/tweet?hashtags=quotes&text=${
          data.quote
        } - ${data.author}`;
      });
  }

  nextQuote();
})();
