//<-----------------------------------------SECOND VIZ--------------------------------------------------------->
// VARIABLES ***********************************************
var width2 = 1400;
var height2 = 900;

var svg;
var groupNodes;
var computer;
var viz;
var vs;
var nyt;
var tc;

var groupFact;
var arcGeneratorNYT;
var arcGeneratorTC;
var nyt_data;
var tc_data;
var currentTopic;
var sliderTime;
var gTime;

//colors for different button states 
var defaultColor = "#7777BB"
var hoverColor = "#0086B2"
var pressedColor = "#000077"

var vsScale = d3.scaleLinear().domain([1e-6, 120]).range([0, 120]);

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

window.addEventListener("load", function() {
    svg = d3.select("div.second_viz")
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 1450 900");

    computer = svg.append("g");
    viz = svg.append("g");
    groupNodes = svg.append("g").attr("class", "group-nodes")
        .attr("transform", function(d) {
            return "translate(" + 400 + "," + -50 + ")";
        });
    groupFact = viz.append("g").attr("id", "group-fact")
        .attr("transform", "translate(0, 23)");
    vs = viz.append("g").attr("id", "group-vs")
        .attr("transform", "translate(0, 23)");
    nyt = viz.append("g").attr("id", "group-nyt")
        .attr("transform", "translate(0, 23)");
    tc = viz.append("g").attr("id", "group-tc")
        .attr("transform", "translate(0, 23)");

    // Read twitter data before showing dataviz because it's asynchronous
    readJson(twitter_json_path, dataTweets => {
        twitter_data = dataTweets;

        // Show computer
        showComputer();
        // Show bubbles
        showBubbles();
        // Create Viz
        createViz();

        // Testing, delete after
        groupNodes.selectAll("*").transition(t).style("opacity", 1)
        viz.selectAll("*").transition(t).style("opacity", 0);

    });
}, false);

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

    computer.append("image").attr("id", "svg-x-icon")
        .attr("xlink:href", base_path_image + "x" + ".svg");

    computer.append("image").attr("id", "svg-square-icon")
        .attr("xlink:href", base_path_image + "square" + ".svg");

    computer.append("image").attr("id", "svg-substract-icon")
        .attr("xlink:href", base_path_image + "substract" + ".svg");
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
    // Fact
    createFact();
    // VS
    createVS();
}

function createFact() {


    // Fun fact title
    groupFact.append("text").attr("id", "fact-info-title")
        .text("Fun fact :")
        .attr("x", 785)
        .attr("y", 190)
        .style("opacity", 0);

    let startX = 295,
        startY = 80;
    // People
    for (let i = 0; i < 10; i++) {
        groupFact.append("image").attr("class", "fact-person")
            .attr("id", `fact-person_${i}`)
            .attr("xlink:href", base_path_image + "man" + ".svg")
            .style('opacity', 0)
            .style("transform", `scale(0.17) 
                translate(${startX + (i<5? 20*i: 20*(i-5))}em, 
                ${(i<5? startY: startY+35)}em)`)
    }

    // Fun fact description
    groupFact.append("text").attr("id", "fact-description")
        .text("5 out of 10 people think artificial intelligence could be dangerous for humanity")
        .attr("x", 785)
        .attr("y", 410)
        .style("opacity", 0)
        .call(wrap, 400);
}

