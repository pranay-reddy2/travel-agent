// API base. In dev, Vite proxies /api -> http://localhost:5000

const API_BASE = (
  import.meta.env.VITE_API_BASE || ""
).replace(/\/+$/, "");

export async function planTrip(brief) {
  const url = `${API_BASE}/api/travel/plan`;

  console.log("Calling API:", url);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ brief }),
  });

  let data = null;

  try {
    data = await res.json();
  } catch (err) {
    console.error("Response is not JSON:", err);
  }

  if (!res.ok) {
    const msg =
      (data &&
        (data.error || data.message)) ||
      `Server error (${res.status})`;

    const error = new Error(msg);
    error.status = res.status;
    throw error;
  }

  if (!data) {
    throw new Error(
      "Empty response from server"
    );
  }

  return data;
}