//<-----------------------------------------THIRD VIZ--------------------------------------------------------->
// VARIABLES ****************************************************
const width = 750,
    height = 700;
let svgSolid, solid_group;
let tooltip;

let imagesAttributes = [{ name: "privacy", type: "svg" },
    { name: "profile", type: "svg" },
    { name: "database-storage", type: "svg" },
    { name: "inrupt", type: "png" },
    { name: "empathy-imagotype-white", type: "png" },
    { name: "tim-berners-lee", type: "png" }
];

let imagesText = {
    "privacy": "Users <span class='highlight'>control</span> their data and decide to <span class='highlight'>whom</span> they share it",
    "profile": "<span class='highlight'>Apps</span> can access to user information from any Pod, only with  <span class='highlight'>user permission</span>",
    "database-storage": "Pods <span class='highlight'>store</span> user data in an <span class='highlight'>interoperable format</span> and provide users with control permissions",
    "inrupt": "There are some <span class='highlight'>Pod Providers</span> where you can create your Pod, such as <a href='https://inrupt.com/solid/' target='blank'>Inrupt</a>.  You could also self-host your own Pod running a Pod Server",
    "empathy-imagotype-white": "<span class='highlight'>Empathy</span> believes in this specification, as the company is developing some projects like <a href='https://ohmypod.netlify.app' target='blank'>OhMyPod</a> or <a target='blank' href='https://kala.empathy.co/'>Kala.</a>",
    "tim-berners-lee": "Solid is a project led by <span class='highlight'>Tim Berners-Lee</span>, the World Wide Web inventor.  It realizes his <span class='highlight'>original vision</span> of the Web."
}

// SHOW THIRD VIZ ***********************************************
window.addEventListener("load", function() {
    svgSolid = d3.select("#SOLID-content")
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", `0 0 ${width} ${height}`);

    solid_group = svgSolid.append("g").attr("id", "group-SOLID")
        .attr("transform", "translate(0, 23)");

    tooltip = d3.select("#SOLID_tooltip_wrapper");

    createGraph();
}, false);

// FUNCTIONS ****************************************************
function createGraph() {
    // SOLID logo
    solid_group.append("image").attr("id", "svg-SOLID-icon")
        .attr("xlink:href", base_path_image + "solid-logo" + ".svg");

    // Lines
    createLines();
    createIcons();
}

function createLines() {
    let groupLines = solid_group.append("g").attr("id", "group-SOLID-lines");
    groupLines.append("line").attr("class", "line-SOLID")
        .attr("x1", 165)
        .attr("x2", 165)
        .attr("y1", 170)
        .attr("y2", 5);
    groupLines.append("line").attr("class", "line-SOLID")
        .attr("x1", 230)
        .attr("x2", 380)
        .attr("y1", 205)
        .attr("y2", 130);

    groupLines.append("line").attr("class", "line-SOLID")
        .attr("x1", 230)
        .attr("x2", 380)
        .attr("y1", 275)
        .attr("y2", 350);

    groupLines.append("line").attr("class", "line-SOLID")
        .attr("x1", 165)
        .attr("x2", 165)
        .attr("y1", 310)
        .attr("y2", 470);

    groupLines.append("line").attr("class", "line-SOLID")
        .attr("x1", 110)
        .attr("x2", -40)
        .attr("y1", 275)
        .attr("y2", 350);

    groupLines.append("line").attr("class", "line-SOLID")
        .attr("x1", 110)
        .attr("x2", -40)
        .attr("y1", 205)
        .attr("y2", 130);
}

function createIcons() {
    let groupIcons = solid_group.append("g").attr("id", "group-SOLID-data");

    imagesAttributes.forEach(image => {
        groupIcons.append("image").attr("id", `svg-SOLID-${image.name}-icon`)
            .attr("xlink:href", base_path_image + `${image.name}.${image.type}`)
            .on("mouseover", () => showTooltip(d3.event.pageX, d3.event.pageY, image.name));
    })
}

function showTooltip(x, y, imageName) {
    tooltip.transition()
        .duration(100)
        .style("opacity", "1");

    tooltip.style("left", (x) + "px")
        .style("top", (y) + "px");

    tooltip.select("#SOLID_tooltip").html(imagesText[imageName]);

}

function hideTooltip() {
    tooltip.transition()
        .duration(500)
        .style("opacity", 0);
}

function showInfo(image) {

}