function createTweet() {
    let groupTwitter = viz.append("g").attr("id", "group-twitter");

    groupTwitter.append("text").attr("id", "twitter-info-title")
        .text("Tech Crunch's latest tweet :")
        .attr("x", 250)
        .attr("y", 500)
        .style("opacity", 0);

    // TechCrunch logo (circle)
    let groupLogo = groupTwitter.append("g").attr("id", "group-logo-TechCrunch");
    //    groupLogo.append("circle").attr("id", "cir_TechCrunch")
    //        .attr("cx", 300)
    //        .attr("cy", 500)
    //        .attr("r", 40)
    //        .style('opacity', 0);
    //    groupLogo.append("image").attr("id", "svg-TechCrunch-icon")
    //        .attr("xlink:href", base_path_image + "techcrunch-logo" + ".svg")
    //        .style('opacity', 0);

    // Name of the account: TechCrunch
    groupTwitter.append("text").attr("id", "twitter-account-name")
        .text("TechCrunch")
        .attr("x", 250)
        .attr("y", 550)
        .style("opacity", 0);

    // Verified icon 
    groupLogo.append("image").attr("id", "svg-twitter-verified-icon")
        .attr("xlink:href", base_path_image + "twitter-verified" + ".svg")
        .style('opacity', 0);

    // @TechCrunch
    groupTwitter.append("text").attr("id", "twitter-account-user")
        .text("@TechCrunch •")
        .attr("x", 452)
        .attr("y", 546)
        .style("opacity", 0);

    // Date
    groupTwitter.append("text").attr("id", "tweet-date")
        .text("01/01/01")
        .attr("x", 580)
        .attr("y", 546)
        .style("opacity", 0);

    // Content of the tweet
    let content = groupTwitter.append("text").attr("id", "tweet-content")
        .text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.")
        .attr("x", 252)
        .attr("y", 560)
        .style("opacity", 0)
        .call(wrap, 420);

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
        .attr("y", 590)
        .attr("x", 825)
        .style("opacity", 0)

    viz.append("text").attr("id", "peek-year-text")
        .text("Peak year")
        .attr("y", 640)
        .attr("x", 880)
        .style("opacity", 0)

}

function createVS() {
    viz.append("text").attr("id", "vs-title")
        .text("New York Times VS TedCrunch :")
        .attr("x", 250)
        .attr("y", 210)
        .style("opacity", 1);

    console.log(vsScale(120))

    arcGeneratorNYT = d3.arc() //.attr("id", "nyt-arc")
        .outerRadius(vsScale(120))
        .innerRadius(0)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2);

    vs.append("path").attr("id", "nyt-circle")
        .attr("transform", "translate(400,330)")
        .attr("d", arcGeneratorNYT())
        .style("fill", "#FDCB5B");

    vs.append("text").attr("id", "nyt-number")
        .text("12")
        .attr("x", 400)
        .attr("y", 325)
        .attr("font-size", 20)
        .style("fill", "white")
        .style("text-align", "center")
        .style("text-anchor", "middle")
        .style("opacity", 1);

    arcGeneratorTC = d3.arc() //.attr("id", "tc-arc")
        .outerRadius(vsScale(90))
        .innerRadius(0)
        .startAngle(Math.PI / 2)
        .endAngle(-Math.PI / 2);

    vs.append("path").attr("id", "tc-circle")
        .attr("transform", "translate(400,330),rotate(180 0 0) ")
        .attr("d", arcGeneratorTC())
        .style("fill", "#80C0A1");

    vs.append("text").attr("id", "tc-number")
        .text("9")
        .attr("x", 400)
        .attr("y", 345)
        .attr("font-size", 20)
        .style("fill", "white")
        .style("text-align", "center")
        .style("text-anchor", "middle")
        .style("opacity", 1);

    var dataTime = d3.range(0, 7).map(function(d) {
        return new Date(2010 + d, 10, 3);
    });

    sliderTime = d3
        .sliderRight()
        .min(d3.min(dataTime))
        .max(d3.max(dataTime))
        .step(1000 * 60 * 60 * 24 * 365)
        .height(200)
        .tickFormat(d3.timeFormat('%Y'))
        .tickValues(dataTime)
        .default(new Date(2010, 10, 3))
        .on('onchange', val => {
            updateVS(d3.timeFormat('%Y')(val));
        });

    gTime = vs
        .append('g')
        .attr('transform', 'translate(520,400)')
        .style("opacity", 0)
        .attr("transform", "translate(600,230)");

    gTime.call(sliderTime);


    //here go the radio buttons


    //container for all buttons
    var allButtons = viz.append("g")
        .attr("id", "allButtons")

    //fontawesome button labels
    var labels = ['\uf200', 'NYT', 'TC'];

    var functions = [clickedVS(), clickedNYT(), clickedTC()]
    var index = 0;
    //groups for each button (which will hold a rect and text)
    var buttonGroups = allButtons.selectAll("g.button")
        .data(labels)
        .enter()
        .append("g")
        .attr("class", "button")
        .attr("id", function(i) {
            index++
            return "button" + index
        })
        .style("cursor", "pointer")
        .on("click", function(d, i) {
            updateButtonColors(d3.select(this), d3.select(this.parentNode), i)
        })
        .on("mouseover", function() {
            if (d3.select(this).select("rect").attr("fill") != pressedColor) {
                d3.select(this)
                    .select("rect")
                    .attr("fill", hoverColor);
            }
        })
        .on("mouseout", function() {
            if (d3.select(this).select("rect").attr("fill") != pressedColor) {
                d3.select(this)
                    .select("rect")
                    .attr("fill", defaultColor);
            }
        })

    var bWidth = 40; //button width
    var bHeight = 25; //button height
    var bSpace = 10; //space between buttons
    var x0 = 600; //x offset
    var y0 = 190; //y offset

    //adding a rect to each toggle button group
    //rx and ry give the rect rounded corner
    buttonGroups.append("rect")
        .attr("class", "buttonRect")
        .attr("width", bWidth)
        .attr("height", bHeight)
        .attr("x", function(d, i) { return x0 + (bWidth + bSpace) * i; })
        .attr("y", y0)
        .attr("rx", 5) //rx and ry give the buttons rounded corners
        .attr("ry", 5)
        .attr("fill", defaultColor)

    //adding text to each toggle button group, centered 
    //within the toggle button rect
    buttonGroups.append("text")
        .attr("class", "buttonText")
        .attr("font-family", "FontAwesome")
        .attr("x", function(d, i) {
            return x0 + (bWidth + bSpace) * i + bWidth / 2;
        })
        .attr("y", y0 + bHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("fill", "white")
        .text(function(d) { return d; })



}

