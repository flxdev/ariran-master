$(function(){
	if (!window.Modernizr.touchevents) {
		homeParallax.init('.js-parallax');
	}
})
// Parallax
var homeParallax = {
	is_firefox: navigator.userAgent.toLowerCase().indexOf('firefox/') > -1,
	init: function(parallaxImage) {
		var t = this;
		t.$win = $(window);
		t.$doc = $(document);
		t.lastScrollY = window.pageYOffset;
		t.$root = $(parallaxImage);
		t.blockOffset = $(parallaxImage).offset();

		t.$root.each(function(){
			t.append($(this));
		});

		var timeoutResize = 0;

		t.$win.on('resize', function () {
			clearTimeout(timeoutResize);
			timeoutResize = setTimeout(function () {
				for(var i = 0; i < t.parallaxImages.length; i++){
					t.updateVars(t.parallaxImages[i]);
					t.updatePosition(t.parallaxImages[i]);
				}
			}, 20);
		});

		t.$win.on('scroll mousewheel DOMMouseScroll', function () {
			t.lastScrollY = this.pageYOffset;
			window.requestAnimationFrame(t.scrollHandler.bind(t));
		}).trigger('scroll mousewheel DOMMouseScroll');

		t.$win.on('load', function(){
			t.parallaxImages.forEach(function(item) {
				t.updateVars(item);
			});
		});

		$('html').addClass('inited');
	},
	scrollHandler: function(){
		var t = this;

		for(var i = 0; i < t.parallaxImages.length; i++){
			t.updatePosition(t.parallaxImages[i], i);
		}
	},
	parallaxImages: [],
	append:function($item){
		var t = this;
		var parallaxImage = {};
		parallaxImage.element = $item;
		parallaxImage.speedFactor = parallaxImage.element.data('sp') || .3;
		parallaxImage.parent = parallaxImage.element.parent();
		parallaxImage.type = parallaxImage.element.data('type');
		parallaxImage.translate = parallaxImage.element.data('translate');
		parallaxImage.translateKoff = getRandomInt(6,9)/10;
		parallaxImage.scale = parallaxImage.element.data('scale');
		parallaxImage.dir = parallaxImage.element.data('dir') || 1;

		function getRandomInt(min, max){
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		this.parallaxImages.push(parallaxImage);
		this.updateVars(parallaxImage);
	},
	updateVars: function(item) {
		item.height = item.parent.height();
		item.element.css('height', item.height);
		item.top = item.parent.offset().top;
	},
	updatePosition: function(parallaxImage, index) {
		var t = this;

		if(parallaxImage.top <= t.lastScrollY + t.$win[0].innerHeight) {
			var pos = (parallaxImage.top - t.lastScrollY) * parallaxImage.speedFactor;
			var horizontalPos = -parallaxImage.dir * ((parallaxImage.top - t.lastScrollY) * 0.7);

			var scaleStr = '', translateStr = '';
			var originX = horizontalPos;

			if (!parallaxImage.element.hasClass('bottom')) {
				originX = t.$win.width() + horizontalPos;
			};

			if (parallaxImage.scale) {
				var scale = 1;
				if ((t.lastScrollY - parallaxImage.top) > 0) {
					scale = Math.abs((parallaxImage.top - t.lastScrollY)/1000) + 1;
					if (scale > parallaxImage.scale) {
						scale = parallaxImage.scale;
					}
				}
			};

			if (parallaxImage.type == 'text') horizontalPos = 0;

			// if (parallaxImage.rotate) {
			// 	var rotate = parseInt(t.lastScrollY/8, 10) * parallaxImage.translateKoff;

			// 	if (parallaxImage.element.hasClass('left'))
			// 		rotateStr = 'rotate(' + rotate +'deg) ';
			// 	else
			// 		rotateStr = 'rotate(-'+ rotate +'deg) ';
			// };

			if (parallaxImage.translate) {
				var translate = parseInt(t.lastScrollY/8, 10) * parallaxImage.translateKoff;

				if (parallaxImage.element.hasClass('bottom'))
					translateStr = 'translate3d(0px , ' + translate + 'px, 0px)';
				else
					translateStr = 'translate3d(0px , -' + translate + 'px, 0px)';
			};

			parallaxImage.element.css(
				{
					'opacity': '1',
					'transform': translateStr,
					'transform-origin': originX+'px ' + pos + 'px 0px'
				}
			);
		}
	}
};