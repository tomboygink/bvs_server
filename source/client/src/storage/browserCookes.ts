/// КУКИ

export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: any, _options?: any) {
  var options: any = {
    path: "/",
    ..._options,
  };

  if (options["expires"] instanceof Date) {
    options["expires"] = options["expires"].toUTCString();
  } else {
    options["expires"] = new Date(
      Date.now() + 3600 * 24 * 1000 * 15
    ).toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string, value: any, _options?: any) {
  document.cookie =
    encodeURIComponent(name) + "=" + encodeURIComponent("") + ";max-age=-1;";
}

export function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=.severburinstrument.ru;';
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.domain.com";
  }
}
