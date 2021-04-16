//<-----------------------------------------SECOND VIZ--------------------------------------------------------->
// VARIABLES ***********************************************
var width2 = 1400;
var height2 = 900;
var svg;
var groupNodes;
var computer;
var viz;


var t = d3.transition()
            .duration(2000)
            .ease(d3.easeLinear)

var temporalCount = 100; // later discuss this value
var dataset = {
        "children": [{
                        "Name": "decentralization",
                        "Count": temporalCount
                },
                {
                        "Name": "internet",
                        "Count": temporalCount
                },
                {
                        "Name": "iphone",
                        "Count": temporalCount
                },
                {
                        "Name": "smartphone",
                        "Count": temporalCount
                },
                {
                        "Name": "technology",
                        "Count": temporalCount
                },
                {
                        "Name": "blockchain",
                        "Count": temporalCount
                },
                {
                        "Name": "computing",
                        "Count": temporalCount
                },
                {
                        "Name": "cryptocurrency",
                        "Count": temporalCount
                },
                {
                        "Name": "Alexa",
                        "Count": temporalCount
                },
                {
                        "Name": "antivirus",
                        "Count": temporalCount
                },
                {
                        "Name": "artificial-intelligence",
                        "Count": temporalCount
                },
                {
                        "Name": "blog",
                        "Count": temporalCount
                },
                {
                        "Name": "cybersecurity",
                        "Count": temporalCount
                },
                {
                        "Name": "hacker",
                        "Count": temporalCount
                },
                {
                        "Name": "programming",
                        "Count": temporalCount
                },
                {
                        "Name": "social network",
                        "Count": temporalCount
                },
                {
                        "Name": "SOLID",
                        "Count": temporalCount
                }
        ]
};
var colors = d3.scaleOrdinal().range(["#D44A6F", "#E67962", "#FDCB5B", "#80C0A1", "#5F8F78",
        "#53B9C9", "#0086B2", "#8B6391", "#667981"
]); // Empathy colors

var numWords = new Array(17);

// SHOW SECOND VIZ ***********************************************

window.onload = function () {
        svg = d3.select("div.second_viz")
                .append("svg")
                .attr("width", width2)
                .attr("height", height2);
    
        computer = svg.append("g");
        viz = svg.append("g");
        groupNodes = svg.append("g").attr("class", "group-nodes")
                    .attr("transform", function (d) {
                            return "translate(" + 400 + "," + -50 + ")";
                    });
    
        // Show computer
        showComputer();
        // Show bubbles
        showBubbles();
        // Create Viz
        createViz();
}

// FUNCTIONS ***********************************************

//drawing the computer
function showComputer() {
        computer.append("rect")
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

function showBubbles() {
        var bubble = d3.pack(dataset)
                .size([600, 900])
                .padding(15);

        var nodes = d3.hierarchy(dataset).sum(function (d) {
                return d.Count;
        });

        

        var node = groupNodes.selectAll(".node")
                .data(bubble(nodes).descendants())
                .enter()
                .filter(function (d) {
                        return !d.children
                })
                .append("g")
                .attr("class", "node")
                .attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                });

        node.append("title")
                .text(function (d) {
                        return d.Name + ": " + d.Count;
                });

        node.append("circle")
                .on("mouseover", function(){
                        d3.select(this).attr("r", d=> d.r + 7)
                        .style("stroke", "rgba(255, 255, 255, 0.68)")
                        .style("stroke-width", "2")
                })
                .on("mouseout", function(){
                        d3.select(this).attr("r", d=> d.r).style("stroke", "none")
                })
                .on("click", function(d){
                        showViz( d.data.Name.substring(0, d.r / 3));
                })
                .attr("r", function (d) {
                        return d.r;
                })
                .style("fill", function (d, i) {
                        return colors(i);
                });

        node.append("text").attr("class", "text-word")
                .attr("dy", ".2em")
                .style("text-anchor", "middle")
                .text(function (d) {
                        return d.data.Name.substring(0, d.r / 3);
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", function (d) {
                        return d.r / 4;
                })
                .attr("fill", "white");
                

        d3.select(self.frameElement)
                .style("height", 400 + "px")
                .style("width", 800 + "px");

}

function createViz(){
    viz.append("image").attr("xlink:href", "./IMAGES/left-arrow.png")
            .style('opacity',0)
            .attr("x", 240)
            .attr("y", 130)
            .on("click", goBack);
    
    viz.append("text")
            .text("The title's viz")
            .attr("y", 175)
            .attr("x", 320)
            .attr("font-size", 40)
            .attr("font-family", "monospace")
            .attr("fill", "white")
            .attr("id","viz_title")
            .style("opacity", 0)
}

function showViz(name){
    groupNodes.selectAll("*").transition(t).style("opacity",0)
    console.log(name);
    d3.select("#viz_title").transition(t).text(name+"'s viz")
    viz.selectAll("*").transition(t).style("opacity",1);
}

function goBack(){
    console.log("It's clicking")
    viz.selectAll("*").transition(t).style("opacity",0);
    groupNodes.selectAll("*").transition(t).style("opacity",1);
}