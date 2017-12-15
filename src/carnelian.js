var apiUri = "https://api.github.com/repos/Nj-neer/Carnelian/releases/latest";

var t = $("#dl-url");

//retreive links for the last release
$.get( apiUri, function( data ) {
  $(".ver-num").text(data.tag_name);
  var platform = checkNav();
  if(!data.assets[platform.assetIndex]){
    data.assets[platform.assetIndex] = {
      browser_download_url: "#"
    };
  }

  //if unknown os
  if(platform.icon == null){
    $(".known-os").hide();
  }

  var setupUrl = data.assets[0].browser_download_url;

  t.find("i").addClass("mdi-"+platform.icon);
  if(platform.assetIndex != null){
    t.attr("href", data.assets[platform.assetIndex].browser_download_url);
    t.attr("target", "_blank");
    t.fadeTo(1.0, 500);
  }
  t.attr("title", platform.label);
  //enable tooltip
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
});

$(".features-button").hover(function(){
  $(".features-button i").each(function() {
    $(this).addClass("animated bounce");
  });
});

$(".features-button").click(function(){
  $('html, body').animate({
        scrollTop: $("#features").offset().top
    }, 1000);
});

function checkNav() {
  var r = {
    icon: null,
    assetIndex: null,
    label: null
  }
  if(navigator.appVersion.indexOf('Mac') > -1){
    r = {
      icon: "apple",
      //label: "For OSX",
      label: "Available soon...",
      assetIndex: null
    };
  }
  if(navigator.appVersion.indexOf('Win') > -1){
    r = {
      icon: "windows",
      label: "For Windows 64 bits",
      assetIndex: 0
    };
  }
  if(navigator.appVersion.indexOf("Linux") > -1){
    r = {
      icon: "linux",
      //label: "For Linux",
      label: "Available soon...",
      assetIndex: null
    };
  }
  return r;
}

$(document).ready(function() {
  setTimeout(function(){
      $("#screen").addClass("animated fadeInLeft");
  },1000);
});
