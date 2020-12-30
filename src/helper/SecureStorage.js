const CryptoJs = require("crypto-js");

class SecureStorage {
  static setItem = (key, data) => {
    try {
      const secret_string = process.env.REACT_APP_SECRET_STRING;
      console.log(key, data);
      let enc_data = CryptoJs.AES.encrypt(data, secret_string, {
        mode: CryptoJs.mode.ECB,
      });
      localStorage.setItem(key, enc_data);
    } catch (error) {
      console.log(error);
    }
  };

  static getItem = (key) => {
    const secret_string = process.env.REACT_APP_SECRET_STRING;
    try {
      let data = localStorage.getItem(key);
      if (!data || data == null) {
        return "";
      }
      let dec_data_bytes = CryptoJs.AES.decrypt(data, secret_string, {
        mode: CryptoJs.mode.ECB,
      });
      let dec_data = dec_data_bytes.toString(CryptoJs.enc.Utf8);
      console.log("key", dec_data);
      return JSON.parse(dec_data);
    } catch (error) {
      console.log(error);
    }
  };
}

export default SecureStorage;
