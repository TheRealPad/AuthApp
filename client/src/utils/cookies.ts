class Cookies {
  public static AUTH_COOKIE_NAME: string = "AUTH_APP_TOKEN";
  public static setCookie(name: string, value: string, expireSeconds: number) {
    const date = new Date();
    date.setTime(date.getTime() + expireSeconds * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
  }

  public static getCookie(name: string) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const [key, value] = cookie.split("=");
      if (key === name) {
        return value;
      }
    }
    return null;
  }

  public static deleteCookie(name: string) {
    this.setCookie(name, "", -1);
  }
}

export { Cookies };
