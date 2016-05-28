ghost.init({
  clientId: "ghost-frontend",
  clientSecret: "617d69bbb120"
 });

 function onSuccess(data) {
  var feed = $('#blog-feed')[0];

  if (data.posts.length > 0) {
    $.each(data.posts, function (i, post) {
      var item = feed.appendChild(document.createElement('div'));
      $(item).addClass('item');

      var thumbnail = $(item).append("<img class='ui image thumbnail' src='http://localhost:2368" + post.image + "' />");

      var description = item.appendChild(document.createElement('div'));
      $(description).addClass('middle aligned content description');

      var eventName = description.appendChild(document.createElement('a'));
      eventName.appendChild(document.createTextNode(post.title));
      $(eventName).addClass('header');

      var eventTime = description.appendChild(document.createElement('div'));
      eventTime.appendChild(document.createTextNode(moment(post.created_at).format('llll')));
      $(eventTime).addClass('meta');

      var descriptionDiv = description.appendChild(document.createElement('div'));
      var descriptionText = descriptionDiv.appendChild(document.createElement('p'));
      descriptionText.appendChild(document.createTextNode(post.markdown));
    });
  }
  else {
    feed.appendChild(document.createTextNode('No News'));
  }

}

$(document).ready(function () {
  $.get(
    ghost.url.api('posts', {limit: 10})
  ).done(onSuccess);
});
