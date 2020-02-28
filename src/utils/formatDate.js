const getFormattedDate = (date = new Date) => {
  const str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return str;
}

module.exports = {
  getFormattedDate,
};
