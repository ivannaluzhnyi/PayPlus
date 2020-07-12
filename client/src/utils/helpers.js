import { DEVISE } from 'src/constants';

const toBase64 = async file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const convertReponseErrors = dataErrors => {
  const prepare = {};
  Object.keys(dataErrors).forEach(key => {
    const err = dataErrors[key];
    prepare[key] = err.join('; ');
  });

  return prepare;
};

const mappingDevise = devise => {
  switch (devise) {
    case DEVISE.EURO:
      return '€';

    case DEVISE.DOLLAR:
      return '$';

    case DEVISE.STERLING:
      return '£';

    case DEVISE.YEN:
      return '¥';

    default:
      return '';
  }
};

export { toBase64, convertReponseErrors, mappingDevise };
