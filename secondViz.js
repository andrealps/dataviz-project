//<-----------------------------------------SECOND VIZ--------------------------------------------------------->
    
window.onload = function () {
    var width2 = 1400;
    var height2 = 900;

    var svg = d3.select("div.second_viz")
        .append("svg")
        .attr("width", width2)
        .attr("height", height2);



    //drawing the computer
    computer = svg.append("g");
    computer
            .append("rect")
            .attr("x", 200)
            .attr("y", 100)
            .attr("height", 600)
            .attr("width", 1000)
            .style("opacity", 1)
            .attr("fill", "white")
            .attr("stroke-width", 1)
            .attr("stroke", "#36515B")
    
    computer
            .append("rect")
            .attr("x", 230)
            .attr("y", 130)
            .attr("height", 540)
            .attr("width", 940)
            .style("opacity", 1)
            .attr("fill", "#36515B")
            .attr("stroke-width", 1)
            .attr("stroke", "#36515B")

    computer.append('line')
            .style("stroke", "white")
            .style("stroke-width", 20)
            .attr("x1", 600)
            .attr("y1", 680)
            .attr("x2", 600)
            .attr("y2", 800); 
    
    computer.append('line')
            .style("stroke", "white")
            .style("stroke-width", 20)
            .attr("x1", 800)
            .attr("y1", 680)
            .attr("x2", 800)
            .attr("y2", 800); 
    
    computer.append('line')
            .style("stroke", "white")
            .style("stroke-width", 30)
            .attr("x1", 500)
            .attr("y1", 790)
            .attr("x2", 900)
            .attr("y2", 790);
}