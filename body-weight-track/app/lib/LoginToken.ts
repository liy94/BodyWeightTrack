export default class LoginToken {
  static LOGIN_TOKEN = "loginToken";

  static save(token: string): void {
    CookieManager.setValue(this.LOGIN_TOKEN, token);
  }

  static remove(): void {
    CookieManager.setValue(this.LOGIN_TOKEN, "");
  }

  static isUserLoggedIn(): boolean {
    const cookieValue = CookieManager.getValue(this.LOGIN_TOKEN);
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
      .map((key, value) => `${key}=${value}`)
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

  static setValue(key: string, value: string): void {
    const cookieDict = this.stringToDict(document.cookie);
    cookieDict[key] = value;

    document.cookie = this.dictToString(cookieDict);
  }

  static getValue(key: string): string | null {
    const cookie = this.stringToDict(document.cookie);
    if (key in cookie) {
      return cookie[key];
    }

    return null;
  }
}
