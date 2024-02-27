export const formatDateString = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const __serialize = JSON.stringify;
export const __deserialize = (key) =>
  JSON.parse(window.localStorage.getItem(key));

export const getInitials = (string) => {
  var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const findIndex = (arr, id) => {
  if (arr.length > 0) {
    let find = arr.filter(function (item) {
      return parseInt(item.question_id) === parseInt(id);
    });
    if (find.length > 0) {
      return find[0].question_id;
    }
  }
};

export const convertTime = (sec) => {
  var hours = Math.floor(sec / 3600);
  hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
  var min = Math.floor(sec / 60);
  min >= 1 ? (sec = sec - min * 60) : (min = "00");
  sec < 1 ? (sec = "00") : void 0;
  min.toString().length == 1 ? (min = "0" + min) : void 0;
  sec.toString().length == 1 ? (sec = "0" + sec) : void 0;
  return hours + " : " + min + " : " + sec;
};
export const paginateArr = (arr, len) => {
  const paginatedArr = [];
  const pages = Math.ceil(arr.length / len);
  const remainder = arr.length % len;
  if (pages > 1 || (pages === 1 && remainder > 0))
    for (let i = 1; i <= pages; i++) {
      if (i === pages) {
        paginatedArr.push(arr);
        break;
      } else {
        paginatedArr.push(arr.splice(0, len));
      }
    }
  return paginatedArr;
};
export const convertToTime = (d) => {
  const date = new Date(d);
  const localeSpecificTime = date.toLocaleTimeString();
  return localeSpecificTime;
};
