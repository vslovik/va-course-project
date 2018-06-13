/**
 * https://raw.githubusercontent.com/prcweb/d3-circularheat/master/js/circularHeatChart.js
 *
 * http://prcweb.co.uk/lab/circularheat
 *
 */
import {select, extent, arc, selectAll, scaleLinear} from 'd3'

export default class CircularHeatChart {

    constructor(selector, data)
    {
        this.selector = selector;
        [this.data]     = data;

        this.margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };

        this.innerRadius   = 50;
        this.numSegments   = 36;
        this.segmentHeight = 10;
        this.range         = ["white", "red"];

        this.radialLabels  = [];
        this.segmentLabels = [];
        this.domain        = null;

    }

    draw() {
        let chart = this;

        this.svg = select(this.selector)
            .selectAll('svg')
            .data([chart.data])
            .enter()
            .append('svg');

        this.svg.call(function(selection) { return chart.chart(selection)} );
    }

    setInnerRadius(innerRadius){
        this.innerRadius = innerRadius;

        return this;
    };

    setRange(range){
        this.range = range;

        return this;
    };

    setRadialLabels(radialLabels){
        this.radialLabels = radialLabels;

        return this;
    };

    setSegmentLabels(segmentLabels) {
        this.segmentLabels = segmentLabels;

        return this;
    };

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
            .selectAll("path").data(chart.data)
            .enter().append("path")
            .attr("d", this.getArc())
            .attr("fill", function(d) {return color(d);});

        return this;
    }

    chart(selection) {

        let chart = this;

        selection.each(function() {

            chart.id = Math.random().toString(36).substr(2, 9);

            chart.createSegments()
                .createRadialLabels()
                .createSegmentLabels()
        });
    }

    createRadialLabels() {
        let chart = this;

        let offset = chart.innerRadius + Math.ceil(chart.data.length / chart.numSegments) * chart.segmentHeight;

        let lsa = 0.01; //Label start angle
        this.labels = this.svg.append("g")
            .classed("labels", true)
            .classed("radial", true)
            .attr("transform", "translate(" + parseInt(this.margin.left + offset) + "," + parseInt(this.margin.top + offset) + ")");

        this.labels.selectAll("def")
            .data(this.radialLabels).enter()
            .append("def")
            .append("path")
            .attr("id", function(d, i) {return "radial-label-path-" + chart.id + "-" + i;})
            .attr("d", function(d, i) {
                let r = chart.innerRadius + ((i + 0.2) * chart.segmentHeight);
                return "m" + r * Math.sin(lsa) + " -" + r * Math.cos(lsa) +
                    " a" + r + " " + r + " 0 1 1 -1 0";
            });

        this.labels.selectAll("text")
            .data(this.radialLabels).enter()
            .append("text")
            .append("textPath")
            .attr("xlink:href", function(d, i) {return "#radial-label-path-" + chart.id + "-" + i;})
            .style("font-size", 0.6 * this.segmentHeight + 'px')
            .text(function(d) {return d;});

        return this;
    }

    createSegmentLabels() {

        let chart = this;

        let offset = chart.innerRadius + Math.ceil(chart.data.length / chart.numSegments) * chart.segmentHeight;

        let segmentLabelOffset = 2;
        let r = offset + segmentLabelOffset;

        this.labels = this.svg.append("g")
            .classed("labels", true)
            .classed("segment", true)
            .attr("transform", "translate(" + parseInt(this.margin.left + offset) + "," + parseInt(this.margin.top + offset) + ")");

        this.labels.append("def")
            .append("path")
            .attr("id", "segment-label-path-" + this.id)
            .attr("d", "m0 -" + r + " a" + r + " " + r + " 0 1 1 -1 0");

        this.labels.selectAll("text")
            .data(this.segmentLabels).enter()
            .append("text")
            .append("textPath")
            .attr("xlink:href", "#segment-label-path-" + this.id)
            .attr("startOffset", function(d, i) {return i * 100 / chart.numSegments + "%";})
            .text(function(d) {return d;});

        return this;
    }
}



