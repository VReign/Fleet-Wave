function dashWidgetMeter() {
  var el = d3.select('#widget-meter');

  var needle, barWidth, chart, chartInset, degToRad, repaintGauge,
      height, numSections, padRad, percToDeg, percToRad,
      percent, radius, svg, totalPercent, width;

  percent = .8;
  numSections = 2;
  sectionPerc = 1 / numSections / 2;
  padRad = 0;
  chartInset = 0;

  // Orientation of gauge:
  totalPercent = .75;


  //width = el[0][0].offsetWidth - margin.left - margin.right;
  width = 100;
  height = width;
  radius = Math.min(width, height) / 2;
  barWidth = 40 * width / 360;

  var color = d3.scale.linear()
  .domain([0, .2, 1])
  .range(['#e72727', '#ff931e', '#e72727']);

  /*
         Utility methods
         */
  percToDeg = function (perc) {
    return perc * 360;
  };

  percToRad = function (perc) {
    return degToRad(percToDeg(perc));
  };

  degToRad = function (deg) {
    return deg * Math.PI / 180;
  };

  // Create SVG element
  svg = el.append('svg').attr('viewBox', '0 0 ' + width + ' ' + height);

  // Add layer for the panel
  chart = svg.append('g').attr('transform', "translate(" + (width / 2) + ", " + (75) + ")");
  var arcFilled = chart.append('path').attr('class', "arc chart-filled"),
      arcEmpty = chart.append('path').attr('class', "arc chart-empty"),
      labelGroup = svg.append('g'),
      percLabel = svg.append('text')
  .attr('class', 'label-percent')
  .text(Math.round(percent * 100) + '%'),
      percLabelBBox = percLabel.node().getBBox();

  percLabel
    .attr('x', (width / 2) - (percLabelBBox.width / 2))
    .attr('y', 100);

  arc2 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);
  arc1 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);


  repaintGauge = function (perc) {
    var next_start = totalPercent,
        arcStartRad1 = percToRad(next_start),
        arcEndRad1 = arcStartRad1 + percToRad(perc / 2);

    arc1.startAngle(arcStartRad1).endAngle(arcEndRad1);

    next_start += perc / 2;

    arcStartRad2 = percToRad(next_start);
    arcEndRad2 = arcStartRad2 + percToRad((1 - perc) / 2);

    arc2.startAngle(arcStartRad2 + padRad).endAngle(arcEndRad2);

    arcFilled.attr('d', arc1)
      .attr("fill", function () {
      //console.log('color = ' + color(Math.round(perc * 100)));
      return color(perc);
    });
    arcEmpty.attr('d', arc2);

  };


  var Needle = (function () {

    /**
             * Helper function that returns the `d` value
             * for moving the needle
             **/
    var recalcPointerPos = function (perc) {
      var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
      thetaRad = percToRad(perc / 2);
      centerX = 0;
      centerY = 0;
      topX = centerX - this.len * Math.cos(thetaRad);
      topY = centerY - this.len * Math.sin(thetaRad);
      leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
      leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
      rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
      rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
      return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
    };

    function Needle(el) {
      this.el = el;
      this.len = width / 2;
      this.radius = this.len / 8;
    }

    Needle.prototype.render = function () {
      this.el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius);
      return this.el.append('path').attr('class', 'needle').attr('d', recalcPointerPos.call(this, 0));
    };

    Needle.prototype.moveTo = function (perc) {
      var self = this;
      //oldValue = this.perc || 0;

      this.perc = perc;
      // Reset pointer position
      //this.el.transition().ease('quad').duration(200).select('.needle').tween('reset-progress', function () {
      //    return function (percentOfPercent) {
      //        var progress = (1 - percentOfPercent) * oldValue;
      //
      //        //repaintGauge(progress);
      //        return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
      //    };
      //});

      this.el.transition().duration(1500).select('.needle').tween('progress', function () {
        return function (percentOfPercent) {
          var progress = percentOfPercent * perc;

          repaintGauge(progress);
          return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
        };
      });

    };

    return Needle;
  
  })();

  needle = new Needle(chart);
  needle.render();
  needle.moveTo(percent);
}
function dashWidgetMeter2() {
  var el = d3.select('#widget-meter2');

  var needle, barWidth, chart, chartInset, degToRad, repaintGauge,
      height, numSections, padRad, percToDeg, percToRad,
      percent, radius, svg, totalPercent, width;

  percent = .8;
  numSections = 2;
  sectionPerc = 1 / numSections / 2;
  padRad = 0;
  chartInset = 0;

  // Orientation of gauge:
  totalPercent = .75;


  //width = el[0][0].offsetWidth - margin.left - margin.right;
  width = 100;
  height = width;
  radius = Math.min(width, height) / 2;
  barWidth = 40 * width / 360;

  var color = d3.scale.linear()
  .domain([0, .2, 1])
  .range(['#03e8fc', '#03cefc', '#0a8cd1']);

  /*
         Utility methods
         */
  percToDeg = function (perc) {
    return perc * 360;
  };

  percToRad = function (perc) {
    return degToRad(percToDeg(perc));
  };

  degToRad = function (deg) {
    return deg * Math.PI / 180;
  };

  // Create SVG element
  svg = el.append('svg').attr('viewBox', '0 0 ' + width + ' ' + height);

  // Add layer for the panel
  chart = svg.append('g').attr('transform', "translate(" + (width / 2) + ", " + (75) + ")");
  var arcFilled = chart.append('path').attr('class', "arc chart-filled"),
      arcEmpty = chart.append('path').attr('class', "arc chart-empty"),
      labelGroup = svg.append('g'),
      percLabel = svg.append('text')
  .attr('class', 'label-percent')
  .text(Math.round(percent * 100) + '%'),
      percLabelBBox = percLabel.node().getBBox();

  percLabel
    .attr('x', (width / 2) - (percLabelBBox.width / 2))
    .attr('y', 100);

  arc2 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);
  arc1 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);


  repaintGauge = function (perc) {
    var next_start = totalPercent,
        arcStartRad1 = percToRad(next_start),
        arcEndRad1 = arcStartRad1 + percToRad(perc / 2);

    arc1.startAngle(arcStartRad1).endAngle(arcEndRad1);

    next_start += perc / 2;

    arcStartRad2 = percToRad(next_start);
    arcEndRad2 = arcStartRad2 + percToRad((1 - perc) / 2);

    arc2.startAngle(arcStartRad2 + padRad).endAngle(arcEndRad2);

    arcFilled.attr('d', arc1)
      .attr("fill", function () {
      //console.log('color = ' + color(Math.round(perc * 100)));
      return color(perc);
    });
    arcEmpty.attr('d', arc2);

  };


  var Needle = (function () {

    /**
             * Helper function that returns the `d` value
             * for moving the needle
             **/
    var recalcPointerPos = function (perc) {
      var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
      thetaRad = percToRad(perc / 2);
      centerX = 0;
      centerY = 0;
      topX = centerX - this.len * Math.cos(thetaRad);
      topY = centerY - this.len * Math.sin(thetaRad);
      leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
      leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
      rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
      rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
      return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
    };

    function Needle(el) {
      this.el = el;
      this.len = width / 2;
      this.radius = this.len / 8;
    }

    Needle.prototype.render = function () {
      this.el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius);
      return this.el.append('path').attr('class', 'needle').attr('d', recalcPointerPos.call(this, 0));
    };

    Needle.prototype.moveTo = function (perc) {
      var self = this;
      //oldValue = this.perc || 0;

      this.perc = perc;
      // Reset pointer position
      //this.el.transition().ease('quad').duration(200).select('.needle').tween('reset-progress', function () {
      //    return function (percentOfPercent) {
      //        var progress = (1 - percentOfPercent) * oldValue;
      //
      //        //repaintGauge(progress);
      //        return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
      //    };
      //});

      this.el.transition().duration(1500).select('.needle').tween('progress', function () {
        return function (percentOfPercent) {
          var progress = percentOfPercent * perc;

          repaintGauge(progress);
          return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
        };
      });

    };

    return Needle;
  
  })();

  needle = new Needle(chart);
  needle.render();
  needle.moveTo(percent);
}
function dashWidgetMeter3() {
  var el = d3.select('#widget-meter3');

  var needle, barWidth, chart, chartInset, degToRad, repaintGauge,
      height, numSections, padRad, percToDeg, percToRad,
      percent, radius, svg, totalPercent, width;

  percent = .8;
  numSections = 2;
  sectionPerc = 1 / numSections / 2;
  padRad = 0;
  chartInset = 0;

  // Orientation of gauge:
  totalPercent = .75;


  //width = el[0][0].offsetWidth - margin.left - margin.right;
  width = 100;
  height = width;
  radius = Math.min(width, height) / 2;
  barWidth = 40 * width / 360;

  var color = d3.scale.linear()
  .domain([0, .2, 1])
  .range(['#e72727', '#ff931e', '#e72727']);

  /*
         Utility methods
         */
  percToDeg = function (perc) {
    return perc * 360;
  };

  percToRad = function (perc) {
    return degToRad(percToDeg(perc));
  };

  degToRad = function (deg) {
    return deg * Math.PI / 180;
  };

  // Create SVG element
  svg = el.append('svg').attr('viewBox', '0 0 ' + width + ' ' + height);

  // Add layer for the panel
  chart = svg.append('g').attr('transform', "translate(" + (width / 2) + ", " + (75) + ")");
  var arcFilled = chart.append('path').attr('class', "arc chart-filled"),
      arcEmpty = chart.append('path').attr('class', "arc chart-empty"),
      labelGroup = svg.append('g'),
      percLabel = svg.append('text')
  .attr('class', 'label-percent')
  .text(Math.round(percent * 100) + '%'),
      percLabelBBox = percLabel.node().getBBox();

  percLabel
    .attr('x', (width / 2) - (percLabelBBox.width / 2))
    .attr('y', 100);

  arc2 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);
  arc1 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);


  repaintGauge = function (perc) {
    var next_start = totalPercent,
        arcStartRad1 = percToRad(next_start),
        arcEndRad1 = arcStartRad1 + percToRad(perc / 2);

    arc1.startAngle(arcStartRad1).endAngle(arcEndRad1);

    next_start += perc / 2;

    arcStartRad2 = percToRad(next_start);
    arcEndRad2 = arcStartRad2 + percToRad((1 - perc) / 2);

    arc2.startAngle(arcStartRad2 + padRad).endAngle(arcEndRad2);

    arcFilled.attr('d', arc1)
      .attr("fill", function () {
      //console.log('color = ' + color(Math.round(perc * 100)));
      return color(perc);
    });
    arcEmpty.attr('d', arc2);

  };


  var Needle = (function () {

    /**
             * Helper function that returns the `d` value
             * for moving the needle
             **/
    var recalcPointerPos = function (perc) {
      var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
      thetaRad = percToRad(perc / 2);
      centerX = 0;
      centerY = 0;
      topX = centerX - this.len * Math.cos(thetaRad);
      topY = centerY - this.len * Math.sin(thetaRad);
      leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
      leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
      rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
      rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
      return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
    };

    function Needle(el) {
      this.el = el;
      this.len = width / 2;
      this.radius = this.len / 8;
    }

    Needle.prototype.render = function () {
      this.el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius);
      return this.el.append('path').attr('class', 'needle').attr('d', recalcPointerPos.call(this, 0));
    };

    Needle.prototype.moveTo = function (perc) {
      var self = this;
      //oldValue = this.perc || 0;

      this.perc = perc;
      // Reset pointer position
      //this.el.transition().ease('quad').duration(200).select('.needle').tween('reset-progress', function () {
      //    return function (percentOfPercent) {
      //        var progress = (1 - percentOfPercent) * oldValue;
      //
      //        //repaintGauge(progress);
      //        return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
      //    };
      //});

      this.el.transition().duration(1500).select('.needle').tween('progress', function () {
        return function (percentOfPercent) {
          var progress = percentOfPercent * perc;

          repaintGauge(progress);
          return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
        };
      });

    };

    return Needle;
  
  })();

  needle = new Needle(chart);
  needle.render();
  needle.moveTo(percent);
}

