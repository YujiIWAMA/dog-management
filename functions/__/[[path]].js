// Firebaseのログイン画面（/__/auth/...）を、このサイト自身のドメイン経由で中継する
// これでiPhoneのホーム画面アプリ・Safariでもログイン情報が途中で消えない
const FIREBASE_HOST = "https://dog-management-2c721.firebaseapp.com";

export async function onRequest({ request }) {
  const url = new URL(request.url);
  const headers = new Headers(request.headers);
  headers.delete("host");
  const init = { method: request.method, headers, redirect: "manual" };
  if (request.method !== "GET" && request.method !== "HEAD") init.body = await request.arrayBuffer();
  return fetch(FIREBASE_HOST + url.pathname + url.search, init);
}
