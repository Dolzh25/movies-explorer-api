const errorMessages = {
  validationErrorMessage: 'Переданы некорректные данные',
  emailConflictErrorMessage: 'Пользователь с таким e-mail уже существует',
  authorizationErrorMessageJWT: 'Необходима авторизация',
  authorizationErrorMessageLogin: 'Неправильный e-mail или пароль',
  notFoundErrorDBMessage: 'Запрашиваемая запись не найдена',
  forbiddenErrorMessage: 'Недостаточно прав для совершения действия',
  notFoundOnSiteErrorMessage: 'Запрашиваемый ресурс не найден',
  notFoundUserErrorMessage: 'Запрашиваемый пользователь не найден',
  notFoundRouteErrorMessage: 'Запрашиваемый адрес не найден',
  ServerErrorMessage: 'Ошибка на сервере',
  corsErrorMessage: 'CORS: запрос на кросс-источник заблокирован',
  constraintErrorMessage: 'Конфликт данных',
  validationUrlErrorMessage: 'Это поле заполнено некорректно, ожидается URL',
};

const serverMessages = {
  removeMovieSuccess: 'Запись о фильме удалена',
};

module.exports = {
  errorMessages,
  serverMessages,
};