function updateButtonColors(button, parent, index) {
    parent.selectAll("rect")
        .attr("fill", defaultColor)

    button.select("rect")
        .attr("fill", pressedColor)

    if (index == 0) {
        clickedVS()
    } else if (index == 1) {
        clickedNYT()
    } else {
        clickedTC()
    }
}

function createNYTGraph(name) {
    nyt.selectAll("*").remove()

    d3.json("./DATA/" + name + ".json", function(error, dataNYT) {

        dataNYT.forEach(function(d) {
            d.year = d3.timeParse("%Y")(d.year)
        });

        var x = d3.scaleTime()
            .domain(d3.extent(dataNYT, function(d) { return d.year; }))
            .range([0, 400]);
        nyt.append("g")
            .attr("transform", "translate(300," + 420 + ")")
            .style("opacity", 0)
            .attr("class", "axisWhite")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(dataNYT, function(d) { return +d.freq; })])
            .range([200, 0]);
        nyt.append("g")
            .attr("transform", "translate(300," + 220 + ")")
            .style("opacity", 0)
            .attr("class", "axisWhite")
            .call(d3.axisLeft(y));

        nyt.append("path")
            .datum(dataNYT)
            .attr("fill", "none")
            .attr("stroke", "#FDCB5B")
            .attr("stroke-width", 2)
            .attr("transform", "translate(300," + 220 + ")")
            .style("opacity", 0)
            .attr("d", d3.line()
                .x(function(d) { return x(d.year) })
                .y(function(d) { return y(d.freq) })
            )
    })

    nyt.selectAll("*").style("opacity", 0)
}

