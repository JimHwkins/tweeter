/* eslint-disable */

$(document).ready(() => {
  // Function to prevent XSS
  const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Function to toggle new tweet form
  const $newTweetButton = $("#toggle-new-tweet");
  $newTweetButton.on("click", function () {
    const $form = $("main").children(".new-tweet").children("form");
    if ($form.first().is(":hidden")) {
      $form.slideDown("slow");
      $("#tweet-text").focus();
    } else {
      $form.slideUp("slow");
    }
  });

  // Function to render tweet with html
  const createTweetElement = (tweet) => {
    const $tweet = $(`
  <article class="tweet-container">
  <div class="user">
    <img
      class="avatar"
      src="${tweet.user.avatars}"
      alt="avatar"
    />
    <div class="name">${tweet.user.name}</div>
    <div class="handle">${tweet.user.handle}</div>
  </div>
  <div class="content">
    <p>
    ${escape(tweet.content.text)}
    </p>
  </div>
  <div class="line"></div>
  <footer class="tweet">
    <div class="data">${timeago.format(tweet.created_at)}</div>
    <div class="icon-container">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`);

    return $tweet;
  };

  // Function to retrieve tweet from tweets db
  const renderTweets = (tweets) => {
    // Empties the feed before rendering
    $(".tweets-feed-container").empty();
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      // Puts new tweet on the top of the feed
      $(".tweets-feed-container").prepend(newTweet);
    }
  };

  // Function to load tweets with ajax
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).then((data) => {
      renderTweets(data);
    });
  };

  // Tweet submission process
  const $form = $("#tweet-form");
  $form.on("submit", (event) => {
    // Prevents refresh from form submit
    event.preventDefault();
    const tweetText = $("#tweet-text").val();
    $(".error-message").hide();

    // Conditionals and error messages
    if (tweetText.length > 140) {
      const $error = $("<div>")
        .text("Your message is limited to 140 characters only.")
        .addClass("error-message");
      $("#tweet-form").prepend($error);
      return;
    }
    if (!tweetText) {
      const $error = $("<div>")
        .text("The message cannot be empty.")
        .addClass("error-message");
      $("#tweet-form").prepend($error);
      $error.slideDown("slow");
      return;
    }

    const serializedData = $form.serialize();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: serializedData,
    })
      .then(loadTweets())
      .then(serializedData);
    loadTweets();

    // Restarts textarea and character counter
    $("#tweet-text").val("");
    $(".counter").text(140);
  });

  loadTweets();
});
