/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.alterColumn('comments', 'is_delete', { default: false });
};

exports.down = (pgm) => {};
