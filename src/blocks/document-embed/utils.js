export const isPDF = (url) => {
  if (!url) return false;
  // Strip query params and check extension
  const cleanUrl = url.split("?")[0].split("#")[0];
  return cleanUrl.toLowerCase().endsWith(".pdf");
};
