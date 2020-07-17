export const PercentAlign = function(H) {
  H.wrap(H.Chart.prototype, 'setTitle', function(proceed) {
    const tOptions = this.options.title;
    if (tOptions && tOptions.percentAlign) {
      const percentAlign = tOptions.percentAlign;
      tOptions.x = ((this.chartWidth + this.plotLeft) * percentAlign) / 100;
    }

    // Run original proceed method
    // eslint-disable-next-line prefer-rest-params
    proceed.apply(this, [].slice.call(arguments, 1));
  });

  H.wrap(H.Chart.prototype, 'redraw', function(proceed) {
    const tOptions = this.options.title;
    if (tOptions && tOptions.percentAlign) {
      const percentAlign = tOptions.percentAlign;
      tOptions.x = ((this.chartWidth + this.plotLeft) * percentAlign) / 100;
      console.log(this);
      console.log(
        `${this.chartWidth}|${this.plotLeft}|${tOptions.x}|||${this.plotSizeX}|${this.plotWidth}|${this.plotBox.x}`
      );
    }

    // Run original proceed method
    // eslint-disable-next-line prefer-rest-params
    proceed.apply(this, [].slice.call(arguments, 1));
  });
};
