// This is a bootstrap file for the Claure Call Center Add-On Widget
(function() {
    
    // alert("hi");
    
    function load(script) {
        //document.write('<'+'script src="'+script+'" type="text/javascript"><' + '/script>');
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", script);
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    
    //alert("inside first part of body");

    console.log("Loading require.js");
    //load("http://www.chilipeppr.com/js/require.js");
    //load("//i2dcui.appspot.com/js/ssl_require.js");
    // //i2dcui.appspot.com/js/require.js
    load("//i2dcui.appspot.com/js/require.js");

    setTimeout(function() {
        // alert("Loading Claure Widget");
        console.log("Loading Claure Settings Widget");
        cprequire(["chilipeppr_ready"], function() {
            // alert("inside of cprequire callback");
            console.log("Seeing if Chilipeppr is globally defined...");
            console.log(chilipeppr);
            var dashEl = $('<div id="zw-dashboard-global-instantiation"></div>');
            $('body').append(dashEl);
            // return;
            var d = new Date();
            chilipeppr.load(
                "#zw-dashboard-global-instantiation",
                "https://raw.githubusercontent.com/chilipeppr/claure/master/auto-generated-widget.html", //"?time=" + d.getTime(),
                function() {
                    console.log("We are done instantiating the Claure Widget");
                    // return;
                    // alert("done loading claure widget but not initted");
                    cprequire(["inline:com-chilipeppr-widget-claure"], function(dashboard) {
                        console.log("Running " + dashboard.id);

                        dashboard.init(function() {
                            console.log("Done loading Claure Widget. dashboard:", dashboard);
                        });

                    });

                });
        });
    }, 1000);

})();
