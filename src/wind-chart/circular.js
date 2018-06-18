/**
 * https://raw.githubusercontent.com/prcweb/d3-circularheat/master/js/circularHeatChart.js
 *
 * http://prcweb.co.uk/lab/circularheat
 *
 */
import {select, extent, arc, scaleLinear, range} from 'd3'

export default class CircularHeatChart {

    constructor(selector, data)
    {
        this.selector = selector;
        this.data     = data;

        this.margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        };

        this.innerRadius   = 20;
        this.numSegments   = 36;
        this.segmentHeight = 10;
        this.range         = ["white", "grey"]; // "steelblue"

        this.radialLabels  = [];
        this.domain        = null;

        this.width  = 220;
        this.height = 250;

        let chart = this;

        this.svg = select(this.selector)
            .append('svg')
            .attr('class', 'wind-chart')
            .attr('width', this.width)
            .attr('height', this.height)
            .data([chart.data])
        ;

        this.id = Math.random().toString(36).substr(2, 9);

        this.init();
    }

    init() {
        this
            .createSegments()
            .addAngleLabels()
            .addRadialLabels()
            .addWindRadialLabels()
    }

    ir(d, i) {

        return this.innerRadius + Math.floor(i/this.numSegments) * this.segmentHeight;
    };

    or(d, i) {
        return this.innerRadius
            + this.segmentHeight
            + Math.floor(i/this.numSegments) * this.segmentHeight;
    };

    sa(d, i) {
        return (i * 2 * Math.PI) / this.numSegments;
    };

    ea(d, i) {
        return ((i + 1) * 2 * Math.PI) / this.numSegments;
    };

    getColorCallback(data)
    {
        this.autoDomain = false;
        if (this.domain === null) {
            this.domain = extent(data, function(d){return d;});
            this.autoDomain = true;
        }

        let color = scaleLinear().domain(this.domain).range(this.range);

        if(this.autoDomain)
            this.domain = null;

        return color;
    }

    getArc() {

        let chart = this;

        return arc()
            .innerRadius(function(d, i){return chart.ir(d, i)})
            .outerRadius(function(d, i){return chart.or(d, i)})
            .startAngle(function(d, i){return chart.sa(d, i)})
            .endAngle(function(d, i){return chart.ea(d, i)});
    }

    createSegments() {

        let chart = this;

        let color = this.getColorCallback(chart.data);

        let offset = chart.innerRadius + Math.ceil(chart.data.length / chart.numSegments) * chart.segmentHeight;

        this.svg.append("g")
            .classed("circular-heat", true)
            .attr("transform", "translate(" + parseInt(this.margin.left + offset) + "," + parseInt(this.margin.top + offset) + ")")
            .selectAll("path")
            .data(chart.data)
            .enter()
            .append("path")
            .attr("d", this.getArc())
            .attr("fill", function(d) {
                return color(d);
            });

        return this;
    }

    addWindRadialLabels() {
        let chart = this;

        let offset = chart.innerRadius + Math.ceil(chart.data.length / chart.numSegments) * chart.segmentHeight;

        const lsa = 0.0; //Label start angle

        const radiallabels = [0, 1, 2, 3, 4, 5, 6];

        this.labels = this.svg.append("g")
            .classed("labels", true)
            .classed("radial", true)
            .attr("transform", "translate(" + parseInt(this.margin.left + offset) + "," + parseInt(this.margin.top + offset) + ")");

        this.labels.selectAll("def")
            .data(radiallabels).enter()
            .append("def")
            .append("path")
            .attr("id", function(d, i) {return "radial-label-path-" + chart.id + "-" + i;})
            .attr("d", function(d, i) {
                let r = chart.innerRadius + ((i + 0.2) * chart.segmentHeight);
                return "m" + r * Math.sin(lsa) + " -" + r * Math.cos(lsa) +
                    " a" + r + " " + r + " 0 1 1 -1 0";
            });

        this.labels.selectAll("text")
            .data(radiallabels).enter()
            .append("text")
            .append("textPath")
            .attr("xlink:href", function(d, i) {return "#radial-label-path-" + chart.id + "-" + i;})
            .style("font-size", 0.6 * this.segmentHeight + 'px')
            .text(function(d) {return d;});

        return this;
    }

    addRadialLabels() {

        let chart = this;

        this.radius = Math.min(this.width, this.height) / 2 - 22;

        this.r = scaleLinear()
            .domain([0, 1.2])
            .range([chart.innerRadius, chart.innerRadius + 6*this.segmentHeight]);

        this.gr = this.svg.append("g")
            .attr("transform", "translate(" + (this.width / 2) + "," + (-15 + this.height / 2) + ")")
            .attr("class", "r axis")
            .selectAll("g")
            .data(this.r.ticks(5))
            .enter().append("g");

        this.gr.append("text")
            .attr("y", function(d) { return - chart.r(d) - 2; })
            .attr("transform", "rotate(30)")
            .style("font-size", 0.6 * this.segmentHeight + 'px')
            .text(function(d) { return d; });

        return this;
    }


    addAngleLabels() {

        let chart = this;

        this.radius = Math.min(this.width, this.height) / 2 - 22;

        this.ga = this.svg.append("g")
            .attr("transform", "translate(" + (this.width / 2) + "," + (-15 + this.height / 2) + ")")
            .attr("class", "a axis")
            .selectAll("g")
            .data(range(0, 360, 30))
            .enter().append("g")
            .attr("transform", function(d) { return "rotate(" + -d + ")"; })
        ;

        this.ga.append("text")
            .attr("x", this.radius + 6)
            .attr("dy", ".6em")
            .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
            .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (chart.radius + 6) + ",0)" : null; })
            .text(function(d) { return (d <= 90 ? 90 - d : (360 + 90 - d)) + "°"; });

        return this;
    }
}



