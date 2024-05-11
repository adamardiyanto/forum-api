exports.up = (pgm) => {
  pgm.addColumn('threads', {
    date: {
      type: 'TEXT',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.addConstraint('threads', 'fk_threads.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('threads', 'fk_threads.owner_user.id');
  pgm.dropColumn('threads', 'date');
};
