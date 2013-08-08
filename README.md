backgroundPlugin
================

jQuery background plugin - create fancy background with only one line of code

Why backgroundPlugin?
---------------------

You can quickly attach a mosaic background to every container on your page and animate it! 

How does it work?
-----------------

Simply attach backgroundPluginStyles.css and backgroundPlugin.js to your page and add this line:

`$( document ).ready( function() {
    $( 'element' ).backgroundPlugin();
});`

That's it!

Want more?
----------

There are several options you can set:

* colorPalette      - specify the colour pallete that you want to use for background color 
* elementSize       - set element size
* margin            - set space between elements
* animate  	  	    - do you want to animate your background?
* animationType	    - there are two animations available (untill now). Just choose the animation's number (0, or 1);
* fullWindow        - set true, if you want to adjust width and height of the background to window dimensions
* blockInterval     - time to wait before next element animation
* animateInterval   - how long should the animation last?
