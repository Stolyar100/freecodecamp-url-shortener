import dnsPromises from "dns/promises";
import { URL } from "url";

export const checkIsUrlValid = async (url) => {
  try {
    const validProtocols = ["http:", "https:"];
    const parsedUrl = new URL(url);
    const { protocol, host } = parsedUrl;

    const isValidProtocol = validProtocols.includes(protocol);
    console.table({ protocol, host, isValidProtocol, validProtocols });
    if (!isValidProtocol) {
      return false;
    }
    console.table({ isValidProtocol, error: true });
    const isUrlValid = await dnsPromises
      .lookup(host)
      .then(() => true)
      .catch(() => false);
    return isUrlValid;
  } catch {
    return false;
  }
};
