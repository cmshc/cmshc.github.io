function init() {
  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/18xGU3_X0DxJ44wNDljPXkVntO-h1umbmWQHd1T-CQ0Y/pubhtml';
   Tabletop.init( { key: publicSpreadsheetUrl, callback: function(data, tabletop) {
     var nextdate = findNextDate(data)
     $(".calendar_top").html(nextdate[0])
     $(".calendar_day").html(nextdate[1])
   },
   simpleSheet: true } )
}


function getCurrentDate() {
  var today = new Date();
  
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  var today = { month:parseInt(mm),day:parseInt(dd),year:parseInt(yyyy)};
  return today;
}

function formatDate(date) {
  var dateArray = date.split("/");
  var intDateObject = { month:parseInt(dateArray[0]), day:parseInt(dateArray[1]), year:parseInt(dateArray[2])}
  return intDateObject;
}

function compareTwoDates(currentDate,upcomingDate) {
  console.log(currentDate,upcomingDate)
  if (currentDate.month < upcomingDate.month) { // different month
    return true;
  }
  else if (currentDate.month == upcomingDate.month) { // same month, different day
    if (currentDate.day <= upcomingDate.day ) {
      return true;
    }
    return false;
  }
}

function findNextDate(allUpcomingDates) {
  for (var i = 0; i < allUpcomingDates.length;i++) {
    var current_date = getCurrentDate(); // current date: mm/dd/yyyy
    var upcoming_date = formatDate(allUpcomingDates[i].rawdate); // upcoming date: mm/dd/yyyy
    if ( compareTwoDates(current_date,upcoming_date) ) {
      return [allUpcomingDates[i].month, allUpcomingDates[i].day];
    }
  }
  return["none","none"]
}

init()
