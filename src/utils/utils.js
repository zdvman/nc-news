const formatDate = (isoString) => {
  return new Date(isoString).toLocaleString();
};

export { formatDate };
