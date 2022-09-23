const MIL_IN_HOUR = 1000 * 3600;
class DateHelper {
  dateToPixel(input, nowposition, daywidth) {
    const nowDate = this.getToday(); //
    const inputTime = new Date(input);
    inputTime.setHours(0, 0, 0, 0);
    nowDate.setHours(0, 0, 0, 0);

    //Day light saving patch
    // const lightSavingDiff =
    //   (inputTime.getTimezoneOffset() - nowDate.getTimezoneOffset()) * 60 * 1000;
    const timeDiff = inputTime.getTime() - nowDate.getTime() - 0;
    const pixelWeight = daywidth / 24; //Value in pixels of one hour
    return (timeDiff / MIL_IN_HOUR) * pixelWeight + nowposition;
  }
  pixelToDate(position, nowposition, daywidth) {
    const hoursInPixel = 24 / daywidth;
    const pixelsFromNow = position - nowposition;
    const today = this.getToday();
    const milisecondsFromNow =
      today.getTime() + pixelsFromNow * hoursInPixel * MIL_IN_HOUR + 24 * MIL_IN_HOUR;
    const result = new Date(milisecondsFromNow);
    // let lightSavingDiff = (result.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
    result.setTime(result.getTime() + 0);
    return result;
  }
  getToday() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }
  monthDiff(start, end) {
    return Math.abs(
      end.getMonth() - start.getMonth() + 12 * (end.getFullYear() - start.getFullYear())
    );
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  dayToPosition = (day, now, dayWidth) => {
    return day * dayWidth + now;
  };

  daysInYear = year => {
    return this.isLeapYear(year) ? 366 : 365;
  };

  isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }

  getStartOfWeek = date => {
    const day = new Date(date).getDay();
    const diff = date.getDate() - day + 1; // adjust when day is sunday
    return new Date(date.setDate(diff));
  };
}
const helper = new DateHelper();
export default helper;
