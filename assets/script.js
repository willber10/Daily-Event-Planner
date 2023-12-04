$(document).ready(function() {
  // Upon loading webpage, the current date will be displayed in the header.
  var currentDate = dayjs();
  var formattedDate = currentDate.format('dddd, MMMM D, YYYY');
  $('#currentDay').text(formattedDate);

// Upon loading the webpage, the current time block will display in red,
// the past time blocks will display in gray, and the future time blocks will display in green.
  var currentHour = dayjs().hour();
  $('.time-block').each(function() {
    var blockHour = parseInt($(this).attr('id').split('-')[1]);

    if (blockHour < currentHour) {
      $(this).removeClass('future present').addClass('past');
    } else if (blockHour === currentHour) {
      $(this).removeClass('future past').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });

  // When the page is refreshed, the events saved in local storage will persist.
  $('.time-block').each(function() {
    var blockId = $(this).attr('id');
    var savedEvent = localStorage.getItem(blockId);
    if (savedEvent) {
      $('#' + blockId + ' .description').val(savedEvent);
    }
  });

  // This saves the events to local storage when the save button is clicked.
  $('.saveBtn').on('click', function() {
    var eventText = $(this).siblings('.description').val();
    var blockId = $(this).parent().attr('id');
    localStorage.setItem(blockId, eventText);
  });
});