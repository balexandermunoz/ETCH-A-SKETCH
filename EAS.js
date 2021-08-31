// Select Things: 
const Container = document.querySelector(".Container");     // Container of divs
const SizeBtn   = document.getElementById('SizeBtn');       // Button to change the size (Number of divs)
const ClearAllBtn = document.getElementById('ClearBtn');    // Button to clear All (Re make the divs)
const ColorBtn  = document.getElementById('ColorBtn');      // Button to change color  
const RainbowBtn  = document.getElementById('RainbowBtn');  // Button to Rainbow color
const EraseBnt = document.getElementById('EraseBtn');       // Button to set the brush color = background color 
const BgBtn = document.getElementById('BgBtn');             // Button to change the background color

// Initialize tings: 
let CurrentColor = "black";                     // Default brush color
let CurrentGridSize = 16;                       // Default grid size (Number of divs)
let CurrentBackgroundColor = BgBtn.value;       // Default Background color
let mode = 'Normal';                            // Default Brush Mode
let BrushBool = true;                           // To include the click to draw function.

// Adding events to buttons:
ClearAllBtn.addEventListener('click',FixGrid);      // To Clear all, we use the same fix grid function
SizeBtn.addEventListener('input',FixGrid);          // To increase the size (Number of divs)
EraseBnt.addEventListener('click', EraseMode);      // To fix the brush mode to Erase
ColorBtn.addEventListener('click',NormalMode);      // To fix the brush mode to Normal
RainbowBtn.addEventListener('click',RainbowMode);   // To fix the brush mode to Rainbow
BgBtn.addEventListener('change',changeBgColor);
Container.style.display = "grid";                   // Container need to be Grid

// Functions: 

// Change the background Color: 
function changeBgColor(){
    var sheet = document.createElement('style')
    CurrentBackgroundColor = BgBtn.value;
    sheet.innerHTML = ".frame {background-color:"+CurrentBackgroundColor+"};";
    document.body.appendChild(sheet);
}

//Function for setting and assembling the grid:
function FixGrid(){
    document.querySelectorAll('.frame').forEach(e => e.remove());   // Limpiar el grid anterionr:

    // Fix the grid size:
    if(SizeBtn.value > 100) SizeBtn.value = 100;          // Size upper limit
    else if(SizeBtn.value < 0) SizeBtn.value = 1;         // Size lower limit
    CurrentGridSize = SizeBtn.value;                      // Fix the currentGridsize (line 11)
    Container.style.gridTemplateColumns = "repeat("+CurrentGridSize+", 1fr)";

    // Cycle to create the divs: 
    for(var i = 0; i<CurrentGridSize*CurrentGridSize; i++){
        let OneFrame = document.createElement("div");     // Create a new Div element
        OneFrame.className = "frame";                     // Give a class 
        OneFrame.addEventListener('click',ClickGrid);     // Add the ClickGrid Event (line xx)
        Container.appendChild(OneFrame);
    }
}

// Function to activate mouseover event over the divs: 
function ClickGrid(){
    if (BrushBool){     // If click inside container Brushbool = true and add a mouseover event to each div
        document.querySelectorAll('.frame').forEach(e => {
            e.addEventListener('mouseover',Coloring);
        });
        BrushBool = false;
    }
    else{               // If click again, Brushbool = false and remove all mouseover events.
        document.querySelectorAll('.frame').forEach(e => {
            e.removeEventListener('mouseover',Coloring);
        });
        BrushBool = true; 
    }
}

// Function to fix the color and mouse over divs and paint:
function Coloring(e){
    if(mode == 'Erase'){        // If mode == Erase then set the brush color to Background color
        CurrentColor = CurrentBackgroundColor;
        e.target.style.backgroundColor = "";  //Remove the color.
    }

    else if(mode == 'Rainbow'){ // If mode == to Rainbow, randomize the color
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        CurrentColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        e.target.style.backgroundColor = CurrentColor;  //Paint the e div target.
    }

    else{                       // Else: (mode == Normal) fix the brush color to ColorBtn value
        CurrentColor = ColorBtn.value;
        e.target.style.backgroundColor = CurrentColor;  //Paint the e div target.
    }
}

// Changin mode functions:
function EraseMode(){
    mode = 'Erase';
}

function NormalMode(){
    mode = 'Normal';
}

function RainbowMode(){
    mode = 'Rainbow';
}

FixGrid();   // To initialize the grid