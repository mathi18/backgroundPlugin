/*
 * name		: backgroundPlugin 
 * version	: 1.0
 * author	: Mateusz Kleinert 
 * 
 */
(function($) {

    $.fn.backgroundPlugin = function( options ) {

    	var intervalId = null;
    	
        var settings = $.extend({
        	colorPalette  : ['#B3B3B3', '#666666', '#878787', '#B8B8B8', '#D4D4D4', '#EDEDED', '#ffffff'],
            elementSize   	: 10,
            margin        	: 6,
            animate  	  	: false,
            animationType	: 0,
            fullWindow    	: true,
            blockInterval 	: 200,
            animateInterval : 500
        }, options);

        var animate = function() {
        	
        	var $elements = $('div.backgroundElement');
        	var $element = $($elements.get(Math.floor((Math.random()*($elements.size())))));
        	
        	var pickedColor = settings.colorPalette[Math.floor((Math.random()*(settings.colorPalette.length)))];
        	
        	if(settings.animatioType == 0) {
	        	var originalX = parseInt($element.css('left'));
	        	var originalY = parseInt($element.css('top'));
	        	
	        	$element.animate({'width' : settings.elementSize + Math.round(settings.margin/2) + 'px',
	        					  'height' : settings.elementSize + Math.round(settings.margin/2) + 'px',
	        					  'top' : originalY - 1 + 'px',
	        					  'left' : originalX - 1 + 'px'}, settings.animateInterval, 'swing', function() {
	        		$element.css('background-color', pickedColor);
	        		$element.animate({'width' : settings.elementSize + 'px',
	        						  'height' : settings.elementSize + 'px',
	        						  'top' : originalY + 1 + 'px',
	        						  'left' : originalX + 1 + 'px'}, settings.animateInterval, 'swing');
	        	});
        	} else if(settings.animationType == 1) {
        		var speed = 'slow';
        		
        		if(settings.animateInterval <= 500) {
        			speed = 'fast';
        		}
        		
        		$element.fadeOut(speed, function() {
        			$element.css('background-color', pickedColor);
        			$element.fadeIn(speed);
        		});
        	}
        };
        
        function init($parent) {
        	$parent.find('.backgroundElement').each(function() {
        		$(this).remove();
        	});
        	console.log($parent);
        	
        	var parentWidth = settings.fullWindow === true ? $( window ).width() : $parent.width();
        	var parentHeight = settings.fullWindow === true ? $( window ).height() : $parent.height();
        	
        	var offsetW = Math.round((parentWidth - ((parentWidth/(settings.elementSize + settings.margin))-1)*(settings.elementSize + settings.margin))/2);
        	var offsetH = Math.round((parentHeight - ((parentHeight/(settings.elementSize + settings.margin))-1)*(settings.elementSize + settings.margin))/2);
        	
        	var numElementsX = Math.round((parentWidth/(settings.elementSize + settings.margin))-1);
        	var numElementsY = Math.round((parentHeight/(settings.elementSize + settings.margin))-1);

        	for(var i = 0; i < numElementsY; i++) {
        		for(var j = 0; j < numElementsX; j++) {
        			var $element = $('<div>');
        			$element.addClass('backgroundElement');
        			
        			var pickedColor = settings.colorPalette[Math.floor((Math.random()*(settings.colorPalette.length)))];
        			
        			$element.css({'top' : i*(settings.elementSize + settings.margin) + offsetH + 'px', 
        						  'left' : j*(settings.elementSize + settings.margin) + offsetW + 'px',
        						  'backgroundColor' : pickedColor,
        						  'width' : settings.elementSize + 'px',
        						  'height' : settings.elementSize + 'px'});
        			
        			$parent.append($element);
        		}
        	}
        	
        	if(settings.animate == true) {
        		intervalId = setInterval( function() {
        			animate();
        		}, settings.blockInterval);
        	}
        }
        
        return $(this).each( function() {

        	var $parent = $(this);
        	init($parent);
        	
        	$( window ).resize( function() {
        		console.log('resize');
        		
        		if(settings.animate == true && intervalId !== null) {
        			clearInterval(intervalId);
            	}
        		
        		init($parent);
        	});
        	
        });

    };

}(jQuery));