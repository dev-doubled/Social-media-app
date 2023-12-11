import CryptoJS from "crypto-js";

export const encryptUserId = (userId, key) => {
  const encryptCode = CryptoJS.AES.encrypt(userId, key);
  return encryptCode.toString();
};

export const decryptUserId = (encryptedUserId, key) => {
  const bytes = CryptoJS.AES.decrypt(encryptedUserId, key);
  const decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedUserId;
};
