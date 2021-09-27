
/* Menu nav toggle */
$("#nav-toggle").on("click", function(event){
	event.preventDefault();

	let $this = $(this);
	$this.toggleClass("active");
	$(".header").toggleClass("active");
	$(`.header__go_back`).toggleClass('active');
	$(`.header__go_back_block`).toggleClass('active');

	// if ($('.header').classList) {}


    if (document.getElementById('header').classList.contains('active')) {
        window.scrollTo(0, 0);
        $(`body`).css('overflow', 'hidden');
        $(`.header__go_back_block`).css('background', 'black');
    } else {
        $(`body`).css('overflow', 'initial');
        $(`.header__go_back_block`).css('background', 'transparent');
    }
});

/* Logo scrolling */
$("#verify__submit_button").on("click", function(event){
	event.preventDefault();

    // console.log(Math.round($(blockId).offset().top));

	let blockId = $('#verify'),
		blockOffset = Math.round($(blockId).offset().top + 400);

	$("html, body").animate({
		scrollTop: blockOffset
	});
});

$(document).ready(function(){

    // console.log(Math.round($(blockId).offset().top));

	let blockId = $('#verify'),
		blockOffset = Math.round($(blockId).offset().top);

	$("html, body").animate({
		scrollTop: blockOffset
	});
});
