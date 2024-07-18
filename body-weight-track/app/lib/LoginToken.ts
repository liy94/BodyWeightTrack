import { LOGIN_TOKEN, USER_ID } from "./cookieConstants";

const SIX_HOURS = (1000 * 6 * 3600).toString();
const EXPIRED = new Date("2001-12-26T00:00:00Z").toUTCString();

class Cookie {
  static save(token: string): void {
    CookieManager.setValue(this.getKey(), token);
  }

  static remove(): void {
    CookieManager.setValue(this.getKey(), "", EXPIRED);
  }

  static getKey(): string {
    throw new Error("Must define key");
  }
}

export class UserIDCookie extends Cookie {
  static getKey(): string {
    return USER_ID;
  }
}

export default class LoginToken extends Cookie {
  static getKey(): string {
    return LOGIN_TOKEN;
  }

  static isUserLoggedIn(): boolean {
    const cookieValue = CookieManager.getValue(LOGIN_TOKEN);
    return cookieValue != null && cookieValue != "";
  }
}

type BWTCookie = {
  [key: string]: string;
};

class CookieManager {
  static SEPERATOR = "; ";

  static dictToString(dict: BWTCookie): string {
    return Object.entries(dict)
      .map(([key, value]) => key + "=" + value)
      .join(this.SEPERATOR);
  }

  static stringToDict(str: string): BWTCookie {
    const values = str.split(this.SEPERATOR);

    const reducer = (dict: BWTCookie, currentPair: string) => {
      const [key, value] = currentPair.split("=");
      dict[key] = value;
      return dict;
    };

    return values.reduce(reducer, {});
  }

  static setValue(key: string, value: string, expiration = SIX_HOURS): void {
    document.cookie = `${key}=${value}; expires=${expiration}`;
  }

  static getValue(key: string): string | null {
    const cookie = this.stringToDict(document.cookie);
    if (key in cookie) {
      return cookie[key];
    }

    return null;
  }
}
