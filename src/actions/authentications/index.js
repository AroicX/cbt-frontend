import { fetcher } from "../index";

export async function ADMIN_LOGIN(user, callback, onError) {
  try {
    let auth = await fetcher.post(`/auth/admin`, user);
    let { data } = auth.data;
    let status = auth.data.status;

    status === "success" && callback && callback(auth.data);
    if (status === "error") throw auth;

    return auth;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function STUDENT_LOGIN(user, callback, onError) {
  try {
    let auth = await fetcher.post(`/auth/student`, user);
    let { data } = auth.data;
    let status = auth.data.status;

    status === "success" && callback && callback(auth.data);
    if (status === "error") throw auth;

    return auth;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
