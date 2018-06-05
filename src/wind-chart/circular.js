//https://raw.githubusercontent.com/prcweb/d3-circularheat/master/js/circularHeatChart.js
// http://prcweb.co.uk/lab/circularheat/
import {select, extent, arc, selectAll, scaleLinear} from 'd3'

export default class circularHeatChart {

    constructor(data)
    {
        this.data = data;

        this.margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        };

        this.innerRadius = 50;
        this.numSegments = 36;
        this.segmentHeight = 20;
        this.range = ["white", "red"];

        this.radialLabels = [];
        this.segmentLabels = [];
        this.domain = null;

    }

    draw() {
        let chart = this;

        select('td.plot1')
            .selectAll('svg')
            .data(chart.data)
            .enter()
            .append('svg')
            .call(function(selection) { return chart.chart(selection)} );
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

    createSegments(svg, offset, data) {

        let color = this.getColorCallback(data);

        let chart = this;

        svg.append("g")
            .classed("circular-heat", true)
            .attr("transform", "translate(" + parseInt(this.margin.left + offset) + "," + parseInt(this.margin.top + offset) + ")")
            .selectAll("path").data(data)
            .enter().append("path")
            .attr("d", arc()
                .innerRadius(function(d, i){return chart.ir(d, i)})
                .outerRadius(function(d, i){return chart.or(d, i)})
                .startAngle(function(d, i){return chart.sa(d, i)})
                .endAngle(function(d, i){return chart.ea(d, i)}))
            .attr("fill", function(d) {return color(d);});

        return this;
    }

    chart(selection) {

        let chart = this;

        selection.each(function(data) {

            let svg = select(this);

            let offset = chart.innerRadius + Math.ceil(data.length / chart.numSegments) * chart.segmentHeight;

            chart.createSegments(svg, offset, data)
                .createLabels(svg, offset, data)
        });
    }

    createLabels(svg, offset, data) {
        let id = Math.random().toString(36).substr(2, 9);

        let labels = this.createRadialLabels(id, svg, offset, data);

        this.createSegmentLabels(labels, id, svg, offset, data)
    }

    createRadialLabels(id, svg, offset, data) {
        let chart = this;

        let lsa = 0.01; //Label start angle
        let labels = svg.append("g")
            .classed("labels", true)
            .classed("radial", true)
            .attr("transform", "translate(" + parseInt(this.margin.left + offset) + "," + parseInt(this.margin.top + offset) + ")");

        labels.selectAll("def")
            .data(this.radialLabels).enter()
            .append("def")
            .append("path")
            .attr("id", function(d, i) {return "radial-label-path-"+id+"-"+i;})
            .attr("d", function(d, i) {
                let r = chart.innerRadius + ((i + 0.2) * chart.segmentHeight);
                return "m" + r * Math.sin(lsa) + " -" + r * Math.cos(lsa) +
                    " a" + r + " " + r + " 0 1 1 -1 0";
            });

        labels.selectAll("text")
            .data(this.radialLabels).enter()
            .append("text")
            .append("textPath")
            .attr("xlink:href", function(d, i) {return "#radial-label-path-"+id+"-"+i;})
            .style("font-size", 0.6 * this.segmentHeight + 'px')
            .text(function(d) {return d;});

        return labels;
    }

    createSegmentLabels(labels, id, svg, offset, data) {

        let chart = this;

        let segmentLabelOffset = 2;
        let r = this.innerRadius + Math.ceil(data.length / chart.numSegments) * this.segmentHeight + segmentLabelOffset;

        labels = svg.append("g")
            .classed("labels", true)
            .classed("segment", true)
            .attr("transform", "translate(" + parseInt(this.margin.left + offset) + "," + parseInt(this.margin.top + offset) + ")");

        labels.append("def")
            .append("path")
            .attr("id", "segment-label-path-"+id)
            .attr("d", "m0 -" + r + " a" + r + " " + r + " 0 1 1 -1 0");

        labels.selectAll("text")
            .data(this.segmentLabels).enter()
            .append("text")
            .append("textPath")
            .attr("xlink:href", "#segment-label-path-"+id)
            .attr("startOffset", function(d, i) {return i * 100 / chart.numSegments + "%";})
            .text(function(d) {return d;});
    }
}



