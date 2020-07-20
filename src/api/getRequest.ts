const requestConfig: RequestInit = {
  method: "GET",
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
const getRequest = async (url = "", token = "") => {
  const response = await fetch(url, {
    ...requestConfig,
    ...{ headers: { ...requestConfig.headers, ...{ authorization: `Bearer ${token}` } } },
  });
  return response.json();
};

export { getRequest };
