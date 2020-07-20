const requestConfig: RequestInit = {
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const postRequest = async (url = "", data = {}) => {
  const response = await fetch(url, {
    ...requestConfig,
    body: JSON.stringify(data),
  });
  return response.json();
};

export { postRequest };
