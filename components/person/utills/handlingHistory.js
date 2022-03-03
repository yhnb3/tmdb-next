function sortArr(arr) {
  const newArr = arr
    .map((element) => element)
    .sort((a, b) => {
      const bDate = b.first_air_date || b.release_date;
      const aDate = a.first_air_date || a.release_date;
      if (!bDate) return 1;
      if (!aDate) return -1;
      return (
        parseInt(bDate.substring(0, 4), 10) -
        parseInt(aDate.substring(0, 4), 10)
      );
    });
  const result = [];
  newArr.forEach((element) => {
    let date = element.release_date || element.first_air_date;
    date = date ? date.slice(0, 4) : "-";
    if (result.length === 0 || result[result.length - 1].date !== date) {
      result.push({ date, data: [element] });
    } else {
      result[result.length - 1].data.push(element);
    }
  });
  return result;
}

export default function handlingHistory({ credit }) {
  const result = {};
  if (credit.cast) {
    result.Acting = credit.cast;
  }
  if (credit.crew) {
    credit.crew.forEach((element) => {
      if (result[element.job]) {
        result[element.job].push(element);
      } else {
        result[element.job] = [element];
      }
    });
  }
  const keys = Object.keys(result);
  const newArr = [];
  for (let i = 0; i < keys.length; i += 1) {
    newArr.push({ job: keys[i], history: sortArr(result[keys[i]]) });
  }
  return newArr;
}
