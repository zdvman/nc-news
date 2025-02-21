const formatDate = (isoString) => {
  return new Date(isoString).toLocaleString();
};

const firstLetterToUpperCase = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

const handleErrorOkButton = (setError, setIsErrorPopupOpen, navigate) => {
  setError(null);
  setIsErrorPopupOpen(false);
  navigate('/'); // Redirect to home
};

export { formatDate, firstLetterToUpperCase, handleErrorOkButton };