function dashWidgetMeter4() {
  var el = d3.select('#widget-meter4');

  var needle, barWidth, chart, chartInset, degToRad, repaintGauge,
      height, numSections, padRad, percToDeg, percToRad,
      percent, radius, svg, totalPercent, width;

  percent = .8;
  numSections = 2;
  sectionPerc = 1 / numSections / 2;
  padRad = 0;
  chartInset = 0;

  // Orientation of gauge:
  totalPercent = .75;


  //width = el[0][0].offsetWidth - margin.left - margin.right;
  width = 100;
  height = width;
  radius = Math.min(width, height) / 2;
  barWidth = 40 * width / 360;

  var color = d3.scale.linear()
  .domain([0, .2, 1])
  .range(['#03e8fc', '#03cefc', '#0a8cd1']);

  /*
         Utility methods
         */
  percToDeg = function (perc) {
    return perc * 360;
  };

  percToRad = function (perc) {
    return degToRad(percToDeg(perc));
  };

  degToRad = function (deg) {
    return deg * Math.PI / 180;
  };

  // Create SVG element
  svg = el.append('svg').attr('viewBox', '0 0 ' + width + ' ' + height);

  // Add layer for the panel
  chart = svg.append('g').attr('transform', "translate(" + (width / 2) + ", " + (75) + ")");
  var arcFilled = chart.append('path').attr('class', "arc chart-filled"),
      arcEmpty = chart.append('path').attr('class', "arc chart-empty"),
      labelGroup = svg.append('g'),
      percLabel = svg.append('text')
  .attr('class', 'label-percent')
  .text(Math.round(percent * 100) + '%'),
      percLabelBBox = percLabel.node().getBBox();

  percLabel
    .attr('x', (width / 2) - (percLabelBBox.width / 2))
    .attr('y', 100);

  arc2 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);
  arc1 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth);


  repaintGauge = function (perc) {
    var next_start = totalPercent,
        arcStartRad1 = percToRad(next_start),
        arcEndRad1 = arcStartRad1 + percToRad(perc / 2);

    arc1.startAngle(arcStartRad1).endAngle(arcEndRad1);

    next_start += perc / 2;

    arcStartRad2 = percToRad(next_start);
    arcEndRad2 = arcStartRad2 + percToRad((1 - perc) / 2);

    arc2.startAngle(arcStartRad2 + padRad).endAngle(arcEndRad2);

    arcFilled.attr('d', arc1)
      .attr("fill", function () {
      //console.log('color = ' + color(Math.round(perc * 100)));
      return color(perc);
    });
    arcEmpty.attr('d', arc2);

  };


  var Needle = (function () {

    /**
             * Helper function that returns the `d` value
             * for moving the needle
             **/
    var recalcPointerPos = function (perc) {
      var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
      thetaRad = percToRad(perc / 2);
      centerX = 0;
      centerY = 0;
      topX = centerX - this.len * Math.cos(thetaRad);
      topY = centerY - this.len * Math.sin(thetaRad);
      leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
      leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
      rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
      rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
      return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
    };

    function Needle(el) {
      this.el = el;
      this.len = width / 2;
      this.radius = this.len / 8;
    }

    Needle.prototype.render = function () {
      this.el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius);
      return this.el.append('path').attr('class', 'needle').attr('d', recalcPointerPos.call(this, 0));
    };

    Needle.prototype.moveTo = function (perc) {
      var self = this;
      //oldValue = this.perc || 0;

      this.perc = perc;
      // Reset pointer position
      //this.el.transition().ease('quad').duration(200).select('.needle').tween('reset-progress', function () {
      //    return function (percentOfPercent) {
      //        var progress = (1 - percentOfPercent) * oldValue;
      //
      //        //repaintGauge(progress);
      //        return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
      //    };
      //});

      this.el.transition().duration(1500).select('.needle').tween('progress', function () {
        return function (percentOfPercent) {
          var progress = percentOfPercent * perc;

          repaintGauge(progress);
          return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
        };
      });

    };

    return Needle;
  
  })();

  needle = new Needle(chart);
  needle.render();
  needle.moveTo(percent);
}





