//<-----------------------------------------THIRD VIZ--------------------------------------------------------->
// VARIABLES ****************************************************
const width = 1450,
    height = 900;
let svgSolid, solid_group;

// SHOW THIRD VIZ ***********************************************
window.addEventListener("load", function() {
    svgSolid = d3.select("div.third_viz")
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", `0 0 ${width} ${height}`);

    solid_group = svgSolid.append("g").attr("id", "group-SOLID")
        .attr("transform", "translate(0, 23)");

    createGraph();
}, false);

// FUNCTIONS ****************************************************
function createGraph() {
    // SOLID logo
    solid_group.append("image").attr("id", "svg-SOLID-icon")
        .attr("xlink:href", base_path_image + "solid-logo" + ".svg");


    /*
    solid_group.append("circle").attr("id", "circle-SOLID")
        .attr("cx", 170).attr("cy", 240).attr("r", 280);
    */

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
    let images = [{ name: "privacy", type: "svg" },
        { name: "profile", type: "svg" }, { name: "database-storage", type: "svg" },
        { name: "inrupt", type: "png" }, { name: "empathy-imagotype-white", type: "png" },
        { name: "tim-berners-lee", type: "png" }
    ]

    images.forEach(image => {
        groupIcons.append("image").attr("id", `svg-SOLID-${image.name}-icon`)
            .attr("xlink:href", base_path_image + `${image.name}.${image.type}`);
    })
}