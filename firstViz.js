/* 
	I've created a function here that is a simple d3 chart.
	This could be anthing that has discrete steps, as simple as changing
	the background color, or playing/pausing a video.
	The important part is that it exposes and update function that
	calls a new thing on a scroll trigger.
*/

/*global window, console, d3*/
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

window.createGraphic = function() {
    var graphicEl = d3.select('.graphic')
    var graphicVisEl = graphicEl.select('.graphic__vis')
    var graphicProseEl = graphicEl.select('.graphic__prose')

    var size = 600
    var height = 600
    
    
    //<-----------------------------------------FIRST VIZ--------------------------------------------------------->
    
    var t = d3.transition()
            .duration(2000)
            .ease(d3.easeExp)


    var bool1 = false;
    var bool2 = false;
    var bool3 = false;
    var bool4 = false;
    var bool5 = false;
    
    
    // actions to take on each step of our scroll-driven story
    var steps = [
        function step0() {
            
            d3.select("#piece_0")
                    .transition(t)
                    .style('opacity',1)

                for(var i =0; i<4; i++){
                    d3.select(".icon-"+i+"-svg")
                    .transition(t)
                    .style('opacity',1)
                }
            
            
            //going  backwards
            if(bool1){
                d3.select("#piece_1")
                    .transition(t)
                    .style('opacity',0)

                for(var i =4; i<8; i++){
                    d3.select(".icon-"+i+"-svg")
                    .transition(t)
                    .style('opacity',0)
                }
                bool1=false;
            }
        },

        function step1() {
            if(!bool1){
                d3.select("#piece_1")
                    .transition(t)
                    .style('opacity',1)

                for(var i =4; i<8; i++){
                    d3.select(".icon-"+i+"-svg")
                    .transition(t)
                    .style('opacity',1)
                }
                bool1=true;
            }
            
            
            //going  backwards
            if(bool2){
                d3.select("#piece_2")
                    .transition(t)
                    .style('opacity',0)

                for(var i =8; i<12; i++){
                    d3.select(".icon-"+i+"-svg")
                    .transition(t)
                    .style('opacity',0)
                }
                bool2=false;
            }
        },

        function step2() {
            if(!bool2){
                d3.select("#piece_2")
                    .transition(t)
                    .style('opacity',1)

                for(var i =8; i<12; i++){
                    d3.select(".icon-"+i+"-svg")
                    .transition(t)
                    .style('opacity',1)
                }
                bool2=true;
            }
            
            
            //going  backwards
            if(bool3){
                d3.select("#piece_3")
                    .transition(t)
                    .style('opacity',0)

                for(var i =12; i<16; i++){
                    d3.select(".icon-"+i+"-svg")
                    .transition(t)
                    .style('opacity',0)
                }
                bool3=false;
            }
        },

        function step3() {
            if(!bool3){
                d3.select("#piece_3")
                    .transition(t)
                    .style('opacity',1)

                for(var i =12; i<16; i++){
                    d3.select(".icon-"+i+"-svg")
                    .transition(t)
                    .style('opacity',1)
                }
                bool3=true;
            }
            
            
            //going  backwards
            if(bool4){
                d3.select("#piece_4")
                    .transition(t)
                    .style('opacity',0)

                for(var i =16; i<20; i++){
                    d3.select(".icon-"+i+"-svg")
                    .transition(t)
                    .style('opacity',0)
                }
                bool4=false;
            }
        },

        function step4() {
            if(!bool4){
                d3.select("#piece_4")
                    .transition(t)
                    .style('opacity',1)

                for(var i =16; i<20; i++){
                    d3.select(".icon-"+i+"-svg")
                    .transition(t)
                    .style('opacity',1)
                }
                bool4=true;
            }
            
            
            //going  backwards
            if(bool5){
                d3.select("#piece_5")
                    .transition(t)
                    .style('opacity',0)

                for(i =20; i<24; i++){
                    d3.select(".icon-"+i+"-svg")
                    .transition(t)
                    .style('opacity',0)
                }
                bool5=false;
            }
        },
        function step5() {
            if(!bool5){
                d3.select("#piece_5")
                    .transition(t)
                    .style('opacity',1)

                for(var i =20; i<24; i++){
                    d3.select(".icon-"+i+"-svg")
                    .transition(t)
                    .style('opacity',1)
                }
                bool5=true;
            }
        },
    ]

    // update our chart
    function update(step) {
        steps[step].call()
    }

    function setupCharts() {
        
    }

    function setupProse() {
        var height = window.innerHeight * 1.5
                    graphicProseEl.selectAll('.trigger')
                    .style('height', height + 'px')
    }

    function init() {
        setupCharts()
        setupProse()
        update(0)
    }

    init()

    
    
    // ************************************************************ VARIABLES
        var base_path_image = "./IMAGES/"; // basic path for images
        var icons = ["wheel", "boat", "alphabet", "clock", "printer",
        "telescope", "thermometer", "physics", "engine", "sound-recording", "binary-code",
        "submarine", "train", "vintage-car", "battery", "telephone", "color-tv",
        "cellphone", "rocket", "wifi", "ipad", "ebook", "airpods", "3d"]; //icons name

        var width_snake = "100%"; // width of snake-svg
        var height_snake = "600"; // height of snake-svg
        var snake_path_data =
            "m 585 900 h 315 c 25 1 45 19 44 55 c 0 29 -17 44 -45 44 h -301 c -30 0 -46 17 -46 55 c 0 27 14 44 44 44 h 355";
        var line; // path line to split

        // Variables to split snake
        var numConcepts = 6; // number of concepts in the snake
        var snakeLength; // length of the snake
        var sampleInterval = .25;
        var cumu = 0;

        var colors = d3.scaleOrdinal().range(["#D44A6F", "#E67962", "#FDCB5B", "#80C0A1", "#5F8F78",
            "#53B9C9", "#0086B2", "#8B6391", "#667981"
        ]); // Empathy colors
        var path = d3.line().curve(d3.curveCardinal);

        // Snake path data
        var snake_svg = graphicVisEl.append('svg').attr("id", "svg-snake")
            .attr("width", size + 'px').attr("height", size + 'px')
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("viewBox", "0 0 700 500")
            .attr("preserveAspectRatio", "xMinYMin meet"); // Snake svg
    
        //background
        snake_svg.append("rect")
            .attr("width", "300%")
            .attr("height", "300%")
            .attr("fill", "#36515B");
        //append snake
        var snake_color_lines = snake_svg.append("g").attr("id", "group-snake-colors");
    
    
        // ************************************************************ DRAW
        showSnakePath();

        // Show lines of the snake
        showLine(function () {
            var pieces = splitPath();

            var pts = [];

            pieces.forEach(function (x) {
                x.segs.forEach(function (seg, i) {
                    if (i > 0 && i % 2 === 0) {
                        pts.push({
                            id: x.id,
                            seg: seg
                        });
                    }
                });
            });

            drawSegments(pieces);
        });

        // Show Start and Finish icon
        showIcons();
    
    
        // ************************************************************ FUNCTIONS
        function showIcons() {
            //icons.forEach(icon => createIcon(icon));
            for (var i = 0; i < icons.length; i++) {
              createIcon(icons[i],i);
            }
        }
    
        

        function createIcon(name, ind) {
            snake_svg.append("image").attr("id", "svg-" + name + "-icon").attr("class", "icon-"+ind+"-svg")
            .attr("xlink:href", base_path_image + name + ".svg").style('opacity',0);
        }

        // Show snake path
        function showSnakePath() {
            line = snake_svg.append("path")
                .attr("id", "snake-path")
                .attr("d", snake_path_data);

            snakeLength = line.node().getTotalLength(); // set snakeLength
        }

        // Split snake path into multiple pieces
        function splitPath() {
            var pieceSizes = [],
                pieces = [];

            for (var i = 0; i < numConcepts; i++) {
                pieceSizes.push({
                    i: i,
                    size: numConcepts
                });
            }

            var size = pieceSizes.reduce(function (a, b) {
                return a + b.size;
            }, 0);

            var pieceSize = snakeLength / size;

            pieceSizes.forEach(function (x, j) {
                var segs = [];
                for (var i = 0; i <= x.size + sampleInterval; i += sampleInterval) {
                    pt = line.node().getPointAtLength((i * pieceSize) + (cumu * pieceSize));
                    segs.push([pt.x, pt.y]);
                }
                angle = Math.atan2(segs[1][1] - segs[0][1], segs[1][0] - segs[0][0]) * 180 / Math.PI;
                pieces.push({
                    id: j,
                    segs: segs,
                    angle: angle
                });
                cumu += x.size;
            });

            return pieces;
        }

        function showLine(callback) {
            line.classed("hidden", false)
                .attr("stroke-dasharray", snakeLength + " " + snakeLength)
                .attr("stroke-dashoffset", snakeLength);

                callback();
        }


        function drawSegments(pieces) {
            var lines = snake_color_lines.selectAll("path.piece")
                .data(pieces)
                .enter().append("path")
                .attr("class", "piece color-background")
                .attr("id", function(d, i) {return "piece_"+i})
                .style('opacity',0)
                .attr("d", function (d, i) {
                    return path(d.segs);
                });

            lines
                .style("stroke", function (d, i) {
                    return colors(i);
                });
        }
    
    return {
        update: update,
    }
    
}

