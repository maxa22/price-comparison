export async function fetchData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    body: data,
  });
  const result = await response.json();
  return result; // parses JSON response into native JavaScript object
}

export async function getData(url) {
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json(); // parses JSON response into native JavaScript object
}
