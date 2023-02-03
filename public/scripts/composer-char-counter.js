/* eslint-disable */

$(document).ready(function () {
  // Function to count characters
  $("textarea").on("input", function () {
    const maxChars = 140;
    const inputChars = $(this).val().length;
    const charsLeft = maxChars - inputChars;
    const counter = $(this).parent().find(".counter");
    $(counter).text(charsLeft);
    if (charsLeft < 0) {
      counter.addClass("char-limit");
    } else {
      counter.removeClass("char-limit");
    }
  });
});
