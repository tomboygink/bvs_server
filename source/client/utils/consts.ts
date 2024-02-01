export const LOGIN_ROUTE = "/";
export const FORGOT_PASS_ROUTE = "/forgot-password";
export const BASE_URL = {
  host: "localhost",
  port: "3041",
};
// Validation message
export const SAVE_SUCCESS = "Данные успешно сохранены";
export const SAVE_ERROR = "Произошла ошибка при сохранении данных";
export const DOUBL_LOGIN_ERROR = "Такой логин уже существует";
export const EMPTY_FIELD_ERROR = "Заполните это поле";
export const INVALID_EMAIL_ERROR =
  "Введите корректный e-mail (в формате mail@mail.ru)";
export const MATCHING_LOGIN_AND_PASS_ERROR =
  "Пароль и логин не должны совпадать";
export const PASSWORDS_NOT_MATCH = "Пароли не совпадают";
export const INVALID_PASSWORD_ERROR =
  "Используйте 6 или более символов, сочетая буквы, цифры и символы";
export const MATCHING_TEMPLATE_ERROR =
  "Ошибка! Убедитесь, что данные заполнены согласно шаблону";
// RegExp

// email
export const regexp_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//дефисы и пробелы
export const regexp_dash = /[\s-]/g;

//буквы + цифры + спецсимволы + не менее 6
export const regexp_password =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

//только цифры
export const regexp_number = /[^\d\.,]/g;
