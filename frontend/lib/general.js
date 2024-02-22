function formatDate(dateType, date=new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const secs = String(date.getSeconds()).padStart(2, '0')

  if (dateType === 'tag') {
    return `${year}-${month}-${day}`
  }
  return `${year}-${month}-${day} ${hour}:${min}:${secs}`;
}

function convertMilliSecondsIntoLegibleString(milliSecondsIn) {

  let secsIn = milliSecondsIn / 1000;
  let milliSecs = milliSecondsIn % 1000;

  let hours = secsIn / 3600,
  remainder = secsIn % 3600,
  minutes = remainder / 60,
  seconds = remainder % 60;


  return ( hours.toFixed() + ": "
          +  minutes.toFixed() + ": "
          + seconds.toFixed() +"");
}
export { formatDate, convertMilliSecondsIntoLegibleString }