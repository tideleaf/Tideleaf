const gallery = document.getElementById("gallery");

const imageCount = 59;
const extension = "png";

let currentImage = 1;

// ==========================
// Bygg galleriet
// ==========================

for (let i = 1; i <= imageCount; i++) {

    const filename = `${String(i).padStart(3, "0")}.${extension}`;

    const link = document.createElement("a");
    link.href = `images/${filename}`;

    const img = document.createElement("img");
    img.src = `images/${filename}`;
    img.alt = `Photo ${i}`;
    img.loading = "lazy";

    link.appendChild(img);
    gallery.appendChild(link);
}

// ==========================
// Lightbox
// ==========================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeButton = document.querySelector(".close");

const links = document.querySelectorAll("#gallery a");

links.forEach((link, index) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        currentImage = index + 1;

        openLightbox(currentImage);

    });

});

function openLightbox(number) {

    const filename = `${String(number).padStart(3, "0")}.${extension}`;

    lightboxImage.src = `images/${filename}`;

    lightbox.classList.remove("hidden");

}

function closeLightbox() {

    lightbox.classList.add("hidden");

}

function nextImage() {

    currentImage++;

    if (currentImage > imageCount) {

        currentImage = 1;

    }

    openLightbox(currentImage);

}

function previousImage() {

    currentImage--;

    if (currentImage < 1) {

        currentImage = imageCount;

    }

    openLightbox(currentImage);

}

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});

document.addEventListener("keydown", (event) => {

    if (lightbox.classList.contains("hidden")) return;

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

