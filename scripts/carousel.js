const buttons = document.getElementsByClassName("carousel-button")
console.log(buttons)
Array.from(buttons).forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.classList.contains("next") ? 1 : -1
        const slides = button.closest(".carousel").querySelector("[data-slides]")
        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) {
            newIndex = slides.children.length - 1
        }
        if (newIndex >= slides.children.length) {
            newIndex = 0;
        }
        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})

function createCarousel(carousel) {
    let carouselElem = document.createElement("div"); carouselElem.classList.add("carousel")
    let slidesContainer = document.createElement("div")
    slidesContainer.classList.add("slides"); slidesContainer.dataset.slides = true
    carousel.forEach(string => {
        let image = document.createElement("img")
        image.setAttribute("class", "slide")
        image.setAttribute("src", string)
        slidesContainer.append(image)
    })
    if (carousel.length !== 1) {
        // button code
    }

}