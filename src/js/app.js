$(document).ready(function () {
	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	$.fn.hasAttr = function(name) {
	  return this.attr(name) !== undefined;
	};
	
	//scroll Top elements

	(function(){
		var map = $('.map'),
				top = (map.offset().top - 250)*0.75,
				btn = $('.btn__scrollTo');
				

		btn.on('click', function(){
			$('html, body').animate({
				scrollTop: top
			}, 3600);
		});
	})();

	//basket
	function inits(){
		return {
			arrows: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			vertical: true,
			verticalSwiping: true,
			infinite: false,
			prevArrow: '<button type="button" class="slick-prev"><span><svg viewBox="0 0 512 275" xmlns="http://www.w3.org/2000/svg"><g><path id="svg_2" fill="#6A6E7C" d="m256,0.00156c-2.8,0 -5.5,1.1 -7.60001,3.2l-245.39999,254.10001c-4,4.20001 -3.9,10.89999 0.3,14.89999c4.2,4 10.9,3.89999 14.9,-0.29999l245.50001,-254.00002c4,-4.2 3.89999,-10.89999 -0.30002,-14.89999c-2.10001,-2.00001 -4.79999,-3.00001 -7.39999,-3.00001z"/><path id="svg_3" fill="#6A6E7C" d="m256,0.00156c-2.60001,0 -5.3,1 -7.3,3c-4.2,4 -4.3,10.7 -0.3,14.9l245.5,253.99998c4,4.20001 10.70001,4.30002 14.89999,0.30002c4.20001,-4 4.29999,-10.70001 0.30002,-14.89999l-245.5,-254.00002c-2.10001,-2.2 -4.80002,-3.3 -7.60001,-3.3z"/></g></svg></span></button>',
			nextArrow: '<button type="button" class="slick-next"><span><svg viewBox="0 0 512 275" xmlns="http://www.w3.org/2000/svg"><g><path id="svg_2" fill="#6A6E7C" d="m256,275.60001c-2.8,0 -5.5,-1.10001 -7.60001,-3.19998l-245.39999,-254.10002c-4,-4.2 -3.9,-10.9 0.3,-14.9c4.2,-4 10.9,-3.9 14.9,0.3l245.50001,254.00002c4,4.19998 3.89999,10.89999 -0.30002,14.89999c-2.10001,2 -4.79999,3 -7.39999,3z"/><path id="svg_3" fill="#6A6E7C" d="m256,275.60001c-2.60001,0 -5.3,-1 -7.3,-3c-4.2,-4 -4.3,-10.69998 -0.3,-14.89999l245.5,-254c4,-4.2 10.70001,-4.3 14.89999,-0.3c4.20001,4 4.29999,10.7 0.30002,14.89999l-245.5,254.00002c-2.10001,2.19998 -4.80002,3.29999 -7.60001,3.29999z"/></g></svg></span></button>'
		};
	};

	function bSlide(){
		var basket = $('.basket'),
				inner = basket.find('.basket__container'),
				slider = inner.find('.basket_slider');

		basket.on('mouseenter', function(){
			if(!$(this).hasClass('mobile')){return}
			if($(this).hasClass('init')){return}
			inner.fadeIn(150);
			if(slider.find('.item__basket').length > 3) {
				slider.slick(inits());
			}
			$(this).addClass('init');
		});
		basket.on('mouseleave', function(){
			inner.fadeOut({
				duration: 150,
				complete: function(){
					if(slider.hasClass('slick-slider')) {
						slider.slick('unslick');
					}
					basket.removeClass('init');
				}	
			});
			
		});
	};
	if($(window).width() && parseInt($(window).width()) > 1023) {
		bSlide();
		$('.basket').addClass('mobile');
	}
	$(window).on('resize', function(){
		if($(window).width() && parseInt($(window).width()) > 1023) {
			bSlide();
			$('.basket').addClass('mobile');
		} else {
			$('.basket').removeClass('mobile');
		}
	});
	//reset form
	(function() {
		$('.reset_form').each(function(){
			var this_ = $(this),
					input = this_.find('.input'),
					reset = this_.find('.reset');

			if (input.val().length > 0) {
				reset.fadeIn(150);
			}

			input.on('input', function(){
				var value = $(this).val();
				if(value.length > 0) {
					reset.delay(100).fadeIn(150);
					input.addClass('active');
				} else {
					reset.fadeOut(100);
					input.removeClass('active');
				}
			});			
			reset.on('click', function(){
				input.val('');
				$(this).fadeOut(100);
				input.attr('value', '');
				input.removeClass('active');
			});
		});
	})();
	
	//NEW MENU
	function Menu(element) {
		this.config = {
			button: '.menu__head-item',
			tab: '.menu__tab',
			content: '.menu__content',
			activeClass: 'is-active',
			openClass: 'is-open',
			delayBeforeOpen: 500,
			activeTab: 0,
			alwaysOpen: false
		};

		$.extend(this.config || {});
		this.$el  = element instanceof jQuery ? element : $(element);
		this.activeTab = this.config.activeTab;
		this.opened	= false;
		this.init()
	}

	Menu.prototype = {
		constructor: Menu,

		_initEvents: function() {
			var _ = this;
			var timeout;
			this.$buttons.on('mouseover touchend', function(e) {
				var btn   = $(this);
				var index = $(this).index();

				e.preventDefault();
				clearTimeout(timeout);

				if (e.type == 'touchend' && index === _.activeTab && _.opened) {
					_.close();

					return;
				}

				if(!_.opened) {
					timeout = setTimeout(function() {
						_.toggleTabs(index);
						_.open();
					}, 550);
				} else if (index !== _.activeTab) {
					_.toggleTabs(index);
				}
			});

			this.$el.on('mouseleave', function(){
				clearTimeout(timeout)
				if (_.opened && !_.config.alwaysOpen) {
					_.close();
				}
			});

		},
		toggleTabs: function(index) {
			var _ = this;
			$(_.$buttons[_.activeTab]).removeClass(_.config.activeClass);
			$(_.$buttons[index]).addClass(_.config.activeClass);
			$(_.$tabs[_.activeTab]).removeClass(_.config.activeClass);
			$(_.$tabs[index]).addClass(_.config.activeClass);
			_.activeTab = index;
		},
		open: function(duration, index){
			if (this.opened) return;

			var _        = this;
			var duration = $.isNumeric(duration) ? duration : 300;

			_.$content.fadeIn({
				duration: duration,
				start: function() {
					setTimeout(function() {
						_.$el.addClass(_.config.openClass);
					}, 100);
					if ($.isNumeric(index)) {
						_.toggleTabs(index);
					}
				},
				complete: function() {
					_.opened = true;
				},
			});

		},
		close: function(duration) {
			if (!this.opened) return;

			var _        = this;
			var duration = $.isNumeric(duration) ? duration : 300;

			_.$content.fadeOut({
				duration: duration,
				start: function() {
					setTimeout(function() {
						$(_.$buttons[_.activeTab]).removeClass(_.config.activeClass);
					}, 200);
				},

				complete: function() {
					_.$el.removeClass(_.config.openClass);
					_.opened = false;
				},
			});

		},
		init: function() {
			var _ = this;
					_.$buttons = _.$el.find(_.config.button);
					_.$tabs    = _.$el.find(_.config.tab);
					_.$content = _.$el.find(_.config.content);

			_.$content.hide();
			_._initEvents();
		}
	};
	var menu = $('.menu');
	menu = new Menu(menu);

	

	//SLIDER
	(function(){
		var slider = $('.sliders');
		if(slider.length){
			$('.slider').slick({
				arrows: true,
				slidesToShow: 6,
				slidesToScroll: 1,
				speed: 500,
				infinite: false,
				prevArrow: '<button type="button" class="slick-prev"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.8,0L15,1.1L2.7,13.6L15,25.7L13.7,27L0,13.7L13.8,0z"/></svg></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M15,13.7L1.3,27L0,25.7l12.3-12.1L0,1.1L1.2,0L15,13.7z"/></svg></span></button>',
				responsive: [
					{
						breakpoint: 1281,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 750,
						settings: {
							slidesToShow: 2
						}
					}
				]
			});
			$('.slider_simple').slick({
				arrows: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				speed: 500,
				infinite: false,
				prevArrow: '<button type="button" class="slick-prev"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.8,0L15,1.1L2.7,13.6L15,25.7L13.7,27L0,13.7L13.8,0z"/></svg></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M15,13.7L1.3,27L0,25.7l12.3-12.1L0,1.1L1.2,0L15,13.7z"/></svg></span></button>',
				responsive: [
					{
						breakpoint: 750,
						settings: {
							slidesToShow: 2
						}
					}
				]
			});
			$('.slider_img').slick({
				arrows: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				infinite: true,
				prevArrow: '<button type="button" class="slick-prev"><span><svg viewBox="0 0 81 65" xmlns="http://www.w3.org/2000/svg"><path id="svg_1" d="m76.558144,28.651196l-62.343987,0l21.45599,-21.456001c1.562,-1.562001 1.562,-4.095 0.000999,-5.657c-1.562,-1.562 -4.095997,-1.562 -5.657988,0l-28.283005,28.284003l0,0c-0.186,0.186001 -0.352,0.390999 -0.498,0.610001c-0.067,0.100998 -0.113999,0.209999 -0.171,0.314999c-0.067,0.123999 -0.142,0.242002 -0.196,0.372997c-0.056,0.134998 -0.088,0.275999 -0.129,0.416c-0.032001,0.110996 -0.075001,0.216995 -0.098001,0.330996c-0.052,0.258993 -0.08,0.520994 -0.08,0.783995l0,0c0,0.002998 0.001,0.005001 0.001,0.008003c0,0.258995 0.027,0.518997 0.078001,0.773998c0.023999,0.120998 0.068999,0.231998 0.103998,0.349003c0.039,0.132996 0.070001,0.267998 0.123,0.396996c0.058001,0.139004 0.136001,0.264999 0.208,0.396004c0.054,0.098 0.096,0.197998 0.159,0.292c0.146999,0.221001 0.314,0.427002 0.500999,0.613998l28.282004,28.280998c1.561995,1.561996 4.094988,1.561996 5.656988,0.000999c1.562,-1.561996 1.562,-4.096001 0,-5.657997l-21.45599,-21.454002l62.342987,0c2.209,0 4,-1.790997 4,-4s-1.791,-3.999989 -4,-3.999989z"/></svg></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span><svg viewBox="0 0 81 65" xmlns="http://www.w3.org/2000/svg"><path d="m4.424245,36.54546l62.343997,0l-21.456001,21.456001c-1.562,1.561996 -1.562,4.095001 -0.000999,5.655998c1.562,1.562008 4.096001,1.562008 5.657997,0l28.283005,-28.284l0,0c0.185997,-0.186001 0.351997,-0.390999 0.497993,-0.608997c0.067001,-0.101002 0.114006,-0.210003 0.172005,-0.315002c0.066002,-0.124001 0.141998,-0.242001 0.195,-0.373001c0.056999,-0.134998 0.088997,-0.274998 0.128998,-0.414997c0.033005,-0.111 0.076004,-0.217003 0.098999,-0.331001c0.052002,-0.259998 0.079002,-0.521999 0.079002,-0.785l0,0c0,-0.002998 -0.000999,-0.006001 -0.000999,-0.008999c-0.000999,-0.259003 -0.027,-0.519001 -0.078003,-0.774002c-0.023994,-0.119999 -0.069,-0.230999 -0.103996,-0.348999c-0.039001,-0.132999 -0.069,-0.268002 -0.123001,-0.396999c-0.057999,-0.139 -0.136002,-0.264999 -0.208,-0.396c-0.054001,-0.098 -0.097,-0.198002 -0.158997,-0.292c-0.146004,-0.221001 -0.314003,-0.427002 -0.501007,-0.614002l-28.281998,-28.280998c-1.562,-1.562 -4.094997,-1.562 -5.656998,-0.001001c-1.562,1.562001 -1.562,4.095001 0,5.658001l21.456001,21.455l-62.342997,0c-2.209,0 -4,1.791 -4,4c0,2.209 1.791,4 4,4z"/></svg></span></button>',
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							arrows: false,
							dots: true
						}
					}
				]
			});
			$('.single').slick({
				arrows: true,
				slidesToShow: 5,
				slidesToScroll: 1,
				speed: 500,
				infinite: false,
				prevArrow: '<button type="button" class="slick-prev"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.8,0L15,1.1L2.7,13.6L15,25.7L13.7,27L0,13.7L13.8,0z"/></svg></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M15,13.7L1.3,27L0,25.7l12.3-12.1L0,1.1L1.2,0L15,13.7z"/></svg></span></button>',
				responsive: [
					{
						breakpoint: 1281,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 3
						}
					}
				]
			});
			$('.advantages').slick({
				arrows: false,
				slidesToShow: 4,
				speed: 500,
				infinite: false,
				prevArrow: '<button type="button" class="slick-prev"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.8,0L15,1.1L2.7,13.6L15,25.7L13.7,27L0,13.7L13.8,0z"/></svg></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M15,13.7L1.3,27L0,25.7l12.3-12.1L0,1.1L1.2,0L15,13.7z"/></svg></span></button>',
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							arrows: true,
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 750,
						settings: {
							arrows: true,
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
			$('.slider_brand').slick({
				arrows: true,
				slidesToShow: 8,
				slidesToScroll: 1,
				speed: 500,
				infinite: true,
				prevArrow: '<button type="button" class="slick-prev"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.8,0L15,1.1L2.7,13.6L15,25.7L13.7,27L0,13.7L13.8,0z"/></svg></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M15,13.7L1.3,27L0,25.7l12.3-12.1L0,1.1L1.2,0L15,13.7z"/></svg></span></button>',
				responsive: [
					{
						breakpoint: 1281,
						settings: {
							slidesToShow: 6
						}
					},
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 4
						}
					},
					{
						breakpoint: 750,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
			$('.slider-for').slick({
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				infinite: true,
				asNavFor: '.slider-nav',
				fade: true
			});
			$('.slider-nav').slick({
				arrows: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				speed: 500,
				infinite: true,
				asNavFor: '.slider-for',
				focusOnSelect: true,
				prevArrow: '<button type="button" class="slick-prev"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.8,0L15,1.1L2.7,13.6L15,25.7L13.7,27L0,13.7L13.8,0z"/></svg></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M15,13.7L1.3,27L0,25.7l12.3-12.1L0,1.1L1.2,0L15,13.7z"/></svg></span></button>',
				responsive: [
					{
						breakpoint: 1280,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 5
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 3
						}
					}
				]
			});
			$('.c-blockquote').slick({
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				infinite: true
			});
		}
	})();

	//tabs
	(function(){
		$('.tab__nav').each(function(){
			var link = $(this).find('a'),
				linkItem = $(this).find('li'),
				index = link.data('href'),
				parent = $(this).parents('.tab__container'),
				tab_item = parent.find('.tab__item'),
				link_cont = parent.find('.link__cont'),
				slider = $('.sliders');

			link.on('click', function(){
				var this_ = $(this),
					index = this_.data('href');

				this_.parent().addClass('active').siblings().removeClass('active');
				tab_item.fadeOut(0).removeClass('visible');
				if(slider.length){
					parent.find("."+index).fadeIn(0).find('.sliders').slick('setPosition');
				} else {
					parent.find("."+index).fadeIn(0);
				}			
				setTimeout(function(){
					parent.find("."+index).addClass('visible');
				},10);
				return false;
			});
			linkItem.first().addClass('active');
			parent.find("."+index).show().addClass('visible');
		});
	})();

	//like btn
	(function(){
		var like = $('.wish');

		like.each(function (){
			var this_ = $(this);

			this_.on('click', function () {
				if($(this).hasClass('active')){
					$(this).removeClass('active');
				} else {
					$(this).addClass('active');
				}
				return false;
			});
		});
	})();

	//insta 
	(function(){
		var insta = $('.insta_img');

		insta.each(function(){
			var this_ = $(this),
				attr = this_.attr('id');

			var timeout;

			var feed = new Instafeed({
				clientId: '97ae5f4c024c4a91804f959f43f2635f',
				target: attr,
				get: 'tagged',
				tagName: 'photographyportfolio',
				links: true,
				limit: 6,
				sortBy: 'random',
				resolution: 'thumbnail',
				after: function(){
					timeout = setTimeout(function() {
						insta.addClass('load');
					},200);					
				},
				template: '<div class="photo-box"><div class="image-wrap"><a href="{{link}}" target="_blank"><img src="{{image}}"></a></div></div>'
			});
			feed.run();

			$('.reload').on('click', function () {
				insta.empty().removeClass('load');
				clearTimeout(timeout);
				feed.run();
			});
		});
	})();

	//validation
	(function(){
		var form_validate = $('.js-validate');
		if (form_validate.length) {
			form_validate.each(function () {
				var form_this = $(this);
				$.validate({
					form : form_this,
					validateOnBlur : true,
					borderColorOnError : false,
					scrollToTopOnError : false,
					modules : 'security',
					onSuccess : function() {
						var _ = form_this;
						if(_.find('.single_row').length){
							if(!_.find('.single_row').parents('.label__body').hasClass('has-success')){
									return false;
							}
						}
						if (form_this.hasClass('popups')) {
							$('.popup').removeClass('is-open');
							$('.success').addClass('is-open');
							$('.popup').find('form').trigger('reset');
							return false;
						}
						if (form_this.hasClass('distribution')) {
							form_this.parents('.subscription').find('.back').addClass('active').siblings().removeClass('active');
							return false;
						}						
					}
				});
			});
		}
	})();

	$("[type='submit']").on('click', function(){
		var _ = $(this).parents(".js-validate");
				select = _.find('.ms-parent.single_row');
		select.each(function(){
			var $this = $(this);
			detectedSelect($this);
		});
	});


	//multiplu select
	function MultiPlu(){
		var single_row = $('.single_row');

		if(single_row.length){
			single_row.each(function(){
				var  $this= $(this),
						pholder = $this.attr('placeholder');
				$this.multipleSelect({
					single: true,
					width: '100%',
					placeholder: '' + pholder + '',
					onClose: function(){
						$('.ms-choice').removeClass('is-active');
						if($('.ms-parent').hasClass('select_valid')){
							detectedCheck($('.ms-parent'));
						}
						detectedSelect($this.next());
					},
					// onClick: function(view){
					// 	//if($this.parents('#sort__panel').length) {
					// 			var t = $this.parents('#sort__panel').attr('action');
					// 			alert(t)
					// 	//}
					// }
				});
			});
		};
		function detectedCheck(item){
			if(item.find('input:checked').length ) {
				item.addClass('valid').removeClass('error');
			} else {
				item.addClass('error');
			}
		}
		function activeSel() {
			var parent = $('.single_row'),
				item = parent.find('> button'),
				li = parent.find('.ms-drop li');
			item.on('click', function () {
				var this_ = $(this),
					div = this_.find('> div');
				if (div.hasClass('open')) {
					$('.ms-choice').removeClass('is-active');
					div.parents('.ms-choice').addClass('is-active');
				}
				else {
					div.parents('.ms-choice').removeClass('is-active');
				}
			});
			li.on('click', function() {
				var parent = $(this).parents('.single_row');
				parent.find('.ms-choice').removeClass('is-active');
			});

		}
		activeSel();
	};
	MultiPlu();

	function detectedSelect(item) {
		console.log(item)
		if(item.find('li.selected').length) {
			item.find('.ms-choice').css('border-color', "#e2e2e2");
			item.find('.ms-drop').parents('.label__body').removeClass('has-error');
			item.find('.ms-drop').parents('.label__body').addClass('has-success');
		}else {
			item.find('.ms-choice').css('border-color', "#ff3030");
			item.find('.ms-drop').parents('.label__body').addClass('has-error').removeClass('has-success');
		}
	}

	//reload subscribe
	function reload(forms){
		forms.parents('.subscription').find('.back').addClass('active').siblings().removeClass('active');
	};

	//btn restore 
	(function(){
		var rest = $('.restore'),
			subsc = $('.subscription'),
			input = subsc.find('.input');

		input.focus(function(){
			subsc.addClass('active');
		});
		input.blur(function(){
			subsc.removeClass('active');
		});
		rest.on('click', function(){
			var this_ = $(this);

			this_.parents('.subscription').find('.front').addClass('active').siblings().removeClass('active');
			this_.parents('.subscription').find('.front .input').val('');
		});
	})();

	//mobile menu
	(function(){
		var burger = $('.burger__menu'),
				mobile = $('.mobile-nav'),
				mobileClose = $('.mobile-close'),
				overlay = $('html'),
				duration = 200;

		burger.on('click', function(){
			overlay.addClass('overlay');
			mobile.fadeIn({
				duration: duration,
				complete: function(){
					$(this).addClass('opened');
				}
			});
		});
		mobileClose.on('click', function(){
			if(!mobile.hasClass('opened')) return;
			overlay.removeClass('overlay');
			mobile.removeClass('opened')
						.delay(duration)
						.fadeOut({
							duration: duration
						});
		});
	})();

	//Sticky elements
	(function(){
		if($('.js-stock').length){
			//$('.js-stock').stick_in_parent({offset_top: 20});
		}
	})();

	//reset forms
	(function() {		 
		$('.reset_form').each(function(){
			var this_ = $(this),
					input = this_.find('.input'),
					reset = this_.find('.reset');

			input.on('input', function(){
				var value = $(this).val();
				if(value.length > 0) {
					reset.delay(100).fadeIn(150);
					input.addClass('active');
				} else {
					reset.fadeOut(100);
					input.removeClass('active');
				}
			});			
			reset.on('click', function(){
				input.val('');
				$(this).fadeOut(100);
				input.removeClass('active');
			});
		});
	})();

	//filter popover 
	(function(){
		var filter_btn = $('.filter__control-item'),
				checkboxs = $('.filter__emulate'),
				list = $('.filter__list.checks'),
				close = $('.filter-popover__close'),
				f_popup = $('.filter-popover'),
				checkboxsPopup = f_popup.find('.filter__list');
		
		filter_btn.on('click', function(event){
			var this_ = $(this),
					parent = this_.parents('.filter__facet'),
					popover = parent.find('.filter-popover');

				popover.toggleClass('visible');

				event.stopPropagation();
		});

		// Fake radio
    var fakeRadio      = $('.filter__btns label'),
        fakeRadioInput = fakeRadio.find('input'),
        parent = fakeRadio.parents('.filter__item'),
        reset = parent.find('.btn_reset');

    fakeRadioInput.each(function(){
    		var _ = $(this);
        if ($(this).is(':checked')) {
            $(this).attr('previousvalue', 'checked');
            parent.addClass('active');
        }

        $(this).on('click', function(){
            var previousValue = $(this).attr('previousvalue');

            parent.addClass('active');

            if (previousValue == 'checked') {
                $(this).prop('checked', false).attr('previousvalue', false);
            } else {
                $(this)
                    .prop('checked', true)
                    .attr('previousvalue', 'checked')
                    .parent().siblings()
                    .find('input:checked').click();
            }
        });
        reset.on('click', function(){
        	_.attr('previousvalue', 'false');
        	_.prop('checked', false);
        	parent.removeClass('active');
        });
    });

		f_popup.on('click', function(event){
			event.stopPropagation();
		});

		$(document).on('click', function(){
			$('.filter-popover').removeClass('visible');
		});

		close.on('click', function(){
			$('.filter-popover').removeClass('visible');
		});

		checkboxs.each(function(){
			var this_ = $(this),
					item = this_.find('.filter__checkbox-item'),
					btn_r =  this_.parents('.filter__fieldset').find('.btn_reset');

					initCheck(this_);

					if(item.hasAttr('data-id')){
						item.on('click', function(event){
							var $this = $(this),
									parent = this_.parents('.filter__facet'),
									val = $this.data('id');
					
							if($this.hasClass('active')){
									$this.removeClass('active')
									$this.parents('.filter__facet').find('.filter-popover').find('[data-id='+val+']').find('input').prop('checked', false);
									console.log(true)
								
								
							} else {
								$this.addClass('active')
								$this.parents('.filter__facet').find('.filter-popover').find('[data-id='+val+']').find('input').prop('checked', true);
								console.log(false)
							}

							initCheck(parent);
							event.stopPropagation();
						});
					}
					btn_r.on('click', function(){
						$(this).parents('.filter__item').removeClass('active');
						$(this).parents('.filter__item').find('.filter__checkbox-item').removeClass('active');
						$(this).parents('.filter__item').find('input:checked').prop('checked', false);
					});
		});
		checkboxsPopup.each(function(){
			var this_ = $(this),
					item = this_.find('.filter__checkbox-item');

					initCheck(this_);

					item.on('click', function(event){
						var $this = $(this),
								parent = this_.parents('.filter__facet'),
								val = $this.data('id');

						$this.toggleClass('active');

				
						if($this.find('input:checked').length){
							$this.parents('.filter__facet').find('.filter__emulate').find('[data-id='+val+']').addClass('active')//.find('input').prop('checked', false);
						} else {
							$this.parents('.filter__facet').find('.filter__emulate').find('[data-id='+val+']').removeClass('active')//.find('input').prop('checked', true);
						}

						initCheck(parent);
						event.stopPropagation();
					});
		});

		list.each(function(){
			var this_ = $(this),
					item = this_.find('.filter__checkbox-item'),
					btn_r =  this_.parents('.filter__fieldset').find('.btn_reset');

					initCheck(this_);

					item.on('click', function(event){
						var $this = $(this),
								parent = this_.parents('.filter__facet');

								$this.toggleClass('active');

								initCheck(parent); 
					});

					btn_r.on('click', function(){
						$(this).parents('.filter__item').removeClass('active');
						$(this).parents('.filter__item').find('.filter__checkbox-item').removeClass('active');
						$(this).parents('.filter__item').find('input:checked').prop('checked', false);
					});
		});

		function initCheck(list){
			if(list.find(".active").length > 0 || list.find("input:checked").length > 0) {
					list.parents('.filter__item').addClass('active');
					if(list.find("input:checked")) {
						list.find("input:checked").each(function(){
							var val = $(this).parent().data('id');
							checkboxs.find('[data-id='+val+']').addClass('active')
						});
					}
				} else {
					list.parents('.filter__item').removeClass('active');
				}
		}
	})();

	//price slider
	(function(){
			var ui_slider = $(".ui-slider");
			if(ui_slider.length){
				ui_slider.each(function(){
					var slider = $(this).find(".js-ui-slider-main"),
							inputFrom = $(this).find(".js-ui-slider-from"),
							inputFromHidden = $(this).find(".js-input-from-hidden"),
							inputTo = $(this).find(".js-ui-slider-to"),
							inputToHidden = $(this).find(".js-input-to-hidden"),
							maxVal = +slider.attr("data-max"),
							minVal = +slider.attr("data-min"),
							valFrom = inputFromHidden.val(),
							valTo = inputToHidden.val(),
							stepVal = +slider.attr("data-step"),
							reset = $(this).parents('.filter__item').find('.btn_reset'),
							parent = slider.parents('.filter__item');

						if (valFrom!=minVal) {
							inputFrom.val(valFrom);
						}
						if (valTo!=maxVal) {
							inputTo.val(valTo);
						}

						if(valTo != '' || valFrom != '') {
							parent.addClass('active');
						}

						if (!valFrom) {
							var valFrom = minVal;
						};
						if (!valTo) {
							var valTo = maxVal;
						};

						slider.slider({
							range: true,
							min: minVal,
							max: maxVal,
							step: 1,
							values: [ valFrom, valTo ],
							stop: function( event, ui ) {
								inputFrom.val(ui.values[0]);
								inputFromHidden.val(ui.values[0]);
								inputTo.val(ui.values[1]);
								inputToHidden.val(ui.values[1]);
							},
							slide: function( event, ui ) {
								inputFrom.val(ui.values[0]);
								inputFromHidden.val(ui.values[0]);
								inputTo.val(ui.values[1]);
								inputToHidden.val(ui.values[1]);
								if (inputFrom.val() === minVal || inputTo.val() === maxVal) {
									parent.addClass('active');
								}
							}
						});

						//inputFrom.val(slider.slider( "values", 0 ));
						//inputTo.val(slider.slider( "values", 1 ));


						inputFrom.on('change', function(){
							var val1 = $(this).val(),
									val2 = inputFromHidden.val(val1),
									valmin = inputFromHidden.val(),
									valmax = inputToHidden.val();
							if(val1 < valmin) {
								val1 = valmin
								$(this).val(valmin);
								$('.js-input-from-hidden').val(valmin);
							}
							if (parseInt(val1) > parseInt(valmax)) {
								val1 = valmax;
								inputFromHidden.val(val1);
								$(this).val(val1);
							}

							slider.slider('values',0 , val1);

							if (inputFrom.val() != '' ) {
								parent.addClass('active');
							}	else {
								parent.removeClass('active');
							}
						});

						inputTo.on('change', function(){
							var val1 = $(this).val(),
									val2 = inputToHidden.val(val1),
									valmin = inputFromHidden.val(),
									valmax = slider.attr('data-max');
							if(parseInt(val1) > parseInt(valmax)) {
								val1 = valmax;
								$(this).val(valmax);

								$('.js-input-to-hidden').val(valmax);
							};
							if(parseInt(val1) < parseInt(valmin) ) {
								val1 = valmin;
								inputToHidden.val(val1);
								$(this).val(valmin);
							};
							if (inputTo.val() != '' ) {
								parent.addClass('active');
							}	else {
								parent.removeClass('active');
							};
							slider.slider('values',1 , val1);
						});
				
					reset.on("click",function(){
						var slider = parent.find(".js-ui-slider-main"),
								maxVal = slider.attr("data-max"),
								minVal = slider.attr("data-min");
						slider.slider( "values", [ minVal, maxVal ] );
						parent.find(".js-input-from-hidden").val(minVal);
						parent.find(".js-input-to-hidden").val(maxVal);
						parent.find(".js-ui-slider-from").val('');
						parent.find(".js-ui-slider-to").val('');
						parent.removeClass('active');
						return false;
					});
				});
			};
	})();

	//spinner
	(function() {
		var number = $('.spinner');
		number.each(function(){
			var max_number = +($(this).attr('data-max-number'));
			var input = $(this).find('input');
			var plus = $(this).find('.spinner__plus');
			var minus = $(this).find('.spinner__minus');
			plus.on('click', function(){
				var val = +(input.val());
				if (val >= max_number) {
					return false;
				}
				else {
					val += 1;
					input.val(val);
				}
				input.trigger('change');
			});
			minus.on('click', function(){
				var val = +(input.val());
				if (val > 1) {
					val -= 1;
					input.val(val);
				}
				else {
					input.val('1');
					return false;
				}
				input.trigger('change');
			});
		});
	})();

	//spinner count
	$('.js-price').each(function() {
		var this_ = $(this);
			this_.find('.spinner__input').on('change', function() {
				$(this).parents('.js-price').find('.result').text($(this).val()*$(this).parents('.js-price').find('.result').data('price'));
				$('.js-price-text').map(function() {
					$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
				});
			});
	});
	$('.js-price-text').each(function(){
		$(this).map(function() {
			$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
		});
	});
	//prices
	function prices() {
		$(window).ready(function() {
			$('.js-price').each(function() {
				var val = $(this).find('.spinner__input').val();
				$(this).find('.result').text(val*$(this).find('.result').data('price'));
			});

			$('.js-price-text').map(function() {
				$(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
			});
		});
	};
	prices();

	//fake loader
	var i;
	function Loaders(){
		if(!$('.card__list').hasClass('initial')){
			var i = 10;
			$('.show_box').show();
			$('.card__list .card_item').slice(10).hide();
				$('.show-more').on('click',function() {				
					$('.card__list .card_item:not(:visible)').slice(0, i).fadeIn(function(){
						if($('.card__list .card_item:not(:visible)').length === 0) {
							$('.show_box').hide();
						}
					});					
				return false;
			});
			$('.card__list').addClass('initial');
			$('.card__list').addClass('init');
			
		} else {
			$('.card__list').addClass('init');
			return
		}
	};

	function DeLoaders(){
			$('.card__list .card_item').show({
				complete: function(){
					$(this).removeAttr('style');
				}
			});
			$('.show_box').hide();
			$('.card__list').removeClass('init');
			i = 1;
	}

	$(window).on('resize', function(){
		if($(window).innerWidth() && $(window).innerWidth() < 1023) {
			if($('.card__list .card_item:not(:visible)').length || $('.card__list').hasClass('init')) {
				return
			}
			$('.show_box').show();
			$('.card__list .card_item').slice(10).hide();
			Loaders();
		} else {
			DeLoaders();
		}
	});
	$(window).on('load', function(){
		if($(window).innerWidth() && $(window).innerWidth() < 1023) {
			Loaders()
		} else {
			DeLoaders();
		}
	});

	// Filter mobile
	(function(){

		var head = $('.mobile-filter .filter__row'),
				reset_ = $('.mobile-filter .btn_reset'),
				init = $('.mobile_filter'),
				close = $('.mobile-filter_close');

		init.on('click', function(){
			$('.mobile-filter').fadeIn(300);
			$('html').addClass('overlay');
		});

		close.on('click', function(){
			$('.mobile-filter').fadeOut(300);
			$('html').removeClass('overlay');
		});

		head.each(function(){
			var this_ = $(this),
					item = this_.find('.row__header');

			item.on('click', function(){
				var _ = $(this),
					parent = _.parent(),
					blockThis = parent.find('.row__header-container'),
					accord = $('.filter__row'),
					block = accord.find('.row__header-container');

					
					if (!parent.hasClass('active')) {
						accord.removeClass('active');
						block.slideUp(500);
						parent.addClass('active');
						blockThis.slideDown(500);
					}
					else {
						parent.removeClass('active');
						blockThis.slideUp(500);
					}
			});
			reset_.on('click', function(){
				$('#mobile-filter').trigger('reset');

			});
		});
	})();

	(function(){
		var num = $('.number');

		num.each(function(){
			var input = $(this);
			input[0].onkeypress = function(e) {
					e = e || event;
					if (e.ctrlKey || e.altKey || e.metaKey) return;
					var chr = getChar(e);
					if (chr == null) return;
					if (chr < '0' || chr > '9') {
						return false;
					}
				};
		});

		function getChar(event) {
			if (event.which == null) {
				if (event.keyCode < 32) return null;
				return String.fromCharCode(event.keyCode); // IE
			}
			if (event.which != 0 && event.charCode != 0) {
				if (event.which < 32) return null;
				return String.fromCharCode(event.which);
			}
			return null;
		};

	})();


	//custom select
	function selectable(){
		var select = $('.c_select');

		select.each(function(){
			var _ = $(this),
					cButton = _.find('.c_select-button'),
					CPlaceholder = cButton.data('placeholder'),
					cList = _.find('.c_select-list'),
					cItem = cList.find('label'),
					duration = 300,
					values;

			cButton.text(CPlaceholder);

			$(_).on('click', function(event){
				event.stopPropagation();
			});

			$(document).on('click', function(){
				cList.fadeOut(duration);
			});

			cButton.on('click', function(){
				cList.stop(true, true).fadeToggle(duration);
			});

			cItem.on('click', function(){
				$(this).parent().addClass('selected').siblings().removeClass('selected');
				values = $(this).find('input').next().text();
				cButton.text(values);
				cList.fadeOut(duration);
				cButton.parents('.c_select').addClass('valid').removeClass('error-valid');
			});

			if(cItem.find('input:checked').length != 0) {
				var _ = cItem.find('input:checked');
				_.parents("li").addClass('selected').siblings().removeClass('selected')
				values = _.next().text();
				cButton.text(values);
				cButton.parents('.c_select').addClass('valid').removeClass('error-valid');
			}
		});

	};
	selectable();

	//add basket inner
	(function(){
		var bk = $('.js-bk-add');

		bk.each(function(){
			var _ = $(this),
					select = _.parents('.js-price').find('.c_select');

			_.on('click', function(){
				if(!select.hasClass('valid')){
					select.addClass('error-valid');
					return false
				}
			});
		});

	})();

	$('[data-popup]').each(function() {
      var $this = $(this);
      $this.on('click', function(e) {
      	if($(".c_select").hasClass('error-valid')){
      		return
      	}
      	if($this.data('popup') === 'enter' || $this.data('popup') === 'reg' || $this.data('popup') === 'return') {
      		if($(".popup__wrap").hasClass('is-visible')) {
      			$('.popup__wrap').removeClass('is-visible').delay(500).fadeOut(500);
      		}
      	}
      	Popup($this.data('popup'));
				return false;
      });
  });

	function Popup(options){
		var popupSelector = $('.' + options),
				innerSelector = popupSelector.find('.popup'),
				duration = 500,
				close = popupSelector.find('.popup__close'),
				html = $('html');

		popupSelector
			.fadeIn({
				duration: duration,
				start: function(){
					if($('.slider_simple').length) {
						$('.slider_simple').slick('setPosition');
					}
					html.addClass('overlay');
				},
				complete: function(){
					$(this).addClass('is-visible');					
				}
			});

		innerSelector.on('click', function(event){
			event.stopPropagation();
		});

		close.add($('.popup .close, .popup__wrap')).on('click', function(){
			if(!popupSelector.hasClass('is-visible')) return;

			if($('.error').hasClass('is-open')) {
				$('.error').removeClass('is-open');
				$('.popup:first-child').addClass('is-open');
				return false;
			}

			popupSelector
				.removeClass("is-visible")
				.delay(duration)
				.fadeOut({
					duration: duration,
					complete: function(){
						html.removeClass('overlay');
						//$('.error').removeClass('is-open');
						$('.success').removeClass('is-open');
						$('.popup:first-child').addClass('is-open');
					}
				});
			return false;
		});
	};



	//menu toggle show/hide

	(function(){
			$('.menu__tab').each(function(){
				var _ = $(this),
						hiddenCont = _.find('.hidden__container');
						btnHideCont = '<div class="brands__toggle hide">Скрыть</div>',
						btnShowCont = '<div class="brands__toggle show">Все бренды</div>';

				if(hiddenCont.length){
					hiddenCont.find(".menu__drop:last-of-type").append(btnHideCont);
					_.find('.visible').first().find(".menu__drop:last-of-type").append(btnShowCont);
				}


				var	btnHide = _.find('.brands__toggle.hide'),
						btnShow = _.find('.brands__toggle.show');

				btnShow.on('click', function(){
					hiddenCont.toggle("slide");
					$(this).hide();
				});
				btnHide.on('click', function(){
					hiddenCont.toggle("slide");
					btnShow.show();
				});

			});
		
	})();

	//scroll content
	(function(){
		if($('#container').length){
			var scrollContainer = document.getElementById('container');
			Ps.initialize(scrollContainer, {
				wheelSpeed: 0.1,
				wheelPropagation: true,
				minScrollbarLength: 20
			});
			$(window).on('resize', function(){
				Ps.update(scrollContainer);
			});
		}
	})();

	//custom select delivery
	function customSelect(){
		var parent = $('.delivery__selects'),
				menu = parent.find('.menu'),
				list = menu.find('.menu__list'),
				tab_delivery = parent.find('.tab_delivery'),
				tab_item = tab_delivery.find('.tab_delivery-item'),
				box = parent.find('.info__box'),
				check_list = parent.find('.check__list'),
				hints = parent.find('.hint__item');

		$(document).on('click', function(){
			menu.removeClass('active');
			list.fadeOut(150);
		});

		list.find('li').first().find('input').prop('checked', true);
		tab_item.first().show();
		hints.first().show()

		menu.each(function(){
			var this_ = $(this),
					item = this_.find('.menu__item'),
					list = this_.find('.menu__list'),
					label = this_.find('label'),
					check = label.prev();

			item.on('click', function(event){
				this_.toggleClass('active');
				list.fadeToggle(300);
				event.stopPropagation();
			});

			label.on('click', function(){
				var this_= $(this),
					text = this_.text(),
					data = this_.data('tab'),
					parent = this_.parents('.field'),
					hint = this_.parents('.menu').find('.container__hint');

				menu.removeClass('active');
				list.fadeOut(150);
				item.text(text);
				parent.find('.'+data).fadeIn(150).siblings().hide();
				hint.find('.'+data).fadeIn(150).siblings().hide();
			});

			if(list.find('input:checked').length){
				var checkIs = list.find('input:checked');
						text = checkIs.parent().text();
				item.text(text);
			}

		});

	};
	customSelect();

	//data picker
	(function(){
		var picker = $('.datepicker');

		picker.each(function(){
			var _ = $(this);

			_.on('click', function(){
				$(this).parent().addClass('open');
			});

			_.datepicker({
				minDate: "0",
				beforeShowDay: $.datepicker.noWeekends,
				onSelect: function(){
					//alert()
				},
				onClose: function(){
					$(this).parent().removeClass('open');
				}
			});
			_.datepicker( "setDate" , "0");
			_.datepicker( "option", "dateFormat", "DD, d MM");
		});
	})();
 
	function catalogAjax() {
		var $catalog = $('#card__list');
		var $sortPanel = $('#sort__panel');

		$sortPanel.on('change', 'input', function() {
			var curHref = $sortPanel.attr('action');
			var newHref = curHref + (curHref.split('?')[1] ? '&':'?') + $sortPanel.serialize();
			alert(newHref);

		})

		function catalogAjaxGo(href) {
			var data = {'FLEX_AJAX' : 'Y', 'FLEX_FORM' : 'catalog'};
			$.ajax({
				url: href,
				data: data,
				type: 'get',
				dataType: 'html',
				success: function(otvet) {
					$catalog.html(otvet);
					$(window).stop().animate({'scrollTop' : 0});
					try {
						history.pushState(null, null, href);
					return;
					} catch(e) {}
						location.hash = '#' + href;
					}
			})
		}	
	}
	$(catalogAjax);

	if ($('#maps').length) {
		ymaps.ready(init);
	}

	function init() {
		var coord = [53.916352, 27.579602];
		var myMap = new ymaps.Map('maps', {
				center: [53.916352, 27.579602],
				zoom: 16,
				controls: []
			}),
			Placemark = new ymaps.Placemark([53.916352, 27.579602], {
				balloonContentHeader: "Балун метки",
				balloonContentBody: "Содержимое <em>балуна</em> метки",
			}, {
				iconLayout: 'default#image',
				iconImageHref: 'img/icons/pin.png',
				iconImageSize: [35, 47],
				iconImageOffset: [-18, -47]
			});
			myMap.geoObjects.add(Placemark);
			myMap.behaviors.disable('scrollZoom');
		};		

})