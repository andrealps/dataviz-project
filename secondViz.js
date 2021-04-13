//<-----------------------------------------SECOND VIZ--------------------------------------------------------->
// VARIABLES ***********************************************
var width2 = 1400;
var height2 = 900;
var svg;

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
var color = d3.scaleOrdinal(d3.schemeCategory20);

// SHOW SECOND VIZ ***********************************************

window.onload = function () {
        svg = d3.select("div.second_viz")
                .append("svg")
                .attr("width", width2)
                .attr("height", height2);

        // Show computer
        showComputer();
        // Show bubbles
        showBubbles();
}

// FUNCTIONS ***********************************************

//drawing the computer
function showComputer() {
        computer = svg.append("g");
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
                .padding(30);

        var nodes = d3.hierarchy(dataset).sum(function (d) {return d.Count;});

        var groupNodes = svg.append("g").attr("class", "group-nodes")
        .attr("transform", function (d) {
                return "translate(" + 400 + "," + -50 + ")";
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
                .attr("r", function (d) {
                        return d.r;
                })
                .style("fill", function (d, i) {
                        return color(i);
                });

        node.append("text")
                .attr("dy", ".2em")
                .style("text-anchor", "middle")
                .text(function (d) {
                        return d.data.Name.substring(0, d.r / 3);
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", function (d) {
                        return d.r / 5;
                })
                .attr("fill", "white");

        d3.select(self.frameElement)
                .style("height", 400 + "px")
                .style("width", 800 + "px");

}