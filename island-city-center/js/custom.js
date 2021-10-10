$(document).ready(function() {

	var headerHeight = $('header').height();

	$('.tab-wrp .tablink').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        // $('.tabcontent').hide();
        $(this).parent().parent().parent().siblings('.tabcontent').hide();
        $(this).parent().parent().parent().siblings().find('.tabcontent').hide();
        $(target + '.tabcontent').fadeIn();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    })
    
	$('.home-slider').owlCarousel({
		loop: false,
		autoplay:false,
		margin:0,
		items: 1,
		nav: false,
		dots: false,
		mouseDrag: false
	});	
    
	$('.gallery-slider').owlCarousel({
		loop: false,
		autoplay:false,
		margin:0,
		items: 1,
		nav: true,
		dots: false,
		mouseDrag: false
	});	
    
	$('.amenity-slider').owlCarousel({
		loop: false,
		autoplay:false,
		margin:0,
		items: 1,
		nav: true,
		dots: false,
		mouseDrag: false
	});	

	$('.floorplan-slider').owlCarousel({
		loop: false,
		autoplay:false,
		margin:20,
		items: 2,
		nav: true,
		dots: false,
		mouseDrag: true,
		responsive : {
			0 : {
			  items: 1,
			},
			480 : {
			},
			768 : {
			  items: 2,
			}
		}
	});

	$('.floorplan-slider-tab-3').owlCarousel({
		loop: false,
		autoplay:false,
		margin:20,
		items: 1,
		nav: true,
		dots: false,
		mouseDrag: true
	});

	$("nav a, .logo-wrp a").click(function(t) {
        t.preventDefault();
        var e = $(this).attr("href");
        var subnav = $(this).attr("data-subnav");
        $("html, body").animate({
            scrollTop: $(e).offset().top - $("header").innerHeight() - 2
        }, 500), $(this).addClass("active").siblings().removeClass("active"), $(window).width() <= 1024 && ($("nav").removeClass("active").removeClass("opened"), $(".overlay-1").removeClass("active"))
		$('.hamburger, nav').removeClass('open');
    })
	
	$('.sec-eqMobile, .eqClick').on('click',function(){
		$('.sec-eq').addClass('show');
	});
	$('.closeIcon').on('click',function(){
		$('.sec-eq').removeClass('show');
	}); 

    $(".down-arw").click(function() {
      $('html,body').animate({
        scrollTop: $("#overview").offset().top -headerHeight},
      'slow');
    });

	$('.play-button').click(function(){
		$(this).removeClass('active');
		$(this).siblings('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
	});

	$('.pause-button').click(function(){
		$('.play-button').addClass('active');
		$(this).siblings('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
	});
	
	$('.hamburger').click(function(){
		$('.hamburger, nav').toggleClass('open');
	});
    
});