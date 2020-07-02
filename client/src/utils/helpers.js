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

export { toBase64, convertReponseErrors };
