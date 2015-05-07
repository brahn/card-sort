var SortVisualizer = (function () {

  var m_svg = null
  var m_width = null;
  var m_height = null;

  var setup = function () {
    m_width = $("#card-sort").width();
    m_height = $(window).height() - 200;
    m_svg = d3.select("div#card-sort")
      .append("svg")
      .attr("width", m_width)
      .attr("height", m_height)
  };

  var lineFunction = d3.svg.line()
    .x(function(d) { return d[0]; })
    .y(function(d) { return d[1]; })
    .interpolate("linear");

  var drawPolygon = function (lineData, color) {
    m_svg.append("path")
      .attr("d", lineFunction(lineData))
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("fill", "none");
  }

  var drawSort = function(sortData) {
    var paths = getSortPaths(sortData);

    var elts = paths.length;
    var steps = paths[0].length;
    var xSpacing = m_width / (steps - 1);
    var ySpacing = m_height / (elts - 1);

    for (var elt = 0; elt < elts; elt++) {
      var coords = coordsForPath(paths[elt], xSpacing, ySpacing);
      drawPolygon(coords, d3.hsl(360 * elt / elts, 0.6, 0.6));
    }
  };

  var coordsForPath = function (positions, xSpacing, ySpacing) {
    var result = [];
    for (var step = 0; step < positions.length ; step ++ ) {
      result.push([step * xSpacing, positions[step] * ySpacing]);
    };
    return result;
  };

  var getSortPaths = function (sortData) {
    var steps = sortData.length;
    var setSize = sortData[0].length;
    var paths = []
    for (var step = 0 ; step < steps ; step++) {
      for (var pos = 0; pos < setSize ; pos++) {
        var elt = sortData[step][pos]
        if (step == 0) {
          paths[elt] = []
        };
        paths[elt].push(pos)
      }
    }
    return paths;
  };

  return {
    setup: setup,
    drawPath: drawPolygon,
    drawSort: drawSort,
    coordsForPath: coordsForPath,
    getSortPaths: getSortPaths
  }

})();

$(document).ready(function () {
  SortVisualizer.setup();
  CardSort.init(52);
  CardSort.sort();
  SortVisualizer.drawSort(CardSort.steps());
})
