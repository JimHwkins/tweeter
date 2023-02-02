/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
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
    ${tweet.content.text}
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

  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $(".tweets-feed-container").prepend(newTweet);
    }
  };

  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).then((data) => {
      renderTweets(data);
    });
  };

  const $form = $("#tweet-form");
  $form.on("submit", (event) => {
    event.preventDefault();
    const tweetText = $("#tweet-text").val();
    if (tweetText.length > 140) {
      return alert("The tweet is limited to 140 characters only");
    }
    if (tweetText === "" || tweetText === null) {
      return alert("The tweet can't be empty");
    }
    const serializedData = $form.serialize();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: serializedData,
    }).then(serializedData);
    loadTweets();
  });
  loadTweets();
});
