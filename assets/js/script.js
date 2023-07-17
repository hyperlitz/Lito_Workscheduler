// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Function to update the time
  function updateTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    // Add leading zeros if necessary
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    var timeString = hours + ":" + minutes + ":" + seconds;

    // Update the time on the page
    $("#currentTime").text(timeString);
  }

  // Get the current date using Day.js and format it as "dddd, MMMM D, YYYY"
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  // Update the time immediately
  updateTime();

  // Update the time every second (1000 milliseconds)
  setInterval(updateTime, 1000);

  // Create an array of time blocks from 9 AM to 5 PM
  var timeBlocks = [
    { hour: "09AM", bgColor: "#d3d3d3" },
    { hour: "10AM", bgColor: "#77dd77" },
    { hour: "11AM", bgColor: "#ff6961" },
    { hour: "12PM", bgColor: "#ffd700" },
    { hour: "01PM", bgColor: "#87ceeb" },
    { hour: "02PM", bgColor: "#9370db" },
    { hour: "03PM", bgColor: "#8fbc8f" },
    { hour: "04PM", bgColor: "#da70d6" },
    { hour: "05PM", bgColor: "#ff8c00" },
  ];

  // Loop through the time blocks array and dynamically generate the HTML for each time block
  for (var i = 0; i < timeBlocks.length; i++) {
    var timeBlockId = "hour-" + timeBlocks[i].hour;
    var hour = timeBlocks[i].hour.replace("AM", "").replace("PM", "");
    var meridiem = timeBlocks[i].hour.slice(-2);
    var rowClass = getRowClass(timeBlocks[i].hour);
    var description = localStorage.getItem(timeBlockId) || "";

    var timeBlockHtml = `
      <div id="${timeBlockId}" class="row time-block ${rowClass}" style="background-color: ${timeBlocks[i].bgColor}">
        <div class="col-2 col-md-1 hour text-center py-3">${hour}${meridiem}</div>
        <textarea class="col-8 col-md-10 description">${description}</textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `;

    $(".container-lg").append(timeBlockHtml);
  }

  // Add a click event listener to the save buttons
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var description = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, description);
  });

  // Function to get the CSS class for each time block row based on the current time
  function getRowClass(hour) {
    var currentHour = dayjs().format("hh");
    if (currentHour > hour) {
      return "past";
    } else if (currentHour === hour) {
      return "present";
    } else {
      return "future";
    }
  }
});