function createTCGraph(name) {
    tc.selectAll("*").remove()

    d3.json("./DATA/TechCrunchDB_" + name + ".json", function(error, dataTC) {
        dataTC.forEach(function(d) {
            d.year = d3.timeParse("%Y")(d.year)
        });

        var x = d3.scaleTime()
            .domain(d3.extent(dataTC, function(d) { return d.year; }))
            .range([0, 400]);
        tc.append("g")
            .attr("transform", "translate(300," + 420 + ")")
            .style("opacity", 0)
            .attr("class", "axisWhite")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(dataTC, function(d) { return +d.freq; })])
            .range([200, 0]);
        tc.append("g")
            .attr("transform", "translate(300," + 220 + ")")
            .style("opacity", 0)
            .attr("class", "axisWhite")
            .call(d3.axisLeft(y));

        tc.append("path")
            .datum(dataTC)
            .attr("fill", "none")
            .attr("stroke", "#80C0A1")
            .attr("stroke-width", 2)
            .attr("transform", "translate(300," + 220 + ")")
            .style("opacity", 0)
            .attr("d", d3.line()
                .x(function(d) { return x(d.year) })
                .y(function(d) { return y(d.freq) })
            )
    })


}

function clickedVS() {
    vs.selectAll("*").transition(t).style("opacity", 1)
    nyt.selectAll("*").transition(t).style("opacity", 0)
    tc.selectAll("*").transition(t).style("opacity", 0)
}

function clickedNYT() {
    vs.selectAll("*").transition(t).style("opacity", 0)
    nyt.selectAll("*").transition(t).style("opacity", 1)
    tc.selectAll("*").transition(t).style("opacity", 0)
}

function clickedTC() {
    vs.selectAll("*").transition(t).style("opacity", 0)
    nyt.selectAll("*").transition(t).style("opacity", 0)
    tc.selectAll("*").transition(t).style("opacity", 1)
}

function showViz(name) {
    groupNodes.selectAll("*").transition(t).style("opacity", 0)
    groupNodes.selectAll("*").transition(t).style("display", "none")
    console.log(name);

    d3.select("#viz_title").transition(t).text(name + "'s viz")
    viz.selectAll("*").transition(t).style("opacity", 1);
    groupFact.selectAll("*").transition(t).style("opacity", 1);

    // Show last tweet of TechCrunch with the word
    showTweet(name);
    // Show peek year
    showPeekYear(name);
    //Show fun dact
    showFunFact(name);
    //Show VS
    showVS(name);
    //nyt
    createNYTGraph(name);
    //tc
    createTCGraph(name);

}

function goBack() {
    console.log("It's clicking")
    viz.selectAll("*").transition(t).style("opacity", 0);
    groupNodes.selectAll("*").transition(t).style("opacity", 1);
    groupNodes.selectAll("*").transition(t).style("display", "block")
    sliderTime.value(new Date(2010, 10, 3))
    gTime.style("opacity", 0)

    d3.select("#button2").selectAll("rect").attr("fill", defaultColor)
    d3.select("#button3").selectAll("rect").attr("fill", defaultColor)
    d3.select("#button1").selectAll("rect").attr("fill", pressedColor)
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
        d3.select("#tweet-date").transition(t).text(new Date(dataWord.date).toDateString());
        d3.select("#tweet-content").text(dataWord.content).call(wrap, 420).transition(t);

        viz.select("#group-twitter").transition(t).style("opacity", 1);
    } else {
        viz.select("#group-twitter").transition(t).style("opacity", 0);
    }
}

function showFunFact(name) {
    d3.json("./DATA/questions.json", function(error, data) {
        for (var i = 0; i < data.length; i++) {
            if (name == data[i].topic) {
                //paint people
                groupFact.selectAll("image").remove();
                let startX = 295,
                    startY = 80;
                for (let i = 0; i < 10; i++) {
                    groupFact.append("image").attr("class", "fact-person")
                        .attr("id", `fact-person_${i}`)
                        .attr("xlink:href", base_path_image + "man-color" + ".svg")
                        .style('opacity', 1)
                        .style("transform", `scale(0.17) 
                            translate(${startX + (i<5? 20*i: 20*(i-5))}em, 
                            ${(i<5? startY: startY+35)}em)`)
                }
                for (let j = data[i].result; j < 10; j++) {
                    groupFact.append("image").attr("class", "fact-person")
                        .attr("id", `fact-person_${i}`)
                        .attr("xlink:href", base_path_image + "man" + ".svg")
                        .style('opacity', 1)
                        .style("transform", `scale(0.17) 
                            translate(${startX + (j<5? 20*j: 20*(j-5))}em, 
                            ${(j<5? startY: startY+35)}em)`)
                }

                //set text
                d3.select("#fact-description").text(data[i].result + " " + data[i].question).call(wrap, 380);
                console.log(data[i].result + " " + data[i].question);
            }
        }
    })
}

