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
    
    var svg = graphicVisEl.append('svg')
            .attr('width', size + 'px')
            .attr('height', height + 'px')
    

    // actions to take on each step of our scroll-driven story
    var steps = [
        function step0() {  
            console.log("step0");
        },

        function step1() {
            console.log("step1");
            var imgs = svg.selectAll("img").data([0]);
            imgs.enter()
                .append("img")
                .attr("xlink:href", "snake.png")
                .attr("x", "60")
                .attr("y", "60")
                .attr("width", "20")
                .attr("height", "20");
            
            
            
            svg
            .append("svg:image")
            .attr("xlink:href", "snake.png")
            .attr("width", 600)
            .attr("height", 600)
            .attr("x", 0)
            .attr("y", 0);
        },

        function step2() {
            console.log("step2");
        },

        function step3() {
            console.log("step3");
        },

        function step4() {
            console.log("step4");
        },
        function step5() {
            console.log("step5");
        },
    ]

    // update our chart
    function update(step) {
        steps[step].call()
    }

    function setupCharts() {
        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "#36515B");
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

    return {
        update: update,
    }
}