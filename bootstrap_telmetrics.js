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
    
    function doit() {
        console.log("insdie doit method");
        // var dashEl = $('<div id="zw-dashboard-global-instantiation"></div>');
        // $('body').append(dashEl);
        // return;
        // var d = new Date();
        
        // swap in telmetrics logo
        // http://www.telmetrics.com/skin/images/telmetrics-logo.svg
        /*
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAABqCAYAAACVikx+AAAAAXNSR…Q0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAodAwb8P2k9lfWtzrwYAAAAAElFTkSuQmCC);
        background-position: left 0px !important;
        background-size: contain;
        */
        // $('#zw-menubar-wrapper .zw-menu-item-wrapper .zw-z-button button').css('background-image', 'url("https://i2dcui.appspot.com/geturl?url=http://www.telmetrics.com/skin/images/telmetrics-logo.svg")');
        $('#zw-menubar-wrapper .zw-menu-item-wrapper .zw-z-button button')
            .css('background-image', 'url(data:image/png;base64,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)')
            .css('background-position', 'left 0px !important')
            .css('background-size', 'contain');
        /*
        chilipeppr.load(
            "#zw-dashboard-global-instantiation",
            "https://raw.githubusercontent.com/chilipeppr/claure/master/auto-generated-widget.html", //"?time=" + d.getTime(),
            function() {
                console.log("We are done instantiating the Claure Widget");
                // return;
                // alert("done loading claure widget but not initted");
                cprequire(["inline:com-chilipeppr-widget-claure"], function(dashboard) {
                    console.log("Running " + dashboard.id);

                    dashboard.init({ mode: 'sprint' }, function() {
                        console.log("Done loading Claure Widget. dashboard:", dashboard);
                    });

                });

            });
            */
    }
    //alert("inside first part of body");

    console.log("Loading require.js");
    //load("http://www.chilipeppr.com/js/require.js");
    //load("//i2dcui.appspot.com/js/ssl_require.js");
    // //i2dcui.appspot.com/js/require.js
    load("//i2dcui.appspot.com/js/require.js");

    // do 3 attempts at 10ms, 100ms, 1000ms
    setTimeout(function() {
        // alert("Loading Claure Widget");
        console.log("Loading Telmetrics Override. 1st try.");
        if (typeof(cprequire) === 'undefined') {
            console.log("Loading Telmetrics Override. 2nd try.");
            setTimeout(function() {
                if (typeof(cprequire) === 'undefined') {
                    console.log("Loading Telmetrics Override. 3rd try.");
                    setTimeout(function() {
                        cprequire(["chilipeppr_ready"], function() {
                            console.log("Seeing if Chilipeppr is globally defined...");
                            console.log(chilipeppr);
                            // do the actual load logic
                            doit();
                        });
                    }, 1000);
                } else {
                    cprequire(["chilipeppr_ready"], function() {
                        console.log("Seeing if Chilipeppr is globally defined...");
                        console.log(chilipeppr);
                        // do the actual load logic
                        doit();
                    });
                }
            }, 100);
        } else {
            cprequire(["chilipeppr_ready"], function() {
                console.log("Seeing if Chilipeppr is globally defined...");
                console.log(chilipeppr);
                // do the actual load logic
                doit();
            });
        }
    }, 10);

})();
