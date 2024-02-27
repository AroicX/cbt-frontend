import { fetcher } from "../index";

export async function SINGLE_QUESTION(paper_id, callback, onError) {
  try {
    let questions = await fetcher.get(`/questions/${paper_id}`);
    let { data } = questions.data;
    let status = questions.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw questions;

    return questions;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function GET_QUESTIONS(paper_id, callback, onError) {
  try {
    let questions = await fetcher.get(`/questions?paper_id=${paper_id}`);
    let { data } = questions.data;
    let status = questions.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw questions;

    return questions;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function CREATE_QUESTION(questionsdata, callback, onError) {
  try {
    let questions = await fetcher.post(`/questions`, questionsdata);
    let { data } = questions.data;
    let status = questions.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw questions;

    return questions;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function UPDATE_QUESTION(id, questionsdata, callback, onError) {
  try {
    let questions = await fetcher.put(`/questions/${id}`, questionsdata);
    let { data } = questions.data;
    let status = questions.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw questions;

    return questions;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function UPLOAD_QUESTION(
  paper_id,
  questionsdata,
  callback,
  onError
) {
  try {
    let questions = await fetcher.post(
      `/questions/pool/${paper_id}`,
      questionsdata
    );
    let { data } = questions.data;
    let status = questions.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw questions;

    return questions;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
