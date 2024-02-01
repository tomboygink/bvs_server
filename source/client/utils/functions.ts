export const getDigitalStr = (str: string) => {
  return str.replace(/[^\d\.,]/g, "").replace(/,/g, ".");
};
