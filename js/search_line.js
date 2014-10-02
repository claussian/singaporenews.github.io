function updateData(frm){
  d3.csv("transposed_terms.csv", function(error, data){

    color.domain(d3.keys(
      data[0]).filter(function(key){ return key !== 'headline_year'; }
      )
    );

    var headline_terms = color.domain().map(function(term){
      return {
        term: term,
        values: data.map(function(d){
          return {year: d.headline_year, count: +d[term]};
        })
      };
    });

    used_data = headline_terms.filter(function(d){ return d.term == frm; });

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(used_data[0].values.map(function(d){ return d.year; }));

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

    var minY = d3.min(used_data, function(c){ return d3.min(c.values, function(v){
                  return v.count; });
                });

    var maxY = d3.max(used_data, function(c){ return d3.max(c.values, function(v){
                  return v.count; });
                });

    x.domain(used_data[0].values.map(function(d){ return d.year; }));

    y.domain([minY, maxY]);

    svg.select('.term_label')
      .transition()
      .duration(400)
      .text(frm);

    svg.selectAll('.y.axis')
      .transition()
      .duration(400)
      .call(yAxis);

    var terms = svg.selectAll('.terms');

    var termsLines = terms.selectAll('.line')
        .data(used_data);

    termsLines.enter().append('path')
        .transition()
        .duration(400)
        .attr('class', 'line')
        .attr('d', function(d){ return line(d.values); });

    termsLines.exit().transition().duration(400).remove();

    termsLines
      .transition()
      .duration(400)
      .attr('class', 'line')
      .attr('d', function(d){ return line(d.values); });

  });
};

function createChart(frm){
  d3.csv("transposed_terms.csv", function(error, data){

    color.domain(d3.keys(
      data[0]).filter(function(key){ return key !== 'headline_year'; }
      )
    );

    var headline_terms = color.domain().map(function(term){
      return {
        term: term,
        values: data.map(function(d){
          return {year: d.headline_year, count: +d[term]};
        })
      };
    });

    used_data = headline_terms.filter(function(d){ return d.term == frm; });

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(used_data[0].values.map(function(d){ return d.year; }));

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

    var minY = d3.min(used_data, function(c){ return d3.min(c.values, function(v){
                  return v.count; });
                });

    var maxY = d3.max(used_data, function(c){ return d3.max(c.values, function(v){
                  return v.count; });
                });

    x.domain(used_data[0].values.map(function(d){ return d.year; }));

    y.domain([minY, maxY]);

    var term_label = svg.selectAll('term_label')
        .data(used_data)
        .enter()
      .append('text')
        .attr('class', 'term_label')
        .attr("x", width / 2)
        .attr("y", -5)
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "#53565A")
        .transition()
        .duration(750)
        .text(function(d){ return d.term; });

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', function(d){
              return 'rotate(-65)'
            });

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Count');

    var terms = svg.append('g')
              .attr('class', 'terms');

    var termsLines = terms.selectAll('.line')
        .data(used_data);

    termsLines.enter().append('path')
        .attr('class', 'line');

    termsLines.exit().remove();

    termsLines
      .attr('d', function(d){ return line(d.values); });

  });
}