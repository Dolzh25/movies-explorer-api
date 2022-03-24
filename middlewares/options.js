const options = {
  origin: [
    'http://localhost:3000',
    'http://dolzh-movies.nomoredomains.rocks',
    'https://dolzh-movies.nomoredomains.rocks',
    'http://api.nomoreparties.co/beatfilm-movies',
    'https://api.nomoreparties.co/beatfilm-movies',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = options;
