// var templates = getTemplates();

$.ajax({
    url: "http://api.tumblr.com/v2/blog/thechangingroom.tumblr.com/posts/",
    data: {
      api_key:'Srhk9qkcJO69pAoB4ltM5uIqpwUBO7kgDqDEaCD9Jo8EafWyHE',
      notes_info: true
    },
    dataType: 'jsonp',
    success: function(data){



      console.log(data.response.posts);

      var tags = _(data.response.posts).map('tags').flatten().uniq().value();

      console.log(tags);

      $('#results').html(plateforme.posts( data.response ) );
      $('#tags').html(plateforme.tags( {tags:tags} ));

      $("#results img").addClass('img-responsive');
      $("iframe").addClass('embed-responsive-item').wrap( "<div class='embed-responsive embed-responsive-16by9'></div>" );;
    }
});


$(document).mousemove(function(e) {
    $('.logo').offset({
        left: e.pageX,
        top: e.pageY
    });
});

Handlebars.registerHelper('debug', function(optionalValue) {
  console.log('Current Context');
  console.log('====================');
  console.log(this);

  if (optionalValue) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
});