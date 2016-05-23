// var templates = getTemplates();

var posts = {};
var tags = {};

var backgrounds =  [
  "http://www.ralphlauren.fr/",
  "http://www.acanthe-paris.com/",
  "http://www.cyrillus.fr/",
  "http://www.gap.eu/",
  "http://www.brooksbrothers.com/"
]

var manetSevice = 'https://manet.herokuapp.com/?url=';
var manetParam = '&delay=1000&format=jpg';


$.ajax({
    url:"http://api.tumblr.com/v2/blog/thechangingroom.tumblr.com/posts/",
    data: {
      api_key:'Srhk9qkcJO69pAoB4ltM5uIqpwUBO7kgDqDEaCD9Jo8EafWyHE',
      notes_info: true
    },
    dataType: 'jsonp',
    success: function(data){

      tags = _(data.response.posts).map('tags').flatten().uniq().value();
      posts = data.response.posts;

      locationHashChanged();

      $("#results img").addClass('img-responsive');
      $("iframe").addClass('embed-responsive-item').wrap( "<div class='embed-responsive embed-responsive-16by9'></div>" );;
    }
});


$('.logo').click(function() { $('html,body').animate({scrollTop:0},'slow') });

function locationHashChanged() {

    var tag = location.hash.replace('#','');
    var postFiltered = _.reject(posts,function(d){ return d.tags.indexOf(tag) < 0 });

    $('#results').html(plateforme.posts( {posts:postFiltered, query:tag} ) );
    $('#tags').html(plateforme.tags( {tags:tags, query:tag} ));

    var bg = _(backgrounds).shuffle().first();

    console.log(bg);

    $("body").css('background-image', 'url('+manetSevice+encodeURI(bg)+manetParam+')' );


}

window.onhashchange = locationHashChanged;





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

Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});
