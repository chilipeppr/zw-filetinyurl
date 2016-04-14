/* global requirejs cprequire cpdefine chilipeppr THREE */
// Defining the globals above helps Cloud9 not show warnings for those variables

// ChiliPeppr Widget/Element Javascript

requirejs.config({
    /*
    Dependencies can be defined here. ChiliPeppr uses require.js so
    please refer to http://requirejs.org/docs/api.html for info.
    
    Most widgets will not need to define Javascript dependencies.
    
    Make sure all URLs are https and http accessible. Try to use URLs
    that start with // rather than http:// or https:// so they simply
    use whatever method the main page uses.
    
    Also, please make sure you are not loading dependencies from different
    URLs that other widgets may already load like jquery, bootstrap,
    three.js, etc.
    
    You may slingshot content through ChiliPeppr's proxy URL if you desire
    to enable SSL for non-SSL URL's. ChiliPeppr's SSL URL is
    https://i2dcui.appspot.com which is the SSL equivalent for
    http://chilipeppr.com
    */
    paths: {
        // Example of how to define the key (you make up the key) and the URL
        // Make sure you DO NOT put the .js at the end of the URL
        // SmoothieCharts: '//smoothiecharts.org/smoothie',
    },
    shim: {
        // See require.js docs for how to define dependencies that
        // should be loaded before your script/widget.
    }
});

cprequire_test(["inline:com-chilipeppr-widget-claure"], function(myWidget) {

    // Test this element. This code is auto-removed by the chilipeppr.load()
    // when using this widget in production. So use the cpquire_test to do things
    // you only want to have happen during testing, like loading other widgets or
    // doing unit tests. Don't remove end_test at the end or auto-remove will fail.

    // Please note that if you are working on multiple widgets at the same time
    // you may need to use the ?forcerefresh=true technique in the URL of
    // your test widget to force the underlying chilipeppr.load() statements
    // to referesh the cache. For example, if you are working on an Add-On
    // widget to the Eagle BRD widget, but also working on the Eagle BRD widget
    // at the same time you will have to make ample use of this technique to
    // get changes to load correctly. If you keep wondering why you're not seeing
    // your changes, try ?forcerefresh=true as a get parameter in your URL.

    console.log("test running of " + myWidget.id);

    $('body').prepend('<div id="testDivForFlashMessageWidget"></div>');

    chilipeppr.load(
        "#testDivForFlashMessageWidget",
        "http://fiddle.jshell.net/chilipeppr/90698kax/show/light/",
        function() {
            console.log("mycallback got called after loading flash msg module");
            cprequire(["inline:com-chilipeppr-elem-flashmsg"], function(fm) {
                //console.log("inside require of " + fm.id);
                fm.init();
            });
        }
    );

    // init my widget
    myWidget.init();
    $('#' + myWidget.id).css('margin', '20px');
    $('title').html(myWidget.name);

} /*end_test*/ );

