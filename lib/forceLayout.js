'use strict';

var accelerateLayout = require('./accelerateLayout');

module.exports = function(graph, id, size) {
  var div = d3.select('#' + id);
  var width = size.width, height = size.height;

  var force = d3.layout.force().gravity(0.2).charge(-500).linkDistance(60).size([width, height]);
  accelerateLayout(force);

  var svg = div.append('svg').attr('width', width).attr('height', height);

  force.nodes(graph.nodes).links(graph.links).start();

  var link = svg.selectAll('.link')
    .data(graph.links).enter()
    .append('line').attr('class', 'link');

  var node = svg.selectAll('.node')
    .data(graph.nodes).enter()
    .append('circle')
    .attr('class', function (d) { return 'node ' + d._labels[0]; })
    .attr('r', 10)
    .attr('x', Math.random() * width)
    .attr('y', Math.random() * height)
    .call(force.drag);

  // html title attribute
  node.append('title')
    .text(function (d) { return d.name || d.title; });
  // force feed algo ticks
  force.on('tick', function() {
    link.attr('x1', function(d) { return d.source.x; })
      .attr('y1', function(d) { return d.source.y; })
      .attr('x2', function(d) { return d.target.x; })
      .attr('y2', function(d) { return d.target.y; });

    node.attr('cx', function(d) { return d.x; })
      .attr('cy', function(d) { return d.y; });
  });
};
