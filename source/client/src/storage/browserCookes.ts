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
    window.location.href = 'http://127.0.0.1:3040'
}