// This is the main definition of your widget. Give it a unique name.
cpdefine("inline:com-chilipeppr-widget-claure", ["chilipeppr_ready", /* other dependencies here */ ], function() {
    return {
        /**
         * The ID of the widget. You must define this and make it unique.
         */
        id: "com-chilipeppr-widget-claure", // Make the id the same as the cpdefine id
        name: "Widget / claure", // The descriptive name of your widget.
        desc: "This example widget gives you a framework for creating your own widget. Please change this description once you fork this claure and create your own widget. Make sure to run runme.js every time you are done editing your code so you can regenerate your README.md file, regenerate your auto-generated-widget.html, and automatically push your changes to Github.", // A description of what your widget does
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        /**
         * Define pubsub signals below. These are basically ChiliPeppr's event system.
         * ChiliPeppr uses amplify.js's pubsub system so please refer to docs at
         * http://amplifyjs.com/api/pubsub/
         */
        /**
         * Define the publish signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        publish: {
            // Define a key:value pair here as strings to document what signals you publish.
            '/onExampleGenerate': 'Example: Publish this signal when we go to generate gcode.'
        },
        /**
         * Define the subscribe signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        subscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // so other widgets can publish to this widget to have it do something.
            // '/onExampleConsume': 'Example: This widget subscribe to this signal so other widgets can send to us and we'll do something with it.'
        },
        /**
         * Document the foreign publish signals, i.e. signals owned by other widgets
         * or elements, that this widget/element publishes to.
         */
        foreignPublish: {
            // Define a key:value pair here as strings to document what signals you publish to
            // that are owned by foreign/other widgets.
            // '/jsonSend': 'Example: We send Gcode to the serial port widget to do stuff with the CNC controller.'
        },
        /**
         * Document the foreign subscribe signals, i.e. signals owned by other widgets
         * or elements, that this widget/element subscribes to.
         */
        foreignSubscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // that are owned by foreign/other widgets.
            // '/com-chilipeppr-elem-dragdrop/ondropped': 'Example: We subscribe to this signal at a higher priority to intercept the signal. We do not let it propagate by returning false.'
        },
        /**
         * All widgets should have an init method. It should be run by the
         * instantiating code like a workspace or a different widget.
         */
        init: function() {
            console.log("I am being initted. Thanks.");

            this.setupCreditCardSocialSecCodeMonitoring();
            
            // this.setupUiFromLocalStorage();
            // this.btnSetup();
            // this.forkSetup();

            console.log("I am done being initted.");
        },
        observer: null,
        setupCreditCardSocialSecCodeMonitoring: function() {
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

            this.observer = new MutationObserver(this.onObserver.bind(this));
            
            // define what element should be observed by the observer
            // and what types of mutations trigger the callback
            this.observer.observe(document, {
              subtree: true,
              attributes: true,
              childList: true
            });
            
            // test portion
            setTimeout(function() {
                $('#com-chilipeppr-widget-claure-tab1').append("<div>modifying dom to see if we get event</div>");
            }, 4000);
            setTimeout(function() {
                $('#com-chilipeppr-widget-claure-tab1').append("<p>1234123412341234</p>");
                $('#com-chilipeppr-widget-claure-tab1').append("<span>1234 1234 1234 1234</span>");
            }, 5000);
        },
        onObserver: function(mutations, observer) {
            // fired when a mutation occurs
            console.log("Got onObserver. mutations:", mutations, "observer:", observer);
            for (var i = 0; i < mutations.length; i++) {
                var mutRec = mutations[i];
                 // now loop thru added nodes
                 if ('addedNodes' in mutRec) {
                     for (var i2 = 0; i2 < mutRec.addedNodes.length; i2++) {
                         var addedNode = mutRec.addedNodes[i2];
                         console.log("addedNode:", addedNode);
                         this.detectCreditCardOnNode(addedNode);
                     }
                 }
                 
            }
            
        },
        detectCreditCardOnNode: function(node) {
            
            if (node == null) return;
            
            var isDidWeDetect = false;
            var txt;
            
            // create jquery version of node
            var el = $(node);
            console.log("el:", el);
            
            txt = el.text();
            //if ('nodeValue' in node) txt = node.nodeValue;
            //else txt = node;
            
            if (txt == null) {
                console.log("txt is null, so returning.");
                return;
            }
            
            // look for formats
            // 1234123412341234
            // 1234 1234 1234 1234
            // 1234-1234-1234-1234
            console.log("starting detectCreditCard with txt:", txt);

            if (txt.match(/(\d{16,16})/)) { 
                
                // we found a credit card
                isDidWeDetect = true;
                var cc = RegExp.$1;
                var cclast4 = cc.substring(12, 16);
                var newHtml = el.html().replace(/\d{16,16}/, "************" + cclast4);
                el.html(newHtml);
                
            } else if (txt.match(/\d{4}[\s\-]\d{4}[\s\-]\d{4}[\s\-]\d{4}/)) {
                
            } 
            console.log("ending detectCreditCard with txt:", txt);
            return txt;
        },
        /**
         * The methods below were taken from the Dashboard made for Telerx but has good utility functions.
         * We will likely eventually just remove all of these methods.
         */
        isInitted: false,
        dashboardCard: null,
        sessionkey: null,
        dashboardInit: function (options) {

            if (options && 'sessionkey' in options && options.sessionkey.length > 0) {
                console.log("a sessionkey was passed in, so set the dashboard to use this key instead of looking across the global javascript for the Zw object and the current user. sessionkey:", options.sessionkey);
                this.sessionkey = options.sessionkey;
            } else if (typeof Zw !== 'undefined' && Zw.Application) {
                // Use current Zipwhip context to get sessionkey
                this.sessionkey = Zw.Application.getCurrentContext().initialConfig.account.session;
                console.log("Found Zipwhip context and using sessionkey from it. this.sessionkey:", this.sessionkey);
                // set it from the Zipwhip object
            }
            
            if (this.isInitted) {
                console.log("we are already initted, exiting init");
                return;
            }
            
            var that = this;
            this.loadDashboardCard(function() {
                console.log("done loading Dashboard Card");
                
                that.setupCards();
                that.setupOnResize();
                that.setupQuery();
                
                
                if (options.callback) options.callback();
            });
            
            this.setupHeader();
            this.setupAddAcctDialog();
            
            this.onResize();

            //this.setupWindowUrl();
            this.setupPushHistory();
            
            this.isInitted = true;

            console.log(this.name + " done loading.");
        },
        setupWindowUrl: function() {

            var that = this;            
            setTimeout(function() {
                console.log("setupWindowUrl");
                
                // see if we're in test-trunk
                //if (window.location.href.match(/test-trunk/)) {
                //    url += "&url=http://test-trunk.zipwhip.com/?carrier=d2c-landline";
                //} else 
                if (window.location.href.match(/fiddle/)) {
                    // we are in jsfiddle, so ignore
                    console.log("setupWindowUrl: we are in jsfiddle environment, so ignore");
                    return;
                } else {
                    
                }
                
                var url = window.location.href;
                // get rid of forcerefresh
                url = url.replace("?forcerefresh=true", "");
                // remove trailing slash
                url = url.replace(/\/$/, "");
                // turn it into a deeplink
                var deeplinkurl = that.getDeeplink(that.sessionkey);
                deeplinkurl = url + deeplinkurl;
                console.log("setupWindowUrl: we are rewriting browser url to:", deeplinkurl);
                //window.history.replaceState('Zipwhip App', 'Zipwhip Landline Texting', deeplinkurl);
                window.history.pushState('Zipwhip App', 'Zipwhip Landline Texting', deeplinkurl);
            }, 3000);
           
        },
        setupPushHistory: function() {
            $( window ).unload(this.addPushHistory.bind(this));
        },
        addPushHistory: function() {

            var that = this;            
            //setTimeout(function() {
                console.log("setupWindowUrl");
                
                // see if we're in test-trunk
                //if (window.location.href.match(/test-trunk/)) {
                //    url += "&url=http://test-trunk.zipwhip.com/?carrier=d2c-landline";
                //} else 
                if (window.location.href.match(/fiddle/)) {
                    // we are in jsfiddle, so ignore
                    console.log("setupWindowUrl: we are in jsfiddle environment, so ignore");
                    return;
                } else {
                    
                }
                
                var url = window.location.href;
                // get rid of forcerefresh
                url = url.replace("?forcerefresh=true", "");
                // remove trailing slash
                url = url.replace(/\/$/, "");
                // turn it into a deeplink
                var deeplinkurl = that.getDeeplink(that.sessionkey);
                deeplinkurl = url + deeplinkurl;
                console.log("setupWindowUrl: we are rewriting browser url to:", deeplinkurl);
                //window.history.replaceState('Zipwhip App', 'Zipwhip Landline Texting', deeplinkurl);
                window.history.pushState('Zipwhip App', 'Zipwhip Landline Texting', deeplinkurl);
            //}, 3000);
           
        },
        setupHeader: function() {
            $('.zw-dashboard-hdr-menu').click(this.onClickHdrMenu.bind(this));
            //$('.zw-dashboard-hdr-menu').click(this.onClickHdrMenu);
            var dd = $('.zw-dashboard-menu-dropdown-hdr');
            
            var that = this;
            dd.find('.dd-addacct').click(function(evt) {
                that.onHideHdrMenu();
                that.onOpenAddAcct(evt);
            });
            dd.find('.dd-removeall').click(this.onRemoveAll.bind(this));
        },
        onClickHdrMenu: function(evt) {

            var that = this;
            var dd = $('.zw-dashboard-menu-dropdown-hdr');
            
            // move dd to end of body
            dd.detach();
            $('body').append(dd);
            
            var offset = $(evt.target).offset();
            console.log("offset:", offset);
            dd.css('top', (offset.top + 16) + "px");
            dd.css('left', (offset.left - 137) + "px");

            dd.removeClass("hidden");
            
            // add a full object abs position overlay to grab click
            // events off of menu
            var ddOverlay = $('<div class="zw-dropdown-overlay" style="position:absolute;top:0;bottom:0;left:0;right:0;background-color:silver;opacity:0.5;"></div>');
            ddOverlay.click(function() {
                console.log("overlay got clicked. remove menu and self");
                //$('.zw-dropdown-overlay').remove();
                //$('.zw-dashboard-menu-dropdown-hdr').addClass("hidden");
                that.onHideHdrMenu();
            });
            $('.zw-dashboard').append(ddOverlay);
        },
        onHideHdrMenu: function() {
            $('.zw-dropdown-overlay').remove();
            $('.zw-dashboard-menu-dropdown-hdr').addClass("hidden");
        },
        setupAddAcctDialog: function() {
            
            // bind to + sign in header to get the dialog to open
            $('.zw-dashboard-addbtn').click(this.onOpenAddAcct.bind(this));
            
            // if they want to close dialog
            $('.zw-dashboard-addaccount .zw-dashboard-closebtn').click(this.onCloseAddAcct.bind(this));
            
            // when they click add btn, i.e. submit, inside dialog box
            var addBtn = $('.zw-dashboard-addacct-addbtn');
            addBtn.click(this.onAddAcctDlgClickAdd.bind(this));

            // if they click advanced
            $('.zw-dashboard-addacct-advbtn').click(this.onAddAcctDlgClickAdvanced.bind(this));
            
            // auto grab sessionkey when tabbing/clicking out of login form
            //$('.zw-dashboard-addacct-login-phone').blur(this.onAddAcctDlgBlurLogin.bind(this));
            //$('.zw-dashboard-addacct-login-pass').blur(this.onAddAcctDlgBlurLogin.bind(this));
            
            var skeyEl = $('.zw-dashboard-addacct-login-sessionkey');
            //skeyEl.blur(this.onAddAcctDlgBlurFocusSessionkey.bind(this));
            //skeyEl.focus(this.onAddAcctDlgBlurFocusSessionkey.bind(this));
            //skeyEl.keydown(this.onAddAcctDlgBlurFocusSessionkey.bind(this));
            skeyEl.keyup(this.onAddAcctDlgBlurFocusSessionkey.bind(this));
            var that = this;
            skeyEl.bind('copy cut paste', function() {
                setTimeout(that.onAddAcctDlgBlurFocusSessionkey, 100);
            });
        },
        onAddAcctDlgBlurLogin: function(evt) {
            console.log("got blur on login form. evt:", evt);
            
            var phone = $('.zw-dashboard-addacct-login-phone').val();
            var pass = $('.zw-dashboard-addacct-login-pass').val();
            
            if (phone != null && phone.length > 0 && pass != null && pass.length > 0) {
                // we have enough data to attempt
                console.log("we seem to have phone and pass. phone:", phone, "pass:", pass);
                this.onAddAcctDlgAttemptLogin(phone, pass, function(info) {
                    console.log("got callback from attempt to login: info:", info);
                    
                    var errEl = $('.zw-dashboard-addacct-login-msg');
                    
                    if (info.success == false) {
                        // failed to login
                        errEl.text(info.msg);
                        errEl.addClass("errmsg");
                        errEl.removeClass("hidden");
                        errEl.addClass("zwfadein");
                        setTimeout(function() {
                            errEl.removeClass("zwfadein");
                        }, 450);
                        
                    } else {
                        errEl.text("Phone number and password were valid.");
                        errEl.removeClass("errmsg");
                        errEl.removeClass("hidden");
                        errEl.addClass("zwfadein");
                        setTimeout(function() {
                            errEl.removeClass("zwfadein");
                        }, 450);
                    }
                });
                
            } else {
                console.log("not enough login data to attempt login");
            }
        },
        onAddAcctDlgBlurFocusSessionkey: function(evt) {
            console.log("got blur/focus on sessionkey field. evt:", evt);
            // if there is content in this field then dim out the login box
            var skEl = $('.zw-dashboard-addacct-login-sessionkey');
            var skTxt = skEl.val();
            var sectionEl = $('.zw-dashboard-addacct-loginsection');
            var phoneEl = $('.zw-dashboard-addacct-login-phone');
            var passEl = $('.zw-dashboard-addacct-login-pass');
            
            if (skTxt && skTxt.length > 0) {
                if (!sectionEl.hasClass("zwhalffade")) {
                    // there is a sessionkey, dim out
                    console.log("will dim out login section");
                    sectionEl.addClass("zwhalffade");
                    sectionEl.children().each(function(i) {
                        $(this).addClass("zwfadeouthalf");
                    });
                    
                    setTimeout(function() {
                        sectionEl.children().each(function(i) {
                            $(this).addClass("zwdimout");
                        });
                        phoneEl.prop('disabled', true);
                        passEl.prop('disabled', true);
                    }, 450);
                    
                } else {
                    console.log("we should dim out login section, but already...");
                }
            } else {
                // show the login section if it is not showing
                if (sectionEl.hasClass("zwhalffade")) {
                    console.log("we will fade in the login section");
                    sectionEl.removeClass("zwhalffade");
                    sectionEl.children().each(function(i) {
                        $(this).removeClass("zwfadeouthalf");
                        $(this).removeClass("zwdimout");
                        
                        $(this).addClass("zwfadein");
                    });
                    phoneEl.prop('disabled', false);
                    passEl.prop('disabled', false);
                    
                } else {
                    console.log("we would have faded login section in, but already...");
                }
            }
        },
        onAddAcctDlgAttemptLogin: function(phone, pass, callback) {
            console.log("attemping login with phone:", phone, "pass:", pass);
            
            var url = "//api.zipwhip.com/user/login?username=" + phone + "&password=" + pass
            
            console.log("about to do ajax request to url:", url);
            
            $.ajax({
                url: url,
                //type: "POST",
                context: this,
            }).done(function(data) {
                console.log("got back info from user get. data:", data);
            
                if (callback) callback(data);
            }).fail(function(data) {
                console.log("got back error from user get. data:", data.statusCode(), data);
            
                if (callback) callback({success:false, msg:"There was a problem logging in. Please check your phone number or password."});
            });
        },
        // This method is the Submit on the form for the Add Account Dialog window
        onAddAcctDlgClickAdd: function(evt) {
            console.log("got add click evt:", evt);
            
            var that = this;
            
            var sk = $('.zw-dashboard-addacct-login-sessionkey').val();
            var phone = $('.zw-dashboard-addacct-login-phone').val();
            var pass = $('.zw-dashboard-addacct-login-pass').val();
            var isLocal = $('.zw-dashboard-addaccount #show-when-browser').is(":checked");
            
            var errEl = $('.zw-dashboard-addacct-addbtn-msg');

            if (sk != null && sk.length > 0) {
                console.log("they are in sessionkey mode. sessionkey:", sk);
                
                // need to get phone number for this sessionkey
                this.userGet(sk, function(info) {
                
                    if (info.success == false) {
                        that.setAddAcctDlgErr("Error getting account for sessionkey.");
                        
                    } else {
                        that.setAddAcctDlgMsg("Session key was valid for phone " + info.user.mobileNumber + ".");
                        //$('.zw-dashboard-addacct-login-sessionkey').val(info.response);
                        var sessionkey = sk;
                        var phone = info.user.mobileNumber;
                        
                        // see if they want local (browser) or remote (linked) storage of sessionkey
                        if (isLocal) {
                            that.addSessionkeyToLocalStorage(phone, sessionkey);
                        } else {
                            that.addSessionkeyToRemoteStorage(phone, sessionkey);
                        }
                        
                        // now add this new sessionkey to the dashboard card list
                        that.createCard(sessionkey, isLocal);
                        
                        // close the add account window
                        that.onCloseAddAcct();
                        
                        // might as well immediately check for unread texts
                        setTimeout(that.queryAllKeys.bind(that), 500);
                        
                    }
                    
                });
                
            } else {
                
                // they are in standard phone/pass mode
                console.log("in phone/password mode");
                
                if (phone == null || phone.length == 0) {
                    this.setAddAcctDlgErr("You did not provide a phone number.");
                } else if (pass == null || pass.length < 1) {
                    this.setAddAcctDlgErr("You did not provide a password.");
                } else {
                    // we have enough data to attempt
                    console.log("we seem to have phone and pass. phone:", phone, "pass:", pass);
                    this.onAddAcctDlgAttemptLogin(phone, pass, function(info) {
                        console.log("got callback from attempt to login: info:", info);
                        
                        if (info.success == false) {
                            that.setAddAcctDlgErr(info.msg);
                            
                        } else {
                            that.setAddAcctDlgMsg("Phone number and password were valid.");
                            //$('.zw-dashboard-addacct-login-sessionkey').val(info.response);
                            var sessionkey = info.response;
                            
                            // see if they want local (browser) or remote (linked) storage of sessionkey
                            if (isLocal) {
                                that.addSessionkeyToLocalStorage(phone, sessionkey);
                            } else {
                                that.addSessionkeyToRemoteStorage(phone, sessionkey);
                            }
                            
                            // now add this new sessionkey to the dashboard card list
                            that.createCard(sessionkey, isLocal);
                            
                            // close the add account window
                            that.onCloseAddAcct();
                            
                            // might as well immediately check for unread texts
                            setTimeout(that.queryAllKeys.bind(that), 500);

                        }
                    });
                    
                }
            }
            
        },
        userGet: function(sessionkey, callback) {
            // Get phone number from sessionkey
            var url = "//i2dcui.appspot.com/zipwhip?url=http://api.zipwhip.com/user/get?session=" + sessionkey;
            //var url = "http://api.zipwhip.com/user/get?session=" + sessionkey;
            $.ajax({
                url: url,
                context: this,
            }).done(function(response) {
                //console.log("got back info from user get. response:", response);
                
                var data = null;
                
                if (response !== null && typeof response === 'object') {
                    console.log("data came back as native parsed data. cool.");
                    data = response;
                } else if (response.match(/^{/)) {
                    data = $.parseJSON(response);
                    console.log("data came back as txt but looks like json. so parse. data:", data);
                }
                
                if (data && 'success' in data && data.success && 'response' in data && 'user' in data.response && 'mobileNumber' in data.response.user) {
                    if (callback) callback(data.response);
                }
            });
        },
        addSessionkeyToLocalStorage: function(phone, sessionkey) {
            console.log("We are being asked to add a sessionkey to localstorage so that every time this browser is used the sessionkey is loaded in the dashboard. sessionkey:", sessionkey);
            
            // see if there is already a key/value
            var settings = localStorage.getItem('zw-dashboard-settings');
            var newsettings = {};
            if (settings && settings.length >0 && settings.match(/^{/)) {
                newsettings = $.parseJSON(settings);
                console.log("looks like we have existing valid settings:", settings);
                
            } else {
                console.log("no settings yet. creating.");
                newsettings = {
                    sessionkeys: {}
                }
            }
            
            newsettings.sessionkeys[phone] = sessionkey;
            var settingsJson = JSON.stringify(newsettings);
            console.log("about to set new zw-dashboard-settings:", settingsJson, newsettings);
            localStorage.setItem('zw-dashboard-settings', settingsJson);

        },
        removeSessionkeyFromLocalStorage: function(sessionkey) {
            console.log("We are being asked to remove a sessionkey from localstorage. sessionkey:", sessionkey);
            
            // see if there is already a key/value
            var settings = localStorage.getItem('zw-dashboard-settings');
            var newsettings = {};
            var sessionkeys2 = {};
            
            if (settings && settings.length > 0 && settings.match(/^{/)) {
                newsettings = $.parseJSON(settings);
                console.log("looks like we have existing valid settings:", settings);
                
                // loop thru settings to find sessionkey and then remove
                for (var ph in newsettings.sessionkeys) {
                    var item = newsettings.sessionkeys[ph];
                    
                    if (item == sessionkey) {
                        // we found an item, remove it
                        console.log("we found the sessionkey, so just not adding it to new hash");
                    } else {
                        console.log("this sessionkey did not match, so adding to new hash");
                        sessionkeys2[ph] = item;
                    }
                }
                
            } else {
                console.error("no settings yet. that makes no sense. we should never get here.");
                return;
            }
            
            newsettings.sessionkeys = sessionkeys2;
            var settingsJson = JSON.stringify(newsettings);
            console.log("about to set new zw-dashboard-settings:", settingsJson, newsettings);
            localStorage.setItem('zw-dashboard-settings', settingsJson);
            
        },
        onRemoveAll: function() {
            // remove all sessionkeys
        },
        setAddAcctDlgErr: function(errtxt) {
            var errEl = $('.zw-dashboard-addacct-addbtn-msg');
            errEl.text(errtxt);
            errEl.addClass("errmsg");
            errEl.removeClass("hidden");
            errEl.addClass("zwfadein");
            setTimeout(function() {
                errEl.removeClass("zwfadein");
            }, 450);
        },
        setAddAcctDlgMsg: function(txt) {
            var errEl = $('.zw-dashboard-addacct-addbtn-msg');
            errEl.text(txt);
            errEl.removeClass("errmsg");
            errEl.removeClass("hidden");
            errEl.addClass("zwfadein");
            setTimeout(function() {
                errEl.removeClass("zwfadein");
            }, 450);
        },
        onAddAcctDlgClickAdvanced: function(evt) {
            console.log("got onClickAdvanced. evt:", evt);
            
            var dlg = $('.zw-dashboard-addaccount');
            var adv = dlg.find('.zw-dashboard-addaccount-advanced');
            if (adv.hasClass("hidden")) {
                // it's hidden, so show it
                adv.removeClass("hidden");
            } else {
                // hide it
                adv.addClass("hidden");
            }
        },
        onOpenAddAcct: function(evt) {
            console.log("user wants to open Add Account Dialog. evt:", evt);
            $('.zw-dashboard-addaccount').addClass("zwfadein");
            $('.zw-dashboard-addaccount').removeClass("hidden zwfadeout");
        },
        onCloseAddAcct: function(evt) {
            console.log("user wants to close Add Account Dialog. evt:", evt);
            $('.zw-dashboard-addaccount').removeClass("zwfadein");
            $('.zw-dashboard-addaccount').addClass("zwfadeout");
            setTimeout(function() {
                $('.zw-dashboard-addaccount').addClass("hidden");
            }, 450);
        },
        resizeTimeout: null,
        setupOnResize: function() {
            //var that = this;
            $( window ).resize(this.onResize.bind(this));
        },
        lastWidth: null,
        lastHeight: null,
        onResize: function(evt) {
            
            console.log("got onresize. evt:", evt);
            
            var that = this;
            
            // see if there's a current timeout running, if so, cancel it
            if (that.resizeTimeout) {
                console.log("there was a resize timeout. cancelling it.");
                clearTimeout(that.resizeTimeout);
            }
            
            // now resize with a delay to ensure we are the last guy resizing anything
            that.resizeTimeout = setTimeout(function() {
                console.log("resizing the main zipwhip app to make room for Dashboard");
                var zwMenuEl = $('#zw-menubar-wrapper');
                var zwDesktopEl = $('#zw-desktop-wrapper');
                //var curWidth = zwMenuEl.css("width");
                var curWidth = zwMenuEl.width();
                
                // double check that if curWidth comes back as zero to give up
                if (curWidth == 0) {
                    console.log("getting a curwidth of 0, which makes no sense, so not resizing");
                    return;
                }
                
                var newWidth = (curWidth - 300); // + "px";
                var newWidthPx = newWidth + "px";

                // we need to see if the width has even changed. if it has, then we
                // actually resize. if it hasn't we don't do a darn thing.
                if (that.lastWidth == curWidth) {
                    console.log("no width has changed, so not touching menubar but am resizing body. lastWidth:", that.lastWidth, "curWidth:", curWidth);
                    newWidth += 300;
                    newWidthPx = newWidth + "px";
                    console.log("curWidth:", curWidth, "newWidth:", newWidth, "newWidthPx:", newWidthPx);
                    
                    zwDesktopEl.css({ width:newWidthPx});
                    
                } else {
                    console.log("width has changed, so resizing menubar and body. lastWidth:", that.lastWidth, "curWidth:", curWidth);
                
                    that.lastWidth = newWidth;
                    console.log("curWidth:", curWidth, "newWidth:", newWidth, "newWidthPx:", newWidthPx);
                    //debugger;
                    zwMenuEl.css({ width:newWidthPx});
                    zwDesktopEl.css({ width:newWidthPx});
                }
                
            }, 1000);
            
            
            // now, also check if there is a scrollbar in the dashboard area to decide
            // what layout to do for the unread counter in the title area
            setTimeout(function() {
                that.formatGlobalUnreadCtr();
            }, 2500);
            
        },
        formatGlobalUnreadCtr: function() {
            // now, also check if there is a scrollbar in the dashboard area to decide
            // what layout to do for the unread counter in the title area
            if (this.isScrollbarInBody()) {
                console.log("we have a scrollbar. we're good cuz default css assumes that.");
                $('.zw-dashboard-title .zw-convcard-unread').removeClass("noscrollbar");
            } else {
                console.log("adding extra css to reduce indent in title for unread ctr");
                $('.zw-dashboard-title .zw-convcard-unread').addClass("noscrollbar");
            }
        },
        isScrollbarInBody: function() {
            // nudge the scrollbar away from its starting position
            $('.zw-dashboard-body-wrap').scrollTop(1);
            
            // A value of 0 is assigned if the scrollbars are at their default position, 
            // or are abscent
            if ($('.zw-dashboard-body-wrap').scrollTop() !== 0) return true;
            
            // put the scrollbar back to its starting position
            $('.zw-dashboard-body-wrap').scrollTop(0);
            
            return false;
        },
        
        setSettingsWithCallback: function(settings, sessionkey, callback) {
            
            var settingsStr = "";
            if (typeof settings == 'object') settingsStr = JSON.stringify(settings);
            else settingsStr = settings;
            var url = "//api.zipwhip.com/app/install?appId=5301&settings=" + settingsStr + "&alterOnExists=true&session=" + sessionkey;
            
            var that = this;
            
            $.ajax({
                url: url,
                type: "POST",
                context: this,
            }).done(function(data) {
                console.log("got back info from setting app install. data:", data);
                
                if (callback) callback(sessionkey, data);   
            });
        },
        addSessionkeyToRemoteStorage: function(phone, sessionkey2) {
            console.log("We are being asked to add a sessionkey to remote storage so that every time this account is used the sessionkey is loaded in the dashboard. sessionkey2:", sessionkey2);
            
            var that = this;
            
            // see if there is already a key/value
            this.getSettingsFromRemoteStorage(
                
                // make sure this is the current logged in sessionkey (NOT the sessionkey we're linking)
                this.sessionkey, 
                                 
                // on success
                function(skey, settings) {
                    console.log("remote settings currently exist, so need to extend/override. settings:", settings);
                    settings.sessionkeys[phone] = sessionkey2;
                    that.setSettingsWithCallback(settings, that.sessionkey, function(data) {
                        console.log("result from writing settings. data:", data);
                    });
                },
                
                // on fail
                function(skey) {
                    console.log("no remote settings on this account, so starting from scratch");
                    var settings = {
                        sessionkeys: {}
                    }
                    settings.sessionkeys[phone] = sessionkey2;
                    that.setSettingsWithCallback(settings, that.sessionkey, function(data) {
                        console.log("result from writing settings. data:", data);
                    });
                }
            );

        },
        removeSessionkeyFromRemoteStorage: function(phoneToRemove) { //, sessionkeyToRemove) {
            
            console.log("removeSessionkeyFromRemoteStorage: We are being asked to remove a sessionkey from remote storage. phoneToRemove:", phoneToRemove);
            
            var that = this;
            
            // see if there is already a key/value
            this.getSettingsFromRemoteStorage(
                
                // make sure this is the current logged in sessionkey (NOT the sessionkey we're linking)
                this.sessionkey, 
                                 
                // on success
                function(skey, settings) {
                    console.log("removeSessionkeyFromRemoteStorage: remote settings currently exist, so need to extend/override. settings:", settings);
                    delete settings.sessionkeys[phoneToRemove]; // = sessionkeyToRemove;
                    that.setSettingsWithCallback(settings, that.sessionkey, function(data) {
                        console.log("removeSessionkeyFromRemoteStorage: result from writing settings. data:", data);
                    });
                },
                
                // on fail
                function(skey) {
                    console.log("removeSessionkeyFromRemoteStorage: no remote settings on this account, so starting from scratch, which really means just exit cuz nothing to delete. this should never happen btw???");
                }
            );
            
        },
        getSettingsFromRemoteStorage: function(sessionkey, callback, nosettingscallback) {
            
            //var url = "http://chilipeppr.com/zipwhip?url=http://api.zipwhip.com/app/list?appId=5301&session=" + sessionkey;
            var url = "//api.zipwhip.com/app/list?appId=5301&session=" + sessionkey;
            
            console.log("about to do ajax request to url:", url);
            
            $.ajax({
                url: url,
                //type: "POST",
                context: this,
            }).done(function(data) {
                console.log("got back info from app install. data:", data);
                
                var isGotSettings = false;
                if (data.response && data.response.apps) {
                    // we need to loop thru to find appId 5301 which is the settings app
                    for (var indx in data.response.apps) {
                        var app = data.response.apps[indx];
                        if (app.appId && app.appId == 5301) {
                            //$(".zw-appsettings-val").val(JSON.stringify(app.settings, null, "  "));
                            isGotSettings = true;
                            if (callback) callback(sessionkey, app.settings);
                        }
                    }
                    
                }
                
                if (isGotSettings == false) {
                    console.log("we got no settings back for this user.");
                    if (nosettingscallback) nosettingscallback(sessionkey);
                }
                
            });
        },
        cards: [], // array of { sessionkey: "", phone: "", response: "" },
        setupCards: function() {
            this.setupCardsViaRemoteStorage();
            this.setupCardsViaLocalStorage();
        },
        setupCardsViaLocalStorage: function() {
            // Look at the localstorage and see if any sessionkeys are sitting
            // in there for us to load
            // see if there is already a key/value
            var settings = localStorage.getItem('zw-dashboard-settings');
            var newsettings = {};
            if (settings && settings.length >0 && settings.match(/^{/)) {
                newsettings = $.parseJSON(settings);
                console.log("looks like we have existing valid settings:", settings);
                
            } else {
                console.log("no settings yet. ignore. returning.");
                return;
            }
            
            // create a card for each one
            for (var phone in newsettings.sessionkeys) {
                var skey = newsettings.sessionkeys[phone];
                console.log("creating browser-setting based dashcard for phone:", phone, "sessionkey:", skey);
                this.createCard(skey, true);                
            }
            
        },
        formatPhone: function(phone, sessionkey, callback) {
            var cleanphone = phone.replace(/\D/g, "");
            var re = /(\d\d\d)(\d\d\d)(.*)/;
            re.exec(cleanphone);
            var fmt = "(" + RegExp.$1 + ") " + RegExp.$2 + "-" + RegExp.$3;
            if (callback) callback(fmt);
        },
        createCard: function(skey, isLocal) {
            console.log("generating Dashboard Card for sessionkey:", skey);
            var that = this;
            var dashcard = this.dashboardCard;
            dashcard.create(
                skey,
                function(dEl, sessionkey, phone, response) {
                    console.log("got a dashboard card for a sessionkey. dEl:", dEl);
                    $(".zw-dashboard .zw-dashboard-body").append(dEl);
                    
                    // store record of this Dashboard Card
                    // now load this into our global this.cards array
                    var obj = {
                        sessionkey: sessionkey,
                        phone: phone,
                        data: response,
                        isLocal: isLocal,
                        el: dEl
                    };
                    that.cards[sessionkey] = obj;
                    
                    // setup deeplink
                    that.setupDeeplink(sessionkey);
                    
                    // setup deeplinks on-the-fly when mouseover occurs
                    // this is to solve timing problems where the name/number
                    // get set asynchronously and we need the <a href> to be placed
                    // at the last step
                    that.setupDeeplinkOnMouseover(obj);

                    // setup menu
                    var menu = obj.el.find('.zw-contactcard-menu');
                    menu.click(that.onClickDashCardMenu.bind(that));
                    
                    // if local, add little dot to indicate local
                    if (isLocal) {
                        var dotEl = $('<div class="zw-dashboard-localindicator"></div>');
                        obj.el.find('.zw-convcard').append(dotEl);
                        
                    }
                    
                                        
                    console.log("Just created record of this Dashboard Card. obj:", obj);
                });
        
        },
        onClickDashCardMenu: function(evt) {
            console.log("menu got clicked. evt:", evt);
            
            var that = this;
            
            // figure out what dashcard it's for
            var dashCardEl = $(evt.target).parents('.zw-dashboardcard');
            var sessionkey = dashCardEl.attr('data-sessionkey');
            
            // get item from this.cards[]
            var card = this.cards[sessionkey];
            
            var isLocal = card.isLocal;
            
            console.log("sessionkey:", sessionkey, "card:", card, "dashCardEl:", dashCardEl);
            
            // add a full object abs position overlay to grab click
            // events off of menu
            var ddOverlay = $('<div class="zw-dropdown-overlay" style="position:absolute;top:0;bottom:0;left:0;right:0;background-color:silver;opacity:0.2;"></div>');
            ddOverlay.click(function() {
                console.log("overlay got clicked. remove menu and self");
                that.onHideDashCardMenu();
            });
            $('.zw-dashboard').append(ddOverlay);
            
            // create menu off of claure that comes for free
            // from the contact card object
            var dd = $('.zw-contactcard-menu-dropdown-template').clone();
            dd.removeClass('zw-contactcard-menu-dropdown-template');
            dd.addClass('zw-contact-menu-dropdown-instantiated');
            
            // setup list items
            dd.find('.zw-contactcard-menu-dropdown-items').empty();
            var menuTxt = "Remove (Linked)";
            if (isLocal) menuTxt = "Remove";
            var menuItem = $('<div class="zw-contactcard-menu-dropdown-item">' + menuTxt + '</div>');
            menuItem.click(function(evt) {
                console.log("delete this item. sessionkey:", sessionkey);
                if (isLocal) {
                    that.removeSessionkeyFromLocalStorage(sessionkey);
                    dashCardEl.remove();
                    delete that.cards[sessionkey];
                } else {
                    // this is a remote item we need to delete
                    var obj = that.cards[sessionkey];
                    console.log("removing a linked (remote) card. obj:", obj);
                    that.removeSessionkeyFromRemoteStorage(obj.phone);
                    obj.el.remove();
                    delete that.cards[sessionkey];
                    //console.warn("todo. not implemented yet");
                }
                that.onHideDashCardMenu();
            });
            dd.find('.zw-contactcard-menu-dropdown-items').append(menuItem);
            
            var offset = $(evt.target).offset();
            console.log("offset:", offset);
            dd.css('top', (offset.top + 16) + "px");
            dd.css('left', (offset.left - 137) + "px");
            
            dd.removeClass('hidden');
            //$('.zw-dashboard').append(dd);
            $('body').append(dd);
                
        },
        onHideDashCardMenu: function() {
            $('.zw-dropdown-overlay').remove();
            $('.zw-contact-menu-dropdown-instantiated').remove();
        },
        setupCardsViaRemoteStorage: function() {
            
            var dashcard = this.dashboardCard;
            
            // create empty array to be filled when we get
            // settings back from this account
            var sessionkeys = [];

            var currentSessionkey = null;
            if (typeof Zw !== 'undefined' && Zw.Application) {
                // Use current Zipwhip context to get sessionkey
                currentSessionkey = Zw.Application.getCurrentContext().initialConfig.account.session;
                console.log("Found Zipwhip context and using sessionkey from it. currentSessionkey:", currentSessionkey);
            } else if (this.sessionkey && this.sessionkey.length > 0) {
                // Use hard-coded
                currentSessionkey = this.sessionkey;
                
            } else {
                console.warn("no sessionkey passed in");
                var el = $('.zw-dashboard-body-noload');
                el.removeClass("hidden");
                
                //var el = $('<p>No Zipwhip context or sessionkey given to authenticate with.</p>');
                //$(".zw-dashboard .zw-dashboard-body").append(el);
            }
            
            var that = this;
            
            if (currentSessionkey == null) {
                console.log("could not figure out current sessionkey. exiting.");
                return;
            }
            
            this.getSettingsFromRemoteStorage(
                currentSessionkey, 
                
                // callback for success
                function(k, settings) {
                    console.log("Got remote storage settings back for k:", k, "settings:", settings);
                    
                    sessionkeys = settings.sessionkeys;
                    
                    console.log("sessionkeys:", JSON.stringify({sessionkeys: sessionkeys}, null, "  "));
                    
                    // loop thru sessionkeys and make a Dashboard Card for each
                    for (var indx in sessionkeys) {
                        var key = sessionkeys[indx];
                        console.log("generating Dashboard Card for sessionkey:", key);
                        
                        that.createCard(key, false);
                        
                        
                    }
                    
                    setTimeout(function() {
                        console.log("Done creating all Dashboard Cards. cards:", that.cards);
                        that.queryAllKeys();
                    }, 5000);
                    
                },
            
                // callback for failure to get any settings (maybe user never
                // added any or set anything up yet)
                function(sessionkey) {
                    console.log("did not seem to get settings from app id. maybe localStorage settings?");
                }
                
            );
            
        },
        setupDeeplink: function(sessionkey) {
            if (this.disableDeeplinks) {
                console.log("being asked to setup deeplink, but disabled.");
                return;
            }
            
            console.log("just setup deeplink for sessionkey:", sessionkey);
            var obj = this.cards[sessionkey];
            obj.el.find('.zw-contactcard-mainarea').click(sessionkey, this.onDeeplinkClick.bind(this));
            
            // also wrap an anchor around image
            var url = this.getDeeplink(sessionkey);
            url = "//landline.zipwhip.com" + url;
            obj.el.find('.zw-contactcard-face').wrap('<a href="' + url + '" />');
            
        },
        setupDeeplinkOnMouseover: function(obj) {
            
            // attach a mouseover event
            obj.el.find('.zw-contactcard-mainarea').mouseover(obj, this.onMouseoverDeeplink.bind(this));
            
        },
        onMouseoverDeeplink: function(evt) {
            
            console.log("got onMouseoverDeeplink. evt.data:", evt.data, "evt:", evt);
            
            var obj = evt.data;
            
            // see if this obj has already had it's mouseover called over 10 times
            if ('hrefcount' in obj && obj.hrefcount > 0) {
                console.log("enough mouseover rewriting already. unbinding.");
                obj.el.find('.zw-contactcard-mainarea').unbind("mouseover");
                return;
            }
            
            
            if ('hrefcount' in obj) obj.hrefcount++;
            else obj.hrefcount = 1;
            
            var url = this.getDeeplink(obj.sessionkey );
            
            // wrap anchor around name / number too
            var elName = obj.el.find('.zw-contactcard-name');
            console.log('elName:', elName, "elNameTxt:", elName.text());
            var elNameHref = $('<a href="' + url + '">' + elName.text() + '</a>');
            //elName.text('');
            elName.empty();
            elName.append(elNameHref);
            //obj.el.find('.zw-contactcard-name').wrap();
            
            // Phone Number
            //obj.el.find('.zw-contactcard-number').wrap('<a href="' + url + '" />');
            var elPhone = obj.el.find('.zw-contactcard-phone');
            console.log('elPhone:', elPhone, "elPhoneTxt:", elPhone.text());
            var elPhoneHref = $('<a href="' + url + '">' + elPhone.text() + '</a>');
            elPhone.text('');
            elPhone.append(elPhoneHref);
            
        },
        getDeeplink: function(sessionkey) {
            var url = "/session/v2/deeplink?session=" + sessionkey;
            
            // see if we're in test-trunk
            if (window.location.href.match(/test-trunk/)) {
                url += "&url=http://test-trunk.zipwhip.com/?carrier=d2c-landline";
            }
            
            return url;
        },
        onDeeplinkClick: function(evt) {
            console.log("got deeplink click. evt.data:", evt.data, "evt:", evt);
            
            var url = this.getDeeplink(evt.data);
            
            window.location.href = url;
        },
        setupQuery: function() {
            
            // Setup an interval to query on
            setInterval(this.queryAllKeys.bind(this), 60 * 1000);
            
            // Setup manual click to query
            var el = $('.zw-dashboard-lastquery');
            el.click(this.onQueryClick.bind(this));
        },
        onQueryClick: function(evt) {
            console.log("got query on click");
            this.queryAllKeys();
        },
        totalUnreadCtr: 0,
        queryAllKeys: function(callback) {
            
            console.log("cards:", this.cards);
            
            var dashcard = this.dashboardCard;
            var that = this;
            
            // reset total unread ctr to zero
            // we will add up each time we get a count
            this.totalUnreadCtr = 0;
            
            // keep track of how many cards we will iterate, so when we hit the full
            // amount we know we're done querying and can issue the callback
            var howManyQueried = 0;
            
            for (var sessionkey in this.cards) {
                var item = this.cards[sessionkey];
                console.log("getting unread ctr. sessionkey:", sessionkey, "item:", item);
                if (item.phone) {
                    dashcard.getAllConvoUnread(sessionkey, function(ctr, sessionkey2) {
                        
                        // increment how many we've queried to know when we're done
                        howManyQueried++;
                        
                        //ctr = -1;
                        var item2 = that.cards[sessionkey2];
                        if (ctr == -1) {
                            // this is an error situation
                            
                            var cardEl = $('.zw-convcard-' + item2.phone);
                            cardEl.find('.zw-dashboardcard-err').remove();
                            var errEl = $('<div class="zw-dashboardcard-err">Error querying unread count. This likely means your sessionkey is expired. Please contact support@zipwhip.com.</div>');
                            cardEl.append(errEl);
                        } else {
                            
                            // we got an unread count
                            that.totalUnreadCtr += ctr;
                            
                            dashcard.conversationCard.updateUnreadCounter(item2.phone, ctr);
                            if (ctr > 0) {
                                //dashcard.conversationCard.pulseUnreadWithTimer(item2.phone, 3);
                            }
                        }
                        
                        if (howManyQueried >= Object.keys(that.cards).length) {
                            console.log("we are done querying. doing callback. howManyQueried:", howManyQueried, "totalUnread:", that.totalUnreadCtr);
                            
                            dashcard.conversationCard.updateUnreadCounter('000', that.totalUnreadCtr);
                            if (that.totalUnreadCtr > 0) {
                                dashcard.conversationCard.pulseUnreadWithTimer('000', 3);
                            }
                            
                            // also do a bit of formatting now that all cards are loaded
                            that.formatGlobalUnreadCtr();
                            
                            if (callback) callback();
                        }
                    });
                }
            }
            this.updateQueryStatus();
            
        },
        //lastQuery: null,
        updateQueryStatus: function() {
            var el = $('.zw-dashboard-lastquery');
            var now = new Date();
            
            el.text("Last query " + now.toLocaleString());
        },
        timeDifference: function(current, previous) {
            
            var msPerMinute = 60 * 1000;
            var msPerHour = msPerMinute * 60;
            var msPerDay = msPerHour * 24;
            var msPerMonth = msPerDay * 30;
            var msPerYear = msPerDay * 365;
            
            var elapsed = current - previous;
            
            if (elapsed < msPerMinute) {
                return Math.round(elapsed/1000) + ' seconds ago';   
            }
            
            else if (elapsed < msPerHour) {
                return Math.round(elapsed/msPerMinute) + ' minutes ago';   
            }
            
            else if (elapsed < msPerDay ) {
                return Math.round(elapsed/msPerHour ) + ' hours ago';   
            }
            
            else if (elapsed < msPerMonth) {
                return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
            }
            
            else if (elapsed < msPerYear) {
                return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
            }
            
            else {
                return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
            }
        },
        loadDashboardCard: function(callback) {
            
            // This method loads the Conversation Card factory

            // Load the Conversation Card factory from the URL. We'll get HTML, 
            // CSS, and Javascript loaded into our instantiation placeholder
            var that = this;
            chilipeppr.load(
                "com-zipwhip-dashcard-instantiation",
                "http://fiddle.jshell.net/zipwhip/xet57Lbr/show/light/",
                function () {
                    cprequire(
                        ["inline:com-zipwhip-dashboardcard"],
                        function(dashboardCard) {
                            // We now have Conversation Card object so we can generate
                            // new cards
                            that.dashboardCard = dashboardCard;
                            that.dashboardCard.init(function() {
                                console.log("we were able to load the dashboardCard element, so we are going to hang onto an instantiated copy of this object to use it later. this.dashboardCard:", that.dashboardCard);
                                if (callback) callback();           
                            });
                        }
                    );
                    
                }

            );

        },
        /**
         * Call this method from init to setup all the buttons when this widget
         * is first loaded. This basically attaches click events to your 
         * buttons. It also turns on all the bootstrap popovers by scanning
         * the entire DOM of the widget.
         */
        btnSetup: function() {

            // Chevron hide/show body
            var that = this;
            $('#' + this.id + ' .hidebody').click(function(evt) {
                console.log("hide/unhide body");
                if ($('#' + that.id + ' .panel-body').hasClass('hidden')) {
                    // it's hidden, unhide
                    that.showBody(evt);
                }
                else {
                    // hide
                    that.hideBody(evt);
                }
            });

            // Ask bootstrap to scan all the buttons in the widget to turn
            // on popover menus
            $('#' + this.id + ' .btn').popover({
                delay: 1000,
                animation: true,
                placement: "auto",
                trigger: "hover",
                container: 'body'
            });

            // Init Say Hello Button on Main Toolbar
            // We are inlining an anonymous method as the callback here
            // as opposed to a full callback method in the Hello Word 2
            // example further below. Notice we have to use "that" so 
            // that the this is set correctly inside the anonymous method
            $('#' + this.id + ' .btn-sayhello').click(function() {
                console.log("saying hello");
                // Make sure popover is immediately hidden
                $('#' + that.id + ' .btn-sayhello').popover("hide");
                // Show a flash msg
                chilipeppr.publish(
                    "/com-chilipeppr-elem-flashmsg/flashmsg",
                    "Hello Title",
                    "Hello World from widget " + that.id,
                    1000
                );
            });

            // Init Hello World 2 button on Tab 1. Notice the use
            // of the slick .bind(this) technique to correctly set "this"
            // when the callback is called
            $('#' + this.id + ' .btn-helloworld2').click(this.onHelloBtnClick.bind(this));

        },
        /**
         * onHelloBtnClick is an example of a button click event callback
         */
        onHelloBtnClick: function(evt) {
            console.log("saying hello 2 from btn in tab 1");
            chilipeppr.publish(
                '/com-chilipeppr-elem-flashmsg/flashmsg',
                "Hello 2 Title",
                "Hello World 2 from Tab 1 from widget " + this.id,
                2000 /* show for 2 second */
            );
        },
        /**
         * User options are available in this property for reference by your
         * methods. If any change is made on these options, please call
         * saveOptionsLocalStorage()
         */
        options: null,
        /**
         * Call this method on init to setup the UI by reading the user's
         * stored settings from localStorage and then adjust the UI to reflect
         * what the user wants.
         */
        setupUiFromLocalStorage: function() {

            // Read vals from localStorage. Make sure to use a unique
            // key specific to this widget so as not to overwrite other
            // widgets' options. By using this.id as the prefix of the
            // key we're safe that this will be unique.

            // Feel free to add your own keys inside the options 
            // object for your own items

            var options = localStorage.getItem(this.id + '-options');

            if (options) {
                options = $.parseJSON(options);
                console.log("just evaled options: ", options);
            }
            else {
                options = {
                    showBody: true,
                    tabShowing: 1,
                    customParam1: null,
                    customParam2: 1.0
                };
            }

            this.options = options;
            console.log("options:", options);

            // show/hide body
            if (options.showBody) {
                this.showBody();
            }
            else {
                this.hideBody();
            }

        },
        /**
         * When a user changes a value that is stored as an option setting, you
         * should call this method immediately so that on next load the value
         * is correctly set.
         */
        saveOptionsLocalStorage: function() {
            // You can add your own values to this.options to store them
            // along with some of the normal stuff like showBody
            var options = this.options;

            var optionsStr = JSON.stringify(options);
            console.log("saving options:", options, "json.stringify:", optionsStr);
            // store settings to localStorage
            localStorage.setItem(this.id + '-options', optionsStr);
        },
        /**
         * Show the body of the panel.
         * @param {jquery_event} evt - If you pass the event parameter in, we 
         * know it was clicked by the user and thus we store it for the next 
         * load so we can reset the user's preference. If you don't pass this 
         * value in we don't store the preference because it was likely code 
         * that sent in the param.
         */
        showBody: function(evt) {
            $('#' + this.id + ' .panel-body').removeClass('hidden');
            $('#' + this.id + ' .panel-footer').removeClass('hidden');
            $('#' + this.id + ' .hidebody span').addClass('glyphicon-chevron-up');
            $('#' + this.id + ' .hidebody span').removeClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = true;
                this.saveOptionsLocalStorage();
            }
            // this will send an artificial event letting other widgets know to resize
            // themselves since this widget is now taking up more room since it's showing
            $(window).trigger("resize");
        },
        /**
         * Hide the body of the panel.
         * @param {jquery_event} evt - If you pass the event parameter in, we 
         * know it was clicked by the user and thus we store it for the next 
         * load so we can reset the user's preference. If you don't pass this 
         * value in we don't store the preference because it was likely code 
         * that sent in the param.
         */
        hideBody: function(evt) {
            $('#' + this.id + ' .panel-body').addClass('hidden');
            $('#' + this.id + ' .panel-footer').addClass('hidden');
            $('#' + this.id + ' .hidebody span').removeClass('glyphicon-chevron-up');
            $('#' + this.id + ' .hidebody span').addClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = false;
                this.saveOptionsLocalStorage();
            }
            // this will send an artificial event letting other widgets know to resize
            // themselves since this widget is now taking up less room since it's hiding
            $(window).trigger("resize");
        },
        /**
         * This method loads the pubsubviewer widget which attaches to our 
         * upper right corner triangle menu and generates 3 menu items like
         * Pubsub Viewer, View Standalone, and Fork Widget. It also enables
         * the modal dialog that shows the documentation for this widget.
         * 
         * By using chilipeppr.load() we can ensure that the pubsubviewer widget
         * is only loaded and inlined once into the final ChiliPeppr workspace.
         * We are given back a reference to the instantiated singleton so its
         * not instantiated more than once. Then we call it's attachTo method
         * which creates the full pulldown menu for us and attaches the click
         * events.
         */
        forkSetup: function() {
            var topCssSelector = '#' + this.id;

            $(topCssSelector + ' .panel-title').popover({
                title: this.name,
                content: this.desc,
                html: true,
                delay: 1000,
                animation: true,
                trigger: 'hover',
                placement: 'auto'
            });

            var that = this;
            chilipeppr.load("http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/", function() {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function(pubsubviewer) {
                    pubsubviewer.attachTo($(topCssSelector + ' .panel-heading .dropdown-menu'), that);
                });
            });

        },

    }
});