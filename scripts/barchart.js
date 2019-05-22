function drawBarChart(data, allowedKeys, element, pokemonNum) {

    if (d3.select(`#barchart${pokemonNum}`)) {
        d3.select(`#pokemon${pokemonNum}data`).selectAll("*").remove()
    }

    var marginBar = {
        top: 25,
        right: 25,
        bottom: 25,
        left: 60
    };

    var widthBar = 300 - marginBar.left - marginBar.right,
        heightBar = 250 - marginBar.top - marginBar.bottom;

    var svgBar = d3.select(element).append("svg")
        .attr("width", widthBar + marginBar.left + marginBar.right)
        .attr("height", heightBar + marginBar.top + marginBar.bottom)
        .attr("id", `#barchart${pokemonNum}`)
        .append("g")
        .attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")")

    var x = d3.scale.linear()
        .range([0, widthBar])
        .domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

    var y = d3.scale.ordinal()
        .rangeRoundBands([heightBar, 0], .1)
        .domain(data.map(function (d) {
            return d.axis;
        }));

    var colorBarFill = d3.scale.ordinal()
        .domain(allowedKeys)
        .range(["#FF0000", "#F08030", "#DF9A57", "#6890F0", "#78C850", "#F85888"]);

    var colorBarBorder = d3.scale.ordinal()
        .domain(allowedKeys)
        .range(["#A60000", "#9C531F", "#A1871F", "#445E9C", "#4E8234", "#A13959"]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .tickSize(0)
        .orient("left");

    svgBar.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    var bars = svgBar.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

    bars.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return y(d.axis);
        })
        .attr("height", y.rangeBand())
        .attr("x", 0)
        .attr("width", 0)
        .attr("fill", function (d) {
            return colorBarFill(d.axis)
        })
        .attr("stroke", function (d) {
            return colorBarBorder(d.axis)
        })
        .attr("width", 0)
        .transition()
        .duration(1000)
        .attr("width", function (d) {
            return x(d.value);
        });

    bars.append("text")
        .style("opacity", 0)
        .transition()
        .duration(300)
        .delay(1000)
        .style("opacity", 1)
        .attr("class", "label")
        .attr("y", function (d) {
            return y(d.axis) + y.rangeBand() / 2 + 4;
        })
        .attr("x", function (d) {
            return x(d.value) + 3;
        })
        .text(function (d) {
            return d.value;
        });
}