function timelapse(cellData, params){

var margin = params.margin, width = params.width, height = params.height;
var divID = params.divID;

var tl_radius = 5;

var graph_width = width + margin.right + margin.left;
var graph_height = height + margin.top + margin.bottom;

var tl_xscale = d3.scale.linear().range([0,width]);

var tl_div = d3.select("#"+divID);

// insert svg container
var tl_svg = tl_div.append("svg:svg")
  .attr("class","timelapse")
  .attr("width",graph_width)
  .attr("height",graph_height)
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// ----------------------------------------------------------------------------
// define svg-line : horizontal bar
  tl_svg.append("svg:line")
    .attr("x1",0)
    .attr("x2",width)
    .attr("y1", height/2)
    .attr("y2", height/2)
    .attr("stroke","#000")
    .attr("stroke-width",2)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// ----------------------------------------------------------------------------
// Define LINEAR SCALE:
var timelapse_svg = tl_svg;
var bbox_timelapse_svg = timelapse_svg.node().getBBox();  // gives (x,y) coords, but not (height,width)
var bbox_width = bbox_timelapse_svg.width;//+timelapse_svg.node().getAttribute("width");
var bbox_height = +timelapse_svg.node().getAttribute("height");

// define linear scale to map: [length of timeseries array] to [dimension of visual svg element]
var tl_scale = d3.scale.linear().range([bbox_timelapse_svg.x, bbox_timelapse_svg.x + bbox_width]).domain([0,(cellData[1].voltSig.length)]);

// ----------------------------------------------------------------------------
// define CIRCULAR CURSOR
var tl_circle = timelapse_svg.append("circle")
  .attr("class","tl_circle")
  .attr("cx", bbox_timelapse_svg.x) // x_coord determined by time_index
	.attr("cy",bbox_timelapse_svg.y ) // y_coord determined by the height of the svg_element.
	.attr("fill", "black")
	.attr("r", tl_radius);

return tl_scale;
}
