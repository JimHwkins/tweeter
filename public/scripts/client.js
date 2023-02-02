/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1675121885410,
  },
];

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
    <div class="data">${timeago.format(tweet.user.created_at)}</div>
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
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $("#tweets-container").append(newTweet);
  }
};

renderTweets(data);
