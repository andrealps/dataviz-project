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
    var svg;

    // actions to take on each step of our scroll-driven story
    var steps = [
        function step0() {  
            console.log("step0");
        },

        function step1() {
            console.log("step1");
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
        svg = graphicVisEl.append('svg')
            .attr('width', size + 'px')
            .attr('height', height + 'px')
        
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