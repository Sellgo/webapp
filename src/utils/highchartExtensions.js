/* eslint-disable prefer-rest-params */
export const PercentAlign = function(H) {
  H.wrap(H.Chart.prototype, 'setTitle', function(proceed) {
    const tOptions = this.options.title;
    if (tOptions && tOptions.percentAlign) {
      const percentAlign = tOptions.percentAlign;
      tOptions.x = ((this.chartWidth + this.plotLeft) * percentAlign) / 100;
    }

    // Run original proceed method
    proceed.apply(this, [].slice.call(arguments, 1));
  });

  H.wrap(H.Chart.prototype, 'redraw', function(proceed) {
    const tOptions = this.options.title;
    if (tOptions && tOptions.percentAlign) {
      const percentAlign = tOptions.percentAlign;
      tOptions.x = ((this.chartWidth + this.plotLeft) * percentAlign) / 100;
    }

    proceed.apply(this, [].slice.call(arguments, 1));
  });
};

export const LegendTooltip = function(H) {
  H.addEvent(H.Chart, 'redraw', function(e) {
    const chart = e.target;

    if (
      chart.userOptions &&
      chart.userOptions.legend &&
      chart.userOptions.legend.tooltip === true
    ) {
      const isLegendReversed =
        chart.userOptions && chart.userOptions.legend && chart.userOptions.legend.reversed;

      const query = `${
        chart.renderTo.id ? '#' + chart.renderTo.id + ' ' : ''
      }.highcharts-legend tspan, ${
        chart.renderTo.id ? '#' + chart.renderTo.id + ' ' : ''
      }.highcharts-legend span`;
      const legends = document.querySelectorAll(query);

      for (let i = 0; i < legends.length; i++) {
        legends[i].addEventListener('mouseover', function() {
          const dataPoint = isLegendReversed
            ? chart.series && chart.series[0].data[legends.length - i - 1]
            : chart.series && chart.series[0].data[i];
          chart.tooltip.refresh(dataPoint);
        });

        legends[i].addEventListener('mouseout', function() {
          chart.tooltip.hide();
        });
      }
    }
  });
};
