// set initial screen number
let screenNum = 1;

// total number of screens
let totalScreens = $("section").length;

// transition duration
let dur = 1;

// delay 
let delay = dur + 0.5;

// disables nav when transitioning from screen to screen
let navActive = true;

// vars used for nav
let currentScreen, prevScreen, nextScreen;

// hides all screens except for screen 1
$("section:gt(0)").hide();

// set up main div on paused timeline until begin button clicked
let main = gsap.from("main", {
    duration: dur,
    opacity: 0,
    y: $(window).height(),
    opacity: 0,
    ease: "back.out",
    onComplete: function() {
        
        // set volume of BG music to zero
        $("#background").prop("volume", 0)

        // play BG music
        $("#background").trigger("play")

        // fade in BG music to 20% volume
        $("#background").animate({volume: 0.08}, 2000)
    }

}).pause();

// set up begin button on paused timeline until page load
let begin = gsap.from("#btnContainer", {
    duration: dur,
    opacity: 0,


    // Make button appear from offscreen
    y: $(window).height(),
    opacity: 0,
    ease: "back.out",

    onReverseComplete: function() {
        // console.log("Reverse Complete");
        loadScreen1();
        // show the main div
        $("main").show();

        main.play();
    }
}).pause();

// preload all content and then reveal begin button
$(window).on("load", function() {

    // fade out preloader GIF
    gsap.to("#loading", {
        duration: dur * 3,
        opacity: 0,
        onComplete: function() {
            $("#begin").show();
            // when done show begin button
            begin.play(); 
        }
    });
});

// begin button click function
$("#begin").click(function() {

    // console.log("BEGIN!");
    begin.reverse();
    $("#screen1").removeClass("screen1_none").addClass("screen1_reveal")

});


// next navigation function
function showNextScreen(){

    // check if nav is active
    if(navActive){
        console.log("nextScreen");
        navActive = false;

        //  Make sure you got that hashtag!
        // target the current
        currentScreen = "#screen" + screenNum;

        // set the next screen number 
        screenNum++;

        showHideNav(screenNum);

        // target the next screen
        nextScreen = "#screen" + screenNum;

        // transitions current screen out
        gsap.fromTo(currentScreen, {
            x: 0
        }, {
            duration: dur,
            delay: 0.5,
            x: -960,
            ease: "power2.inOut"
        });

        // show next screen
        $(nextScreen).show();

        gsap.fromTo(nextScreen, {
            x: 960
        }, {
            duration: dur,
            delay: 0.5,
            x: 0,
            ease: "power2.inOut",
            onComplete: function() {
                console.log("Next Screen Animation Finished");
                // hide current screen
                $(currentScreen).hide();

                // re-enable nav
                navActive = true;
            }
        });

        // load function to animate conents of the screen
        // set up off screen
        window["loadScreen" + screenNum]();

        // stop voiceover from playing
        $("#voiceover").trigger("pause")
    }
}


// previous navigation function
function showPrevScreen(){

    // check if nav is active
    if(navActive){

        navActive = false;

        // target the current
        currentScreen = "#screen" + screenNum;

        // set the prev screen number 
        screenNum--;

        showHideNav(screenNum);

        // target the prev screen
        prevScreen = "#screen" + screenNum;

        // transitions current screen out
        gsap.fromTo(currentScreen, {
            x: 0
        }, {
            duration: dur,
            delay: 0.5,
            x: 960,
            ease: "power2.inOut"
        });

        // show prev screen
        $(prevScreen).show();

        gsap.fromTo(prevScreen, {
            x: -960
        }, {
            duration: dur,
            delay: 0.5,
            x: 0,
            ease: "power2.inOut",
            onComplete: function() {
                console.log("Prev Screen Animation Finished");
                // hide current screen
                $(currentScreen).hide();

                // re-enable nav
                navActive = true;
            }
        });

        // load function to animate conents of the screen
        // set up off screen
        window["loadScreen" + screenNum]();

        // stop voiceover from playing
        $("#voiceover").trigger("pause")
    
    }
}


// next and previous button clicks
$("#next").click(showNextScreen);
$("#prev").click(showPrevScreen);


