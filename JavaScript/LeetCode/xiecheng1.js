function fn(str) {
  let year = parseInt(str.slice(0, 4));
  if (year > 2021 || year < 2000) return 'Wrong';
  let month = parseInt(str.slice(4, 6));
  if (month > 12 || month < 1) return 'Wrong';

  let day = parseInt(str.slice(6, 8));
  if (day > 20 || day < 1) return 'Wrong';

  let hours = parseInt(str.slice(8, 10));
  if (hours > 23 || hours < 0) return 'Wrong';

  let minute = parseInt(str.slice(10, 12));
  if (minute > 59 || minute < 0) return 'Wrong';

  let second = parseInt(str.slice(12, 14));
  if (second > 59 || second < 0) return 'Wrong';

  console.log(year + '.' + str.slice(4, 6) + '.' + str.slice(6, 8) + ' ' + str.slice(8, 10) + ':' + str.slice(10, 12) + ':' + str.slice(12, 14));
}

fn('20079606094056')

