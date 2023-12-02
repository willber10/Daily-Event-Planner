$(function () {
    // TODO: Add code to display the current date in the header of the page.
    const dateElement = document.querySelector('#currentDay'); // Fixed selector
    const currentDate = new Date(); // Added missing variable declaration
    const formattedDate = currentDate.toLocaleDateString();
    dateElement.textContent = formattedDate;
  });

  // Get the current hour
let currentHour = new Date().getHours();

// Select all time-block divs
let timeBlocks = document.querySelectorAll('.time-block');

// Loop through each time-block
timeBlocks.forEach(block => {
  // Extract the hour from the id of the div
  let blockHour = parseInt(block.id.split('-')[1]);

  // Remove all time-related classes
  block.classList.remove('past', 'present', 'future');

  // Compare the block hour with the current hour and add the appropriate class
  if (blockHour < currentHour) {
    block.classList.add('past');
  } else if (blockHour === currentHour) {
    block.classList.add('present');
  } else {
    block.classList.add('future');
  }
});

// Get all the save buttons
let saveButtons = document.querySelectorAll('.saveBtn');

// Add click event listener to each save button
saveButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    // Get the associated textarea's value
    let text = this.previousElementSibling.value;

    // Get the associated div's id
    let id = this.parentElement.id;

    // Save the textarea's value to localStorage
    localStorage.setItem(id, text);
  });
});

// When the page loads, update the textareas with the saved values
window.onload = function() {
  timeBlocks.forEach(block => {
    // Get the saved value from localStorage
    let savedText = localStorage.getItem(block.id);

    // If there is a saved value, update the textarea
    if (savedText) {
      block.querySelector('textarea').value = savedText;
    }
  });
};