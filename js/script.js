const gallery = document.getElementById("gallery");

const galleryConfig = {
    imageCount: 59,
    extension: "png"
};

for (let i = 1; i <= galleryConfig.imageCount; i++) {

    const img = document.createElement("img");

    img.src = `images/${String(i).padStart(3, "0")}.${galleryConfig.extension}`;
    img.alt = `Photo ${i}`;
    img.loading = "lazy";

    gallery.appendChild(img);

}