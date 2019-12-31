module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'gympointdb',
  database: 'gympointdb',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
