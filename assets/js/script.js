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
    { hour: "09AM" },
    { hour: "10AM" },
    { hour: "11AM" },
    { hour: "12PM" },
    { hour: "01PM" },
    { hour: "02PM" },
    { hour: "03PM" },
    { hour: "04PM" },
    { hour: "05PM" },
  ];

  // Loop through the time blocks array and dynamically generate the HTML for each time block
  for (var i = 0; i < timeBlocks.length; i++) {
    var timeBlockId = "hour-" + timeBlocks[i].hour;
    var hour = timeBlocks[i].hour.replace("AM", "").replace("PM", "");
    var meridiem = timeBlocks[i].hour.slice(-2);
    var rowClass = getRowClass(timeBlocks[i].hour);
    var description = localStorage.getItem(timeBlockId) || "";

    var timeBlockHtml = `
      <div id="${timeBlockId}" class="row time-block ${rowClass}">
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

      // Show the alert
      var $alert = $(".alert");
      $alert.slideDown();

      // Scroll to the alert
      $("html, body").animate(
        {
          scrollTop: $alert.offset().top,
        },
        500
      );

      // Return to the specific time block
      setTimeout(function () {
        $("html, body").animate(
          {
            scrollTop: $("#" + timeBlockId).offset().top,
          },
          500
        );
      }, 10000);

      // Hide the alert after 3 seconds
      setTimeout(function () {
        $alert.slideUp();
      }, 1000);
    });
  // Function to get the CSS class for each time block row based on the current time
  // Please note the 3 coded color which is Past, Present and Future can only seen from 9am to 5pm, beyond this hour only one color appear on Time Blocks.
  function getRowClass(hour) {
    var currentHour = dayjs().format("hhA");
    var blockHour = hour.replace("AM", "").replace("PM", "");

    if (hour.includes("PM") && currentHour.includes("AM")) {
      return "future"; // Time after current time
    } else if (hour.includes("AM") && currentHour.includes("PM")) {
      return "past"; // Time before current time
    } else if (blockHour === currentHour.replace("AM", "").replace("PM", "")) {
      return "present"; // Current time block
    } else if (
      (blockHour === "12" && currentHour.includes("PM")) ||
      (Number(blockHour) < Number(currentHour.replace("AM", "").replace("PM", "")))
    ) {
      return "past"; // Time before current time
    } else {
      return "future"; // Time after current time
    }
  }
});