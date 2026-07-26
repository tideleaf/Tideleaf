const gallery = document.getElementById("gallery");

const galleryConfig = {
    imageCount: 59,
    extension: "png"
};

for (let i = 1; i <= galleryConfig.imageCount; i++) {

    const filename = `${String(i).padStart(3, "0")}.${galleryConfig.extension}`;

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

document.querySelectorAll("#gallery img").forEach((img) => {

    img.addEventListener("click", (event) => {
        event.preventDefault();

        lightboxImage.src = img.src;
        lightbox.classList.remove("hidden");
    });

});

closeButton.addEventListener("click", () => {
    lightbox.classList.add("hidden");
});

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.classList.add("hidden");
    }

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        lightbox.classList.add("hidden");
    }

});