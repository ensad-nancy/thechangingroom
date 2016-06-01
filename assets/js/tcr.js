var posts = [];
var tags = {};

var backgrounds =  [
  "http://www.acanthe-paris.com/",
  "http://www.cyrillus.fr/",
  "http://www.gap.eu/",
  "http://www.aigle.com/fr_fr/esprit-de-famille/famille-bolzinger-karoline-romain-josephine-et-jeanette/",
  "http://www.aigle.com/fr_fr/esprit-de-famille/famille-saint-andre/",
  "http://faconnable.com/fr/Campaign/8/Campagnes_Hiver_15",
  "https://www.instagram.com/bonpoint/",
  "http://www.bonpoint.com/fr//yam/les-looks/",
  "http://www.barbour.com/blog/",
  "http://www.ralphlauren.fr/home/index.jsp",
  "http://www.brooksbrothers.com/on/demandware.store/Sites-brooksbrothers-Site/fr_FR/Home-Show"
]

var manetSevice = 'http://manet.medialab.sciences-po.fr/?url=';
var manetParam = '&delay=1000&format=jpg';

function getPosts(offset) {
  $.ajax({
    url:"http://api.tumblr.com/v2/blog/thechangingroom.tumblr.com/posts/",
    data: {
      api_key:'Srhk9qkcJO69pAoB4ltM5uIqpwUBO7kgDqDEaCD9Jo8EafWyHE',
      notes_info: true,
      offset:offset
    },
    dataType: 'jsonp',
    success: function(data){

      posts = posts.concat(data.response.posts);

      if (data.response.posts.length == 20) {
        getPosts(offset + 20);
      }else{

        tags = _(posts).map('tags').flatten().uniq().value();

        locationHashChanged();

        $('#results').html(plateforme.posts( {posts:posts, query:''} ) );

        $("#results img").addClass('img-responsive');
        $("iframe").addClass('embed-responsive-item').wrap( "<div class='embed-responsive embed-responsive-16by9'></div>" );

      }
    }
  });
}

getPosts(0);

$('.top').click(function() { $('html,body').animate({scrollTop:0},'slow') });

function locationHashChanged() {
  if(location.hash !== ""){
    var tag = location.hash.replace('#','');
    var postFiltered = _.reject(posts,function(d){ return d.tags.indexOf(tag) < 0 });

    $('#results').html(plateforme.posts( {posts:postFiltered, query:tag} ) );

    $("#results img").addClass('img-responsive');
    $("iframe").addClass('embed-responsive-item').wrap( "<div class='embed-responsive embed-responsive-16by9'></div>" );

  }

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
