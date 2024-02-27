import { fetcher } from "../index";

export async function START_EXAM(id, callback, onError) {
  try {
    let exam = await fetcher.post(`/exams/start/${id}`);
    let status = exam.data.status;

    status === "success" && callback && callback(exam.data);
    if (status === "error") throw exam;

    return exam;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function END_EXAM(id, anwsered, callback, onError) {
  try {
    let exam = await fetcher.post(`/cbt/answers/${id}`, anwsered);
    let { data } = exam.data;

    let status = exam.data.status;

    callback && callback(exam.data);
    if (status === "error") throw exam;

    return exam;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function ANSWER_QUESTION(id, answer, callback, onError) {
  try {
    let exam = await fetcher.post(`/cbt/${id}`, answer);
    let { data } = exam.data;
    let status = exam.data.status;

    status === "success" && callback && callback(exam.data);
    if (status === "error") throw exam;

    return exam;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function GET_ANSWERED_QUESTIONS(id, callback, onError) {
  try {
    let exam = await fetcher.get(`/cbt/answers/${id}`);
    let { data } = exam.data;
    let status = exam.data.status;

    // console.log(data);
    callback && callback(data);
    if (status === "error") throw exam;

    return exam;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
