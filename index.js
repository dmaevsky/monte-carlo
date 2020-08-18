import 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js'

const rand = Math.random;

function estimate_p(m) {
  let count = 0;
  for (let i = 0; i < m; i++) {
    const [x, y] = [rand(), rand()];
    if (x * x + y * y < 1.) count++;
  }
  return count / m;
}

export function estimate_pi(m) {
  const p = estimate_p(m);
  const std = Math.sqrt(p * (1-p) / m);
  return { pi: 4 * p, std: 4 * std };
}

export const tf = window.tf;

tf.Tensor.prototype.__EllxMeta__ =   {
  operator: {
    binary: {
      '+': (lhs, rhs) => tf.add(lhs, rhs),
      '-': (lhs, rhs) => tf.sub(lhs, rhs),
      '*': (lhs, rhs) => tf.mul(lhs, rhs),
      '/': (lhs, rhs) => tf.div(lhs, rhs),
      '<': (lhs, rhs) => tf.less(lhs, rhs),
      '<=': (lhs, rhs) => tf.lessEqual(lhs, rhs),
      '>': (lhs, rhs) => tf.greater(lhs, rhs),
      '>=': (lhs, rhs) => tf.greaterEqual(lhs, rhs),
    },
    unary: {
      '!': rhs => tf.logicalNot(rhs),
      '-': rhs => tf.neg(rhs),
      '+': rhs => rhs,
    }
  }
};