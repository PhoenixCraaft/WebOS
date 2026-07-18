function updateTime() {

    var currentTime = new Date().toLocaleString('de-DE');

    var timeText = document.querySelector("#timeElement");

    timeText.innerHTML = currentTime

}

setInterval(updateTime, 1000);

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var welcomeScreen = document.querySelector("#welcome")

var welcomeScreenOpen = document.querySelector("#welcomeopen")

var coastervault = document.querySelector("#coastervault")

var coastervaultDesktopIcon = document.querySelector("#coastervaultdesktopicon")

var topBar = document.querySelector("#top")

var selectedIcon = undefined

var biggestIndex = 1

var content = [

  {

    title: "Home",

    date: "18/07/2026",

    content: 
              `
              <p contenteditable="True">
              <span contenteditable="true">Welcome to Coaster Vault
                  <br>
                  <br>
                  This is a place where I store some of my opinions about some Rollercoasters I have ridden.
              </span>
              </p>
    `
  },
  {

    title: "Voltron",

    date: "18/07/2026",

    content: `
    
    <P contenteditable="True">
    
    Voltron Nevera, powered by Rimac in Europapark, Rust is in my opinion the best rollercoaster in Germany.

    </p>
    
    `

  }

]

function closeWindow(element) {

  element.style.display = "none"

}

function openWindow(element) {

  element.style.display = "block";

  biggestIndex++;

  element.style.zIndex = biggestIndex;

  topBar.style.zIndex = biggestIndex + 1;

}

function makeClosable(element, closeElement) {

  closeElement.addEventListener("click", () => closeWindow(element))

}

function selectIcon(element) {

  element.classList.remove("deselected");

  element.classList.add("selected");

  selectedIcon = element

}

function deselectIcon(element) {

  element.classList.remove("selected");

  element.classList.add("deselected");

  selectedIcon = element

}

function handleIconTap(element, targetWindow) {

  if (element.classList.contains("selected")) {

    deselectIcon(element)

    openWindow(targetWindow)

  } else {

    selectIcon(element)

  }

} 

function addWindowTapHandling(element) {

  element.addEventListener("mousedown", () => handleWindowTap(element))

}

function handleWindowTap(element) {

  biggestIndex++;

  element.style.zIndex = biggestIndex;

  topBar.style.zIndex = biggestIndex + 1;

  deselectIcon(selectIcon)

}

function initializeWindow(elementName) {

  var screen = document.querySelector("#" + elementName)

  var closeScreen = document.querySelector("#" + elementName + "close")

  addWindowTapHandling(screen)

  dragElement(screen)

  makeClosable(screen, closeScreen)

}

function setNotesContent(index) {

  var notesContent = document.querySelector("#notesContent")

  notesContent.innerHTML = content[index].content

}

function addToSideBar(index) {

  var sidebar = document.querySelector("#sidebar");

  var note = content[index];

  var newDiv = document.createElement("div");

  newDiv.classList.add("sidebarentry")

  newDiv.innerHTML = `
  
  <p style="margin: 0px;">

    ${note.title}

  </p>

  <p style="font-size: 12px; margin: 0px;">

    ${note.date}

  </p>
  
  `

  newDiv.addEventListener("click", function() {

    setNotesContent(index);

  });

  sidebar.appendChild(newDiv);

}

for (let i = 0; i< content.length; i++) {

  addToSideBar(i)

}

setNotesContent(0)

welcomeScreenOpen.addEventListener("click", () => openWindow(welcomeScreen));

coastervaultDesktopIcon.addEventListener("click", () => handleIconTap(coastervaultDesktopIcon, coastervault))

initializeWindow("welcome")

initializeWindow("coastervault")