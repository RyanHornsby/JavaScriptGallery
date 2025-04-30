// Have to mark this as async in order to use the async checkImage function
async function add_photo() {
    let imageURL = document.getElementById("input");
    // Check if it's an actual image
    let successful = await checkImage(imageURL.value);

    if (successful) {
        let newImage = document.createElement("div");
        newImage.classList.add("imageGroup");
        var part1 = document.createElement("div");
        part1.className = "frame";
        var part1A = document.createElement("button");
        part1A.textContent = "Take down";
        part1A.className = "removeButton";
        part1A.onclick = () => galleryGrid.removeChild(newImage);             
        updateEventListeners(part1A);
        part1.appendChild(part1A);
        var part2 = document.createElement("div");
        part2.className = "frameBackground";
        var part3 = document.createElement("img");
        part3.setAttribute("src", imageURL.value);
        newImage.appendChild(part1);
        newImage.appendChild(part2);        
        newImage.appendChild(part3);
        document.getElementById("galleryGrid").appendChild(newImage);   
    }
    imageURL.value = "";
}

// Greys out the image when you hover over take down button
function updateEventListeners(button) {
    button.addEventListener("mouseenter", function () {
        button.parentElement.style.setProperty("filter", "grayscale(100%)");
        button.parentElement.nextSibling.style.setProperty("filter", "grayscale(100%)");
        button.parentElement.nextSibling.nextSibling.style.setProperty("filter", "grayscale(100%)");
    });
    button.addEventListener("mouseleave", function () {
        button.parentElement.style.removeProperty("filter");
        button.parentElement.nextSibling.style.removeProperty("filter");
        button.parentElement.nextSibling.nextSibling.style.removeProperty("filter");
    });
}

// Checks if it's a real image
async function checkImage(URL) {
    // I think this works by creating a "promise", which means "will not run until I get a response"
    // Then resolve is just the argument / function, set as true or false
    // It returns the promise itself, not the actual result, so I have to use await on it
    return new Promise((resolve) => {
    // Create a temporary image (like doc.creElem("img"))
        const tempImage = new Image();
        tempImage.src = URL;
        // initialise success as false
        tempImage.onload = () => resolve(true);
        tempImage.onerror = () => resolve(false);
    })
};


document.getElementById("addPhotoButton").addEventListener("click", add_photo);

/*
Flaws:
-Didn't add an event listener to let you click enter instead of clicking button
-Still get a 404 error in console even when no image is handled
*/