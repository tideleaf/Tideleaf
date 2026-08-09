const gallery = document.getElementById("gallery");

const imageCount = 78;
const extension = "png";

// Hur många av de senaste bilderna som ska märkas "NY"
const newImageCount = 7;

let currentImage = imageCount;


// ============================
// Bygg galleri
// ============================

// Nyaste bilden först
for (let i = imageCount; i >= 1; i--) {

    const filename = `${String(i).padStart(3, "0")}.${extension}`;

    const link = document.createElement("a");
    link.href = `images/${filename}`;

    // Spara bildnumret så vi alltid öppnar rätt bild
    link.dataset.imageNumber = i;

    const img = document.createElement("img");
    img.src = `images/${filename}`;
    img.alt = `Photo ${i}`;

    // Märk de senaste bilderna
    if (i > imageCount - newImageCount) {

        link.classList.add("new-image");

        const badge = document.createElement("span");
        badge.className = "new-badge";
        badge.textContent = "NY";

        link.appendChild(badge);
    }

    link.appendChild(img);
    gallery.appendChild(link);
}


// ============================
// Lightbox
// ============================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeButton = document.querySelector(".close");

const links = document.querySelectorAll("#gallery a");


// Klick på bild
links.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        currentImage = Number(link.dataset.imageNumber);

        openLightbox(currentImage);
    });

});


// ============================
// Öppna lightbox
// ============================

function openLightbox(number) {

    const filename =
        `${String(number).padStart(3, "0")}.${extension}`;

    lightboxImage.src = `images/${filename}`;

    lightbox.classList.remove("hidden");
}


// ============================
// Stäng lightbox
// ============================

function closeLightbox() {

    lightbox.classList.add("hidden");
}


// ============================
// Nästa bild
// ============================

function nextImage() {

    currentImage--;

    if (currentImage < 1) {

        currentImage = imageCount;
    }

    openLightbox(currentImage);
}


// ============================
// Föregående bild
// ============================

function previousImage() {

    currentImage++;

    if (currentImage > imageCount) {

        currentImage = 1;
    }

    openLightbox(currentImage);
}


// ============================
// Stängknapp
// ============================

closeButton.addEventListener("click", closeLightbox);


// ============================
// Klick utanför bilden
// ============================

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();
    }

});


// ============================
// Tangentbord
// ============================

document.addEventListener("keydown", (event) => {

    // Gör inget om lightboxen är stängd
    if (lightbox.classList.contains("hidden")) {
        return;
    }

    switch (event.key) {

        case "Escape":

            closeLightbox();

            break;


        case "ArrowRight":

            nextImage();

            break;


        case "ArrowLeft":

            previousImage();

            break;
    }

});