function showVS(name) {
    d3.select("#button2").selectAll("rect").attr("fill", defaultColor)
    d3.select("#button3").selectAll("rect").attr("fill", defaultColor)
    d3.select("#button1").selectAll("rect").attr("fill", pressedColor)

    currentTopic = name;
    d3.json("./DATA/" + name + ".json", function(error, dataNYT) {
        d3.json("./DATA/TechCrunchDB_" + name + ".json", function(error, dataTC) {
            for (var i = 0; i < dataNYT.length; i++) {
                if (2010 == dataNYT[i].year) {
                    nyt_data = dataNYT[i].freq
                    for (var j = 0; j < dataTC.length; j++) {
                        if (2010 == dataTC[j].year) {
                            tc_data = dataTC[j].freq
                        }
                    }
                }
            }

            if (nyt_data == 0 && tc_data == 0) {
                d3.select("#nyt-number").text("NO DATA")
                d3.select("#tc-number").text("")
                arcGeneratorNYT.outerRadius(0);
                console.log(nyt_data)
                console.log("NYT: " + vsScale(nyt_data))
                console.log("TC: " + vsScale(tc_data))
                arcGeneratorTC.outerRadius(0);

                d3.select("#nyt-circle").attr("d", arcGeneratorNYT());
                d3.select("#tc-circle").attr("d", arcGeneratorTC());
            } else {
                d3.select("#nyt-number").text(nyt_data)
                d3.select("#tc-number").text(tc_data)
                vsScale.domain([1e-6, Math.max(nyt_data, tc_data)])
                arcGeneratorNYT.outerRadius(vsScale(nyt_data));
                console.log(nyt_data)
                console.log("NYT: " + vsScale(nyt_data))
                console.log("TC: " + vsScale(tc_data))
                arcGeneratorTC.outerRadius(vsScale(tc_data));

                d3.select("#nyt-circle").attr("d", arcGeneratorNYT());
                d3.select("#tc-circle").attr("d", arcGeneratorTC());
            }

        })
    })

    gTime.style("opacity", 1);

}

function updateVS(year) {
    console.log(year);
    d3.json("./DATA/" + currentTopic + ".json", function(error, dataNYT) {
        d3.json("./DATA/TechCrunchDB_" + currentTopic + ".json", function(error, dataTC) {
            for (var i = 0; i < dataNYT.length; i++) {
                if (year == dataNYT[i].year) {
                    nyt_data = dataNYT[i].freq
                    for (var j = 0; j < dataTC.length; j++) {
                        if (year == dataTC[j].year) {
                            tc_data = dataTC[j].freq
                        }
                    }
                }
            }

            if (nyt_data == 0 && tc_data == 0) {
                d3.select("#nyt-number").text("NO DATA")
                d3.select("#tc-number").text("")
                arcGeneratorNYT.outerRadius(0);
                console.log(nyt_data)
                console.log("NYT: " + vsScale(nyt_data))
                console.log("TC: " + vsScale(tc_data))
                arcGeneratorTC.outerRadius(0);

                d3.select("#nyt-circle").attr("d", arcGeneratorNYT());
                d3.select("#tc-circle").attr("d", arcGeneratorTC());
            } else {
                d3.select("#nyt-number").text(nyt_data)
                d3.select("#tc-number").text(tc_data)
                vsScale.domain([1e-6, Math.max(nyt_data, tc_data)])
                arcGeneratorNYT.outerRadius(vsScale(nyt_data));
                console.log(nyt_data)
                console.log("NYT: " + vsScale(nyt_data))
                console.log("TC: " + vsScale(tc_data))
                arcGeneratorTC.outerRadius(vsScale(tc_data));

                d3.select("#nyt-circle").attr("d", arcGeneratorNYT());
                d3.select("#tc-circle").attr("d", arcGeneratorTC());
            }


        })
    })
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