import { fetcher } from "../index";

export async function SINGLE_PAPER(id, callback, onError) {
  try {
    let paper = await fetcher.get(`papers/${id}`);
    let { data } = paper.data;
    let status = paper.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw paper;

    return paper;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function GET_PAPERS(callback, onError) {
  try {
    let paper = await fetcher.get(`/papers`);
    let { data } = paper.data;
    let status = paper.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw paper;

    return paper;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function CREATE_PAPER(paperdata, callback, onError) {
  try {
    let paper = await fetcher.post(`/papers`, paperdata);
    let { data } = paper.data;
    let status = paper.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw paper;

    return paper;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function UPDATE_PAPER(id, paperdata, callback, onError) {
  try {
    let paper = await fetcher.put(`/papers/${id}`, paperdata);
    let { data } = paper.data;
    let status = paper.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw paper;

    return paper;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
