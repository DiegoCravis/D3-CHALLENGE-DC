var svgWidth = 960;
var svgHeight = 500;
var margin = {top: 20, right: 40, bottom: 60, left: 100};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartMain = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("../assets/data/data.csv").then(function(csvData) {
   csvData.forEach(function(info) {
    info.smokes = +info.smokes;
    info.age = +info.age;
  });


  var xLinearScale = d3.scaleLinear().range([0, width]);
  var yLinearScale = d3.scaleLinear().range([height, 0]);
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);
  var xMin;
  var xMax;
  var yMin;
  var yMax;
  
  xMin = d3.min(csvData, function(info) {
      return info.age;
  });
  
  xMax = d3.max(csvData, function(info) {
      return info.age;
  });
  
  yMin = d3.min(csvData, function(info) {
      return info.smokes;
  });
  
  yMax = d3.max(csvData, function(info) {
      return info.smokes;
  });
  
  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([yMin, yMax]);


  chartMain.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartMain.append("g")
    .call(leftAxis);


  var circles = chartMain.selectAll("circle")
  .data(csvData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.age +1.5))
  .attr("cy", d => yLinearScale(d.smokes +0.3))
  .attr("r", "12")
  .attr("fill", "#5F9EA0")
  .attr("opacity", .5)
  

  chartMain.append("text")
  .style("font-size", "12px")
  .selectAll("tspan")
  .data(csvData)
  .enter()
  .append("tspan")
      .attr("x", function(info) {
          return xLinearScale(info.age +1.3);
      })
      .attr("y", function(info) {
          return yLinearScale(info.smokes +.2);
      })
      .text(function(info) {
          return info.abbr
      });

  chartMain.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .text("Smokes (%)");

  chartMain.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top})`)
    .text("Age (median)");

});
