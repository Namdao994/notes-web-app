export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const upperFirstLetter = (text) => {
  if (typeof text !== 'string' || !text.trim()) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};
