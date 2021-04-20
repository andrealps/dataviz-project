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

var twitter_json_path = "./TWITTER/tweets.json";
var twitter_data; // data after reading json
var base_path_image = "./IMAGES/"; // basic path for images
var base_path_data_words = "./DATA/";

var dataWords = {}; // to store the year with more articles

// SHOW SECOND VIZ ***********************************************

window.onload = function() {
    svg = d3.select("div.second_viz")
        .append("svg")
        .attr("width", width2)
        .attr("height", height2)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 700 900")
        .attr("preserveAspectRatio", "xMinYMin meet");

    computer = svg.append("g");
    viz = svg.append("g");
    groupNodes = svg.append("g").attr("class", "group-nodes")
        .attr("transform", function(d) {
            return "translate(" + 400 + "," + -50 + ")";
        });

    // Read twitter data before showing dataviz because it's asynchronous
    readJson(twitter_json_path, dataTweets => {
        twitter_data = dataTweets;

        // Show computer
        showComputer();
        // Show bubbles
        showBubbles();
        // Create Viz
        createViz();


        /*
        // Testing, delete after
        groupNodes.selectAll("*").transition(t).style("opacity", 0)
        viz.selectAll("*").transition(t).style("opacity", 1);
        */
    });
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

    var nodes = d3.hierarchy(dataset).sum(function(d) {
        return d.Count;
    });

    var node = groupNodes.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d) {
            return !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function(d) {
            return "Click to see more info";
        });

    node.append("circle")
        .on("mouseover", function() {
            d3.select(this).attr("r", d => d.r + 7)
                .style("stroke", "rgba(255, 255, 255, 0.68)")
                .style("stroke-width", "2")
        })
        .on("mouseout", function() {
            d3.select(this).attr("r", d => d.r).style("stroke", "none")
        })
        .on("click", function(d) {
            showViz(d.data.Name.substring(0, d.r / 3));
        })
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d, i) {
            return colors(i);
        });

    node.append("text").attr("class", "text-word")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Name.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d) {
            return d.r / 4;
        })
        .attr("fill", "white");


    d3.select(self.frameElement)
        .style("height", 400 + "px")
        .style("width", 800 + "px");

}

function createViz() {
    viz.append("image").attr("xlink:href", "./IMAGES/left-arrow.png")
        .style('opacity', 0)
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
        .attr("id", "viz_title")
        .style("opacity", 0)

    // Twitter
    createTweet();
    // Peek year
    createPeekYear();

}

function createTweet() {
    let groupTwitter = viz.append("g").attr("id", "group-twitter");

    // TechCrunch logo (circle)
    let groupLogo = groupTwitter.append("g").attr("id", "group-logo-TechCrunch");
    groupLogo.append("circle").attr("id", "cir_TechCrunch")
        .attr("cx", 320)
        .attr("cy", 480)
        .attr("r", 40)
        .style('opacity', 0);
    groupLogo.append("image").attr("id", "svg-TechCrunch-icon")
        .attr("xlink:href", base_path_image + "techcrunch-logo" + ".svg")
        .style('opacity', 0);

    // Name of the account: TechCrunch
    groupTwitter.append("text").attr("id", "twitter-account-name")
        .text("TechCrunch")
        .attr("x", 380)
        .attr("y", 470)
        .style("opacity", 0);

    // Verified icon 
    groupLogo.append("image").attr("id", "svg-twitter-verified-icon")
        .attr("xlink:href", base_path_image + "twitter-verified" + ".svg")
        .style('opacity', 0);

    // @TechCrunch
    groupTwitter.append("text").attr("id", "twitter-account-user")
        .text("@TechCrunch •")
        .attr("x", 572)
        .attr("y", 466)
        .style("opacity", 0);

    // Date
    groupTwitter.append("text").attr("id", "tweet-date")
        .text("01/01/01")
        .attr("x", 700)
        .attr("y", 466)
        .style("opacity", 0);

    // Content of the tweet
    let content = groupTwitter.append("text").attr("id", "tweet-content")
        .text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.")
        .attr("x", 382)
        .attr("y", 480)
        .style("opacity", 0)
        .call(wrap, 500);

    // Retweets, likes and link
    /*
    groupTwitter.append("image").attr("id", "svg-twitter-retweet-icon")
        .attr("xlink:href", base_path_image + "retweet" + ".svg")
        .style('opacity', 0);
    */
}

function createPeekYear() {
    viz.append("text").attr("id", "peek-year-number")
        .text("2000")
        .attr("y", 300)
        .attr("x", 320)
        .style("opacity", 0)

    viz.append("text").attr("id", "peek-year-text")
        .text("Peak year")
        .attr("y", 350)
        .attr("x", 370)
        .style("opacity", 0)

}

function showViz(name) {
    groupNodes.selectAll("*").transition(t).style("opacity", 0)
    console.log(name);
    d3.select("#viz_title").transition(t).text(name + "'s viz")
    viz.selectAll("*").transition(t).style("opacity", 1);

    // Show last tweet of TechCrunch with the word
    showTweet(name);
    // Show peek year
    showPeekYear(name);
}

function goBack() {
    console.log("It's clicking")
    viz.selectAll("*").transition(t).style("opacity", 0);
    groupNodes.selectAll("*").transition(t).style("opacity", 1);
}

function showPeekYear(name) {
    let peekYear = 0;

    console.log(dataWords);
    if (dataWords[name] !== undefined) {
        peekYear = dataWords[name].year;
        d3.select("#peek-year-number").text(peekYear);
    } else {
        readJson(`${base_path_data_words}${name}.json`, data => {
            let infoPeekYear = data.map(data => {
                let obj = {}
                obj["year"] = data.year;
                obj["articles"] = data.articles;
                obj["percentage"] = data.percentage;
                return obj;
            }).reduce((prev, current) => (prev.percentage > current.percentage) ? prev : current);
            dataWords[name] = infoPeekYear; // add data to dataWords

            peekYear = infoPeekYear.year;
            d3.select("#peek-year-number").text(peekYear);
        });
    }
}

function showTweet(name) {
    let dataWord = twitter_data[0][name];
    // Word exists in json
    if (dataWord !== undefined) {
        d3.select("#tweet-date").transition(t).text(dataWord.date);
        d3.select("#tweet-content").text(dataWord.content).call(wrap, 500).transition(t);

        viz.select("#group-twitter").transition(t).style("opacity", 1);
    } else {
        viz.select("#group-twitter").transition(t).style("opacity", 0);
    }
}

function readJson(filePath, callBack) {
    d3.json(filePath, function(error, data) {
        if (error) console.log(error);
        callBack(data);
    });
}

function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineHeight = 2.8, // ems
            y = text.attr("y"),
            x = text.attr("x"),

            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", 1.5 + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", lineHeight + "em").text(word);
                lineHeight += 1.4;
            }
        }
    });
}