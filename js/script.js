const gallery = document.getElementById("gallery");

const imageCount = 59;

for (let i = 1; i <= imageCount; i++) {
    const img = document.createElement("img");

    img.src = `images/${String(i).padStart(3, "0")}.png`;
    img.alt = `Photo ${i}`;
    img.loading = "lazy";

    gallery.appendChild(img);
}