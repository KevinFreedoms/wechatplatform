
/**
 * 以 ****-**-**返回年月日的字符串
 */

function getDateStr3(date) {
    return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
}

/**
 * 获得相对当前周AddWeekCount个周的起止日期
 * AddWeekCount为0代表当前周   为-1代表上一个周   为1代表下一个周以此类推
 * **/
function getWeekStartAndEnd(AddWeekCount) {
    var startStop = new Array();
    var millisecond = 1000 * 60 * 60 * 24;
    var currentDate = new Date();
    currentDate = new Date(currentDate.getTime() + (millisecond * 7 * AddWeekCount));
    var week = currentDate.getDay();
    var month = currentDate.getDate();
    var minusDay = week != 0 ? week - 1 : 6;
    var currentWeekFirstDay = new Date(currentDate.getTime() - (millisecond * minusDay));
    var currentWeekLastDay = new Date(currentWeekFirstDay.getTime() + (millisecond * 6));
    startStop.push(getDateStr3(currentWeekFirstDay));
    startStop.push(getDateStr3(currentWeekLastDay));

    return startStop;
}

/**
 * 获得相对当月AddMonthCount个月的起止日期
 * AddMonthCount为0 代表当月 为-1代表上一个月  为1代表下一个月 以此类推
 * ***/
function getMonthStartAndEnd(AddMonthCount) {
    var startStop = new Array();
    var currentDate = new Date();
    var month = currentDate.getMonth() + AddMonthCount;
    if (month < 0) {
        var n = parseInt((-month) / 12);
        month += n * 12;
        currentDate.setFullYear(currentDate.getFullYear() - n);
    }
    currentDate = new Date(currentDate.setMonth(month));
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var currentMonthFirstDay = new Date(currentYear, currentMonth, 1);
    var currentMonthLastDay = new Date(currentYear, currentMonth + 1, 0);
    startStop.push(getDateStr3(currentMonthFirstDay));
    startStop.push(getDateStr3(currentMonthLastDay));
    return startStop;
}
