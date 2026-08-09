const gallery = document.getElementById("gallery");

const imageCount = 79;
const extension = "png";

// Hur många av de senaste bilderna som ska märkas "NEW"
const newImageCount = 8;

// Antal bilder per sida
const imagesPerPage = 20;

let currentImage = imageCount;
let currentPage = 1;


// ============================
// Lightbox
// ============================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeButton = document.querySelector(".close");


// ============================
// Skapa sidnavigering
// ============================

const pagination = document.createElement("div");
pagination.className = "pagination";

gallery.after(pagination);


// ============================
// Bygg galleri
// ============================

function buildGallery(page) {

    gallery.innerHTML = "";

    currentPage = page;

    const totalPages = Math.ceil(imageCount / imagesPerPage);

    const newestImage =
        imageCount - ((page - 1) * imagesPerPage);

    const oldestImage =
        Math.max(
            1,
            newestImage - imagesPerPage + 1
        );


    // Nyaste bilden först
    for (let i = newestImage; i >= oldestImage; i--) {

        const filename =
            `${String(i).padStart(3, "0")}.${extension}`;

        const link = document.createElement("a");

        link.href = `images/${filename}`;

        // Spara bildnumret
        link.dataset.imageNumber = i;


        // Bild
        const img = document.createElement("img");

        img.src = `images/${filename}`;
        img.alt = `Photo ${i}`;


        // NEW-markering
        if (i > imageCount - newImageCount) {

            link.classList.add("new-image");

            const badge =
                document.createElement("span");

            badge.className = "new-badge";
            badge.textContent = "NEW";

            link.appendChild(badge);
        }


        link.appendChild(img);

        gallery.appendChild(link);


        // Klick på bild
        link.addEventListener("click", (event) => {

            event.preventDefault();

            currentImage =
                Number(link.dataset.imageNumber);

            openLightbox(currentImage);
        });
    }


    buildPagination(totalPages);
}


// ============================
// Sidnavigering
// ============================

function buildPagination(totalPages) {

    pagination.innerHTML = "";


    const navigation =
        document.createElement("div");

    navigation.className =
        "page-navigation";


    // Previous
    if (currentPage > 1) {

        const previousButton =
            document.createElement("button");

        previousButton.textContent =
            "← Previous";

        previousButton.addEventListener("click", () => {

            buildGallery(currentPage - 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        navigation.appendChild(previousButton);
    }


    // Page X of X
    const pageInfo =
        document.createElement("span");

    pageInfo.textContent =
        `Page ${currentPage} of ${totalPages}`;

    navigation.appendChild(pageInfo);


    // Next
    if (currentPage < totalPages) {

        const nextButton =
            document.createElement("button");

        nextButton.textContent =
            "Next →";

        nextButton.addEventListener("click", () => {

            buildGallery(currentPage + 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        navigation.appendChild(nextButton);
    }


    pagination.appendChild(navigation);
}


// ============================
// Öppna lightbox
// ============================

function openLightbox(number) {

    const filename =
        `${String(number).padStart(3, "0")}.${extension}`;

    lightboxImage.src =
        `images/${filename}`;

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

closeButton.addEventListener(
    "click",
    closeLightbox
);


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


// ============================
// Starta galleri
// ============================

buildGallery(1);