//https://raw.githubusercontent.com/prcweb/d3-circularheat/master/js/circularHeatChart.js
// http://prcweb.co.uk/lab/circularheat/
import {select, extent, arc, selectAll, scaleLinear} from 'd3'



    let margin = {top: 20, right: 20, bottom: 20, left: 20},
        innerRadius = 50,
        numSegments = 36,
        segmentHeight = 20,
        range = ["white", "red"],
        accessor = function(d) {return d;};
        let radialLabels = [];
        let segmentLabels = [];


export default class circularHeatChart {
    constructor(data)
    {
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

        let chart = this;

        let svg = select('td.plot1')
            .selectAll('svg')
            .data(data)
            .enter()
            .append('svg')
            .call(function(selection) { return chart.chart(selection)} );
    }

    static accessor(d) {return d;};

    ir(d, i) {

        return this.innerRadius + Math.floor(i/numSegments) * segmentHeight;
    };

    or(d, i) {
        return innerRadius + segmentHeight + Math.floor(i/numSegments) * segmentHeight;
    };

    sa(d, i) {
        return (i * 2 * Math.PI) / numSegments;
    };

    ea(d, i) {
        return ((i + 1) * 2 * Math.PI) / numSegments;
    };

    getColorCallback(data)
    {
        this.autoDomain = false;
        if (this.domain === null) {
            this.domain = extent(data, accessor);
            this.autoDomain = true;
        }

        let color = scaleLinear().domain(this.domain).range(range);

        if(this.autoDomain)
            this.domain = null;

        return color;
    }

    draw(svg, offset, data) {

        let color = this.getColorCallback(data);

        let chart = this;

        svg.append("g")
            .classed("circular-heat", true)
            .attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")")
            .selectAll("path").data(data)
            .enter().append("path")
            .attr("d", arc().innerRadius(function(d, i){return chart.ir(d, i)}).outerRadius(this.or).startAngle(this.sa).endAngle(this.ea))
            .attr("fill", function(d) {return color(accessor(d));});

        this.createLabels(svg, offset, data);
    }

    chart(selection) {

        let chart = this;

        selection.each(function(data) {

            let svg = select(this);

            let offset = chart.innerRadius + Math.ceil(data.length / numSegments) * segmentHeight;

            chart.draw(svg, offset, data)
        });
    }

    createLabels(svg, offset, data) {
        let id = Math.random().toString(36).substr(2, 9);

        let labels = this.createRadialLabels(id, svg, offset, data);

        this.createSegmentLabels(labels, id, svg, offset, data)
    }

    createRadialLabels(id, svg, offset, data) {
        let lsa = 0.01; //Label start angle
        let labels = svg.append("g")
            .classed("labels", true)
            .classed("radial", true)
            .attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");

        labels.selectAll("def")
            .data(radialLabels).enter()
            .append("def")
            .append("path")
            .attr("id", function(d, i) {return "radial-label-path-"+id+"-"+i;})
            .attr("d", function(d, i) {
                let r = innerRadius + ((i + 0.2) * segmentHeight);
                return "m" + r * Math.sin(lsa) + " -" + r * Math.cos(lsa) +
                    " a" + r + " " + r + " 0 1 1 -1 0";
            });

        labels.selectAll("text")
            .data(radialLabels).enter()
            .append("text")
            .append("textPath")
            .attr("xlink:href", function(d, i) {return "#radial-label-path-"+id+"-"+i;})
            .style("font-size", 0.6 * segmentHeight + 'px')
            .text(function(d) {return d;});

        return labels;
    }

    createSegmentLabels(labels, id, svg, offset, data) {

        let segmentLabelOffset = 2;
        let r = innerRadius + Math.ceil(data.length / numSegments) * segmentHeight + segmentLabelOffset;

        labels = svg.append("g")
            .classed("labels", true)
            .classed("segment", true)
            .attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");

        labels.append("def")
            .append("path")
            .attr("id", "segment-label-path-"+id)
            .attr("d", "m0 -" + r + " a" + r + " " + r + " 0 1 1 -1 0");

        labels.selectAll("text")
            .data(segmentLabels).enter()
            .append("text")
            .append("textPath")
            .attr("xlink:href", "#segment-label-path-"+id)
            .attr("startOffset", function(d, i) {return i * 100 / numSegments + "%";})
            .text(function(d) {return d;});
    }

}

    //
    // /* Configuration getters/setters */
    // chart.margin = function(_) {
    //     if (!arguments.length) return margin;
    //     margin = _;
    //     return chart;
    // };
    //
    // chart.innerRadius = function(_) {
    //     if (!arguments.length) return innerRadius;
    //     innerRadius = _;
    //     return chart;
    // };
    //
    // chart.numSegments = function(_) {
    //     if (!arguments.length) return numSegments;
    //     numSegments = _;
    //     return chart;
    // };
    //
    // chart.segmentHeight = function(_) {
    //     if (!arguments.length) return segmentHeight;
    //     segmentHeight = _;
    //     return chart;
    // };
    //
    // chart.domain = function(_) {
    //     if (!arguments.length) return domain;
    //     domain = _;
    //     return chart;
    // };
    //
    // chart.range = function(_) {
    //     if (!arguments.length) return range;
    //     range = _;
    //     return chart;
    // };
    //
    // chart.radialLabels = function(_) {
    //     if (!arguments.length) return radialLabels;
    //     if (_ == null) _ = [];
    //     radialLabels = _;
    //     return chart;
    // };
    //
    // chart.segmentLabels = function(_) {
    //     if (!arguments.length) return segmentLabels;
    //     if (_ == null) _ = [];
    //     segmentLabels = _;
    //     return chart;
    // };
    //
    // chart.accessor = function(_) {
    //     if (!arguments.length) return accessor;
    //     accessor = _;
    //     return chart;
    // };