// show/hide next/prev buttons
function showHideNav(currentScreen) {
    if(currentScreen == 1) {
        $("#prev").fadeOut(1000);
        $("#next").fadeIn(1000);
    } else if(currentScreen == totalScreens) {
        $("#prev").fadeIn(1000);
        $("#next").fadeOut(1000);
    }
    else {
        $("#prev").fadeIn(1000);
        $("#next").fadeIn(1000);
    }

}

// set up nav on page load
showHideNav(1);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOAD SCREEN AUDIO //////////////////////////////////////////////////////////////////////////////////////////////////
function loadScreenAudio() {
    ////change sourse of audio track
    $("#voiceover").attr("src", "audio/screen_" + screenNum + ".mp3")
    ////tell the new source
    $("#voiceover").trigger("play")
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONTROL BACKGROUND AUDIO ///////////////////////////////////////////////////////////////////////////////////////////
$("#playPause").click(function() {
    let symbol = $("#playPause div");

    if (symbol.hasClass("pause")) {

        $("#background").trigger("pause")
        symbol.removeClass("pause").addClass("play")
    } else {
        $("#background").trigger("play")
        symbol.removeClass("play").addClass("pause")
    }
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOAD SCREEN 1 ///////////////////////////////////////////////////////////////////////////////////////////////////////
function loadScreen1() {
    gsap.from("#screen1 h1", {
        duration: dur,
        delay: delay,
        opacity: 0
    });

    gsap.delayedCall(delay, loadScreenAudio)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOAD SCREEN 2 ///////////////////////////////////////////////////////////////////////////////////////////////////////
function loadScreen2() {

    $(".dashed_line:gt(0)").hide();
    $(".ball:gt(0)").hide();
    $(".text:gt(0)").hide();

    $(".ship_icon4").css({
        marginLeft: ""
    });

    document.querySelector(".move").innerText = 'move'

    //// h1 animation
    gsap.from("#screen2 h1", {
        duration: dur,
        delay: delay,
        opacity: 0
    });

    //// h2 animation
    gsap.from("#screen2 h2", {
        duration: dur,
        delay: delay + dur,
        opacity: 0
    });

    //// line1 animation
    gsap.from(".line1", {
        duration: dur,
        delay: delay,
        opacity: 0,
        x: 200
    })

    //// line2 animation
    gsap.from(".line2", {
        duration: dur,
        delay: delay,
        opacity: 0,
        x: -200
    })


    //Ball 1, Line1, text 1
    gsap.from(".dashed_line1", {
        height: 0,
        duration: 1,
        delay: delay + delay
    })

    gsap.from(".ball1", {
        scale: 0,
        delay: (delay * 2) + dur,
        duration: 1
    })

    gsap.from(".text1951", {
        opacity: 0,
        x: -100,
        duration: 1,
        delay: (delay * 2) + (dur * 2)
    })


    //Click "move" btn animation
    let counter = 0
    $(".move").click(function() {

        counter ++;
        if (counter > 6) {

            return (false);


            //Text2
        } else if (counter === 1) { 

            document.querySelector(".move").innerText = 'move'

            $("#water").trigger("play")

            $(".ship_icon4").animate({
                'margin-left' : '+120px'
            }, 'slow')

            $(".dashed_line2").show();
            $(".ball2").show();
            $(".text1956").show();


            gsap.from(".dashed_line2", {
                height: 0,
                duration: 1,
                delay: 1
            })
        
            gsap.from(".ball2", {
                scale: 0,
                delay: 1 + dur,
                duration: 1
            })
        
            gsap.from(".text1956", {
                opacity: 0,
                x: -100,
                duration: 1,
                delay: 2 + (dur)
            })


        //Text3
        } else if (counter === 2) { 

            $(".ship_icon4").animate({
                'margin-left' : '+260px'
            }, 'slow')

            $("#water").trigger("play")

            $(".dashed_line3").show();
            $(".ball3").show();
            $(".text1975").show();


            gsap.from(".dashed_line3", {
                height: 0,
                duration: 1,
                delay: 1
            })
        
            gsap.from(".ball3", {
                scale: 0,
                delay: 1 + dur,
                duration: 1
            })
        
            gsap.from(".text1975", {
                opacity: 0,
                x: -100,
                duration: 1,
                delay: 2 + (dur)
            })

        //Text4
        } else if (counter === 3) { 

            $(".ship_icon4").animate({
                'margin-left' : '+430px'
            }, 'slow')

            $("#water").trigger("play")

            $(".dashed_line4").show();
            $(".ball4").show();
            $(".text1996").show();


            gsap.from(".dashed_line4", {
                height: 0,
                duration: 1,
                delay: 1
            })
        
            gsap.from(".ball4", {
                scale: 0,
                delay: 1 + dur,
                duration: 1
            })
        
            gsap.from(".text1996", {
                opacity: 0,
                x: -100,
                duration: 1,
                delay: 2 + (dur)
            })

        //Text 5    
        } else if (counter === 4) { 

            $(".ship_icon4").animate({
                'margin-left' : '+560px'
            }, 'slow')

            $("#water").trigger("play")

            $(".dashed_line5").show();
            $(".ball5").show();
            $(".text2012").show();


            gsap.from(".dashed_line5", {
                height: 0,
                duration: 1,
                delay: 1
            })
        
            gsap.from(".ball5", {
                scale: 0,
                delay: 1 + dur,
                duration: 1
            })
        
            gsap.from(".text2012", {
                opacity: 0,
                x: -100,
                duration: 1,
                delay: 2 + (dur)
            })

        //Text 6    
        } else if (counter === 5) { 

            document.querySelector(".move").innerText = 'reset'

            $(".ship_icon4").animate({
                'margin-left' : '+680px'
            }, 'slow')

            $("#water").trigger("play")

            $(".dashed_line6").show();
            $(".ball6").show();
            $(".text2023").show();


            gsap.from(".dashed_line6", {
                height: 0,
                duration: 1,
                delay: 1
            })
        
            gsap.from(".ball6", {
                scale: 0,
                delay: 1 + dur,
                duration: 1
            })
        
            gsap.from(".text2023", {
                opacity: 0,
                x: -100,
                duration: 1,
                delay: 2 + (dur)
            })

        //Reset all  properties  
        } else if (counter === 6) {

            counter = 0;

            $(".dashed_line:gt(0)").hide();
            $(".ball:gt(0)").hide();
            $(".text:gt(0)").hide();
            $(".ship_icon4").css({marginLeft: ""});
            document.querySelector(".move").innerText = 'move'
        }

    });

    gsap.delayedCall(delay, loadScreenAudio)
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // LOAD SCREEN 3 ///////////////////////////////////////////////////////////////////////////////////////////////////////
function loadScreen3() {

    //h1
    gsap.from("#screen3 h1", {
        duration: dur,
        delay: delay + 0.5,
        opacity: 0,
    });

    //h3
    gsap.from("#screen3 h3", {
        delay: (dur * 5),
        opacity: 0,
        duration: dur
    })

    //First circle
    gsap.from(".graph11", {
        delay: delay + dur ,
        duration: dur,
        opacity: 0,
        scale: 0,
        rotate: -90
    })

    gsap.from(".graph12", {
        delay: (3 * dur),
        duration: dur,
        opacity: 0,
        rotate: -90
    })

    gsap.from(".graph13", {
        delay: (3 * dur) + 0.5,
        duration: dur,
        opacity: 0,
        rotate: -90
    })

    gsap.from(".graph14", {
        delay: (3 * dur) + 0.5,
        duration: dur,
        opacity: 0,
        rotate: -90
    })
    
    gsap.from(".graph_title", {
        delay: (4 * dur),
        duration: dur,
        opacity: 0,
        top: 0
    })

    $(".ships_title").hover(function() {

        $("#text_reveal").trigger("play")
        $("#text_reveal").animate({volume: 0.1}, 2000)

        gsap.to(".grap11_text", {
            opacity: 1,
            duration: dur
        })
    }, function() {
        gsap.to(".grap11_text", {
            opacity: 0,
            duration: dur
        })
    })

    $(".planes_title").hover(function() {

        $("#text_reveal").trigger("play")
        $("#text_reveal").animate({volume: 0.1}, 2000)

        gsap.to(".grap12_text", {
            opacity: 1,
            duration: dur
        })
    }, function() {
        gsap.to(".grap12_text", {
            opacity: 0,
            duration: dur
        })
    })

    $(".trains_title").hover(function() {

        $("#text_reveal").trigger("play")
        $("#text_reveal").animate({volume: 0.1}, 2000)

        gsap.to(".grap13_text", {
            opacity: 1,
            duration: dur
        })
    }, function() {
        gsap.to(".grap13_text", {
            opacity: 0,
            duration: dur
        })
    })

    $(".cars_title").hover(function() {

        $("#text_reveal").trigger("play")
        $("#text_reveal").animate({volume: 0.1}, 2000)

        gsap.to(".grap14_text", {
            opacity: 1,
            duration: dur
        })
    }, function() {
        gsap.to(".grap14_text", {
            opacity: 0,
            duration: dur
        })
    })

    //Second Circle
    gsap.from(".graph21", {
        delay: delay + dur ,
        duration: dur,
        opacity: 0,
        scale: 0,
        rotate: -90
    })

    gsap.from(".graph22", {
        delay: (3 * dur),
        duration: dur,
        opacity: 0,
        rotate: -90
    })

    gsap.from(".graph23", {
        delay: (3 * dur) + 0.5,
        duration: dur,
        opacity: 0,
        rotate: -90
    })

    gsap.from(".graph24", {
        delay: (3 * dur) + 0.5,
        duration: dur,
        opacity: 0,
        rotate: -90
    })

    $(".ships_title2").hover(function() {

        $("#text_reveal").trigger("play")
        $("#text_reveal").animate({volume: 0.1}, 2000)

        gsap.to(".grap24_text", {
            opacity: 1,
            duration: dur
        })
    }, function() {
        gsap.to(".grap24_text", {
            opacity: 0,
            duration: dur
        })
    })

    $(".planes_title2").hover(function() {

        $("#text_reveal").trigger("play")
        $("#text_reveal").animate({volume: 0.1}, 2000)

        gsap.to(".grap23_text", {
            opacity: 1,
            duration: dur
        })
    }, function() {
        gsap.to(".grap23_text", {
            opacity: 0,
            duration: dur
        })
    })

    $(".trains_title2").hover(function() {

        $("#text_reveal").trigger("play")
        $("#text_reveal").animate({volume: 0.1}, 2000)

        gsap.to(".grap22_text", {
            opacity: 1,
            duration: dur
        })
    }, function() {
        gsap.to(".grap22_text", {
            opacity: 0,
            duration: dur
        })
    })

    $(".cars_title2").hover(function() {

        $("#text_reveal").trigger("play")
        $("#text_reveal").animate({volume: 0.1}, 2000)

        gsap.to(".grap21_text", {
            opacity: 1,
            duration: dur
        })
    }, function() {
        gsap.to(".grap21_text", {
            opacity: 0,
            duration: dur
        })
    })


    //h2
    gsap.from("#screen3 h2", {
        delay: (dur * 6),
        opacity: 0,
        duration: dur
    })

    //money_icon
    gsap.from(".money_icon", {
        delay: (dur * 7),
        opacity: 0,
        duration: dur,
        left: -10
    })

    //btn
    gsap.from(".bars_btn", {
        delay: (dur * 8),
        opacity: 0,
        duration: dur
    })

    //reset bars and btn styles
    $(".bars_btn").show()

    $(".bar1").css({"width":""})
    $(".bar2").css({"width":""})
    $(".bar3").css({"width":""})
    $(".bar4").css({"width":""})
    
    $(".cars_number").css({"opacity":""})
    $(".trains_number").css({"opacity":""})
    $(".planes_number").css({"opacity":""})
    $(".ships_number").css({"opacity":""})

    //Bars animation
    $(".bars_btn").click(function() {


        $("#mooving_graphs").trigger("play")
        $("#mooving_graphs").animate({volume: 0.1}, 2000)

        
        gsap.fromTo(".bar1", {
            width: 0
        }, {
            duration: dur*2,
            width: 120,
            ease: "power2.out"
        })

        gsap.to(".cars_number", {
            opacity: 1,
            duration: dur,
            delay: dur*2 - 0.5
        })

        gsap.fromTo(".bar2", {
            width: 0
        }, {
            duration: dur*2,
            width: 200,
            ease: "power2.out"
        })

        gsap.to(".trains_number", {
            opacity: 1,
            duration: dur,
            delay: dur*2 - 0.5
        })

        gsap.fromTo(".bar3", {
            width: 0
        }, {
            duration: dur*2,
            width: 270,
            ease: "power2.out"
        })

        gsap.to(".planes_number", {
            opacity: 1,
            duration: dur,
            delay: dur*2 - 0.5
        })

        gsap.fromTo(".bar4", {
            width: 0
        }, {
            duration: dur*2,
            width: 750,
            ease: "power2.out"
        })

        gsap.to(".ships_number", {
            opacity: 1,
            duration: dur,
            delay: dur*2 - 0.5
        })

        $(".bars_btn").hide()

    })

    gsap.delayedCall(delay, loadScreenAudio)

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOAD SCREEN 4 ///////////////////////////////////////////////////////////////////////////////////////////////////////
function loadScreen4() {

    gsap.from("#screen4 h1", {
        duration: dur*2,
        delay: delay,
        opacity: 0,
        x: -200,
        ease: "power4.out"
    });

    gsap.from(".big_rectangle", {
        duration: dur*2,
        delay: delay,
        opacity: 0,
        scale: 0
    })

    gsap.from(".container_img", {
        duration: dur*2,
        delay:delay,
        left: -280
    })

    gsap.from(".equal", {
        duration: dur*2,
        delay: delay,
        rotation: 360,
        scale: 0,
        opacity: 0
    })

    gsap.from(".icon", {
        y: 80,
        opacity: 0,
        delay: delay,
        duration: dur*2,
        ease: "back.out(1)"
    })

    gsap.from(".screen4_h2", {
        y: 50,
        opacity: 0,
        delay: delay,
        duration: dur*2,
        ease: "back.out(1)"
    })


    //Car hover
    $(".car").hover(function() {

        gsap.to(".car", {
            scale: 1.1,
            ease: "power2.out"
        });

        gsap.to(".cars_sign", {
            duration: 1,
            opacity: 1,
            delay: 0.5,
            right: 200
        })

        $("#text_reveal").trigger("play")

        gsap.to(".cars", {
            duration: 1.5,
            opacity: 1,
            delay: 0.5
        })

        $("#swoosh1").trigger("play");

    }, function() {

        gsap.to(".car", {
            scale: 1,
            ease: "power2.in"
        });

        gsap.to(".cars_sign", {
            duration: 1,
            delay: 0.5,
            right: -200,
            opacity: 0
        })

        gsap.to(".cars", {
            duration: 1.5,
            delay: 0.5,
            opacity: 0
        })
        $("#swoosh2").trigger("play");
    });

    //Tv hover
    $(".tv").hover(function() {

        gsap.to(".tv", {
            scale: 1.1,
            ease: "power2.out"
        });

        gsap.to(".tvs_sign", {
            duration: 1,
            opacity: 1,
            delay: 0.5,
            right: 180
        })

        $("#text_reveal").trigger("play")

        gsap.to(".tvs", {
            duration: 1.5,
            opacity: 1,
            delay: 0.5
        })
        
    }, function() {

        gsap.to(".tv", {
            scale: 1,
            ease: "power2.in"
        });

        gsap.to(".tvs_sign", {
            duration: 1,
            delay: 0.5,
            right: -180,
            opacity: 0
        })

        gsap.to(".tvs", {
            duration: 1.5,
            delay: 0.5,
            opacity: 0
        })

    });

    //Box hover
    $(".box").hover(function() {

        gsap.to(".box", {
            scale: 1.1,
            ease: "power2.out"
        });

        gsap.to(".boxes_sign", {
            duration: 1,
            opacity: 1,
            delay: 0.5,
            right: 100
        })

        $("#text_reveal").trigger("play")

        gsap.to(".boxes", {
            duration: 1.5,
            opacity: 1,
            delay: 0.5
        })
        
    }, function() {

        gsap.to(".box", {
            scale: 1,
            ease: "power2.in"
        });

        gsap.to(".boxes_sign", {
            duration: 1,
            delay: 0.5,
            right: -100,
            opacity: 0
        })

        gsap.to(".boxes", {
            duration: 1.5,
            delay: 0.5,
            opacity: 0
        })
    });

    //Wheel hover
    $(".wheel").hover(function() {

        gsap.to(".wheel", {
            scale: 1.1,
            ease: "power2.out"
        });

        gsap.to(".wheels_sign", {
            duration: 1,
            opacity: 1,
            delay: 0.5,
            right: 200
        })

        $("#text_reveal").trigger("play")

        gsap.to(".wheels", {
            duration: 1.5,
            opacity: 1,
            delay: 0.5
        })

    }, function() {

        gsap.to(".wheel", {
            scale: 1,
            ease: "power2.in"
        });

        gsap.to(".wheels_sign", {
            duration: 1,
            delay: 0.5,
            right: -200,
            opacity: 0
        })

        gsap.to(".wheels", {
            duration: 1.5,
            delay: 0.5,
            opacity: 0
        })
    });

    gsap.delayedCall(delay, loadScreenAudio)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOAD SCREEN 5 //////////////////////////////////////////////////////////////////////////////////////////////////////
function loadScreen5() {

    gsap.from("#screen5 h1", {
        duration: dur,
        delay: delay,
        opacity: 0
    });

    $(".pin1").hover(function() {

        $("#text_reveal").trigger("play")

        gsap.to(".map_text1", {
            width: 140,
            height: 200,
            opacity: 1,
            duration: dur,
            delay: 0.5
        })
    }, function(){
        gsap.to(".map_text1", {
            width: 0,
            height: 0,
            opacity: 0,
            duration: dur,
            delay: 0.5
        })
    });


    $(".pin2").hover(function() {

        $("#text_reveal").trigger("play")

        gsap.to(".map_text2", {
            width: 133,
            height: 112,
            opacity: 1,
            duration: dur,
            delay: 0.5
        })
    }, function(){
        gsap.to(".map_text2", {
            width: 0,
            height: 0,
            opacity: 0,
            duration: dur,
            delay: 0.5
        });
    });


    $(".pin3").hover(function() {

        $("#text_reveal").trigger("play")

        gsap.to(".map_text3", {
            width: 140,
            height: 170,
            opacity: 1,
            duration: dur,
            delay: 0.5
        })
    }, function(){
        gsap.to(".map_text3", {
            width: 0,
            height: 0,
            opacity: 0,
            duration: dur,
            delay: 0.5
        });
    });


    $(".pin4").hover(function() {

        $("#text_reveal").trigger("play")

        gsap.to(".map_text4", {
            width: 140,
            height: 170,
            opacity: 1,
            duration: dur,
            delay: 0.5
        })
    }, function(){
        gsap.to(".map_text4", {
            width: 0,
            height: 0,
            opacity: 0,
            duration: dur,
            delay: 0.5
        });
    });


    $(".pin5").hover(function() {

        $("#text_reveal").trigger("play")

        gsap.to(".map_text5", {
            width: 145,
            height: 130,
            opacity: 1,
            duration: dur,
            delay: 0.5,
        });    

        gsap.to(".sydney1", {
            x: -155,
            opacity: 1,
            delay: dur + 0.5,
            duration: dur,
            ease: "power4.out"
        });

        gsap.to(".sydney2", {
            y: 80,
            opacity: 1,
            delay: (dur*2) + 0.5,
            duration: dur,
            ease: "power4.out"
        })
        

        }, function(){

        gsap.to(".sydney2", {
            y: 0,
            opacity: 0,
            delay: 0.5,
            duration: dur,
            ease: "power4.out",
        });

        gsap.to(".sydney1", {
            x: 0,
            opacity: 0,
            duration: dur,
            delay: dur + 0.5,
            ease: "power4.out",
        });

        gsap.to(".map_text5", {
            width: 0,
            height: 0,
            opacity: 0,
            duration: dur,
            delay: (dur*2) + 0.5
        }); 
    });

    gsap.delayedCall(delay, loadScreenAudio)

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOAD SCREEN 6 ///////////////////////////////////////////////////////////////////////////////////////////////////////
function loadScreen6() {

    gsap.from("#screen6 h1", {
        duration: dur,
        delay: delay,
        opacity: 0
    });

    gsap.from(".links", {
        duration: dur,
        delay: delay,
        opacity: 0,
        y: 80
    })

    gsap.delayedCall(delay, loadScreenAudio)

}