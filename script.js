// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
  var timeBlocks = [
    "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM",
  ];
  for (var i = 0; i < timeBlocks.length; i++){
    var timeBlockId = "hour-" +  timeBlocks[i];
    var hour = timeBlocks[i].replace("AM","").replace("PM", "");
    var meridiem = timeBlocks[i].slice(-2);
    var rowClass = getRowClass(hour);
    var description = localStorage.getItem(timeBlockId) || "";
    var timeBlockHtml = `<div id="${timeBlockId}" class="row time-block ${rowClass}">
    <div class="col-2 col-md-1 text-center hour py-3">${hour}${meridiem}</div>
    <textarea class="col-8 col-md-10 description">${description}</textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
    </button>
    </div>`

  }

});