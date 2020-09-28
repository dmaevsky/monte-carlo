export const piPlot = (root, vl) => root
  .markLine({ point: true })
  .encode(
    vl.x().fieldQ('npaths').scale({ type: 'log' }).axis({title: 'Number of simulations'}),
    vl.y().fieldQ('pi').scale({domain: [3.05, 3.20]}).axis({title: 'Pi estimate'})
  );
