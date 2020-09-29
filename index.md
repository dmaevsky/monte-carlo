# Monte-Carlo

*[Original article by Dr. Antoine Savine](https://www.quora.com/What-are-Monte-Carlos-applications-on-finance)*

First things first, Monte-Carlo is a numerical algorithm for computing all kinds of expectations (a fancy word for the average outcome), especially in situations too complex for expectations to be computed analytically or near analytically. This includes probabilities of events, which are expectations of indicator functions of the event.

One textbook application is for the estimations of the decimals of $\pi$. Suppose you are randomly throwing darts at a square board of dimension 2x2 with an inner circle of radius 1.

<svg
  width="300px"
  height="300px"
  viewBox="-100 -100 200 200"
  xmlns="http://www.w3.org/2000/svg">
  <rect x="-80" y="-80" width="80%" height="80%" fill="SteelBlue"/>
  <circle cx="0" cy="0" r="80" fill="LightYellow" />
  <line x1="0" y1="-100" x2="0" y2="100" stroke="SteelBlue" />
  <line x1="-100" y1="0" x2="100" y2="0" stroke="SteelBlue" />
  <text x="-12" y="98" font-size="20" text-anchor="middle" fill="black">-1</text>
  <text x="-8" y="-83" font-size="20" text-anchor="middle" fill="black">1</text>
  <text x="-93" y="-2" font-size="20" text-anchor="middle" fill="black">-1</text>
  <text x="90" y="-2" font-size="20" text-anchor="middle" fill="black">1</text>
  <text x="-8" y="-2" font-size="20" text-anchor="middle" fill="black">0</text>
</svg>

The surface of the board is $4$, the surface of the circle is $\pi$, so the probability to land in the circle (assuming all darts land on the board) is $p=\frac{\pi}{4}$ .

You can estimate $p$ by throwing a large number $m$ of darts and counting how many landed inside the circle. Here is a quick [Javascript code](/dmaevsky/monte-carlo/index.js):
```javascript
function estimate_p(m) {
  let count = 0;
  for (let i = 0; i < m; i++) {
    const [x, y] = [Math.random(), Math.random()];
    if (x * x + y * y < 1.) count++;
  }
  return count / m;
}
```
The Strong Law of Large Numbers guarantees that the average outcome of $m$ indepedent experiments converges towards the expectation (in this case, probability) $p$ when $m$ grows. Further, the Central Limit Theorem gives the standard error of the estimate, which is the standard deviation of the indicator, $\sqrt{p(1−p)}$, over  $\sqrt{m}$.

Now you can trivially estimate $\pi$:
```javascript
export function estimate_pi(m) {
  const p = estimate_p(m);
  const std = Math.sqrt(p * (1-p) / m);
  return { pi: 4 * p, std: 4 * std };
}
```
So how can you estimate $\pi$ correctly to, say, the 3rd decimal? You want $4\sqrt{\frac{p(1−p)}{m}}<10^{-3}$ and solving for $m$ tells you need to repeat the experiment 2,696,767 times. That’s right, nearly 3 million experiments just to get it right to the 3rd decimal. And with standard error slowly vanishing in $\sqrt{m}$, you would need a hundred as much to correct the 4th decimal.

The following graph illustrates the (slow) convergence of the estimator to the true value of $\pi$:
{convergencePlot}

You can go a little bit faster on GPU using Tensorflow. Actually, using Ellx operator overloading the whole caculation becomes a one-liner:
```javascript
x = tf.randomUniform([m])
y = tf.randomUniform([m])
tf_pi = tf.tidy(() => tf.mean(x*x + y*y < 1)*4)
```
x = {x}

y = {y}

tf_pi = {tf_pi}
