import { fetcher } from "../index";

export async function SINGLE_EXAM(id, callback, onError) {
  try {
    let exam = await fetcher.get(`/exams/${id}`);
    let { data } = exam.data;
    let status = exam.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw exam;

    return exam;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function GET_EXAMS(callback, onError) {
  try {
    let exam = await fetcher.get(`/exams`);
    let { data } = exam.data;
    let status = exam.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw exam;

    return exam;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function CREATE_EXAM(examdata, callback, onError) {
  try {
    let exam = await fetcher.post(`/exams`, examdata);
    let { data } = exam.data;
    let status = exam.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw exam;

    return exam;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function UPDATE_EXAM(id, examdata, callback, onError) {
  try {
    let exam = await fetcher.put(`/exams/${id}`, examdata);
    let { data } = exam.data;
    let status = exam.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw exam;

    return exam;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
