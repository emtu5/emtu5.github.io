let buttons = null
function display_projects(data) {
    let container = document.getElementById("projects-grid")
    data.forEach(element => {
        let div = document.createElement("div")
        div.classList.add('tile', 'row')

        div.append(createArticle(element["title"], element["description"], element["hyperlink"]));

        if (element['carousel']) {
            div.append(createCarousel(element["carousel"]))
        }
        else if (element["text"]) {
            div.append(createText(element["text"]))
        }
        container.append(div);
    })
    loadButtons()
}

function createArticle(title, desc, hyper) {
    let article = document.createElement("article")
    if(hyper) {
        article.innerHTML += `<a href=${hyper}><h2>${title}</h2></a><p>${desc}</p>`
    }
    else {
        article.innerHTML += `<h2>${title}</h2><p>${desc}</p>`
    }
    return article
}

function createCarousel(imageArray) {
    let carousel = document.createElement("div")
    carousel.classList.add("carousel")

    let slidesContainer = document.createElement("div")
    slidesContainer.classList.add("slides")
    slidesContainer.setAttribute('data-slides', '1')

    imageArray.forEach(imagePath => {
        let img = document.createElement("img")
        if (imageArray[0] === imagePath) {
            img.setAttribute("data-active", "1")
        }
        img.classList.add("slide", "zoom")
        console.log(imagePath)
        img.src = imagePath
        slidesContainer.append(img)
    })
    carousel.append(slidesContainer)
    return addButtons(carousel, imageArray)
}

function addButtons(carousel, imageArray) {
    if(imageArray.length > 1) {
        let buttonWrapper = document.createElement("div")
        buttonWrapper.classList.add("button-wrapper")

        let buttonPrev = document.createElement("button")
        buttonPrev.innerHTML = "&#8592;"
        buttonPrev.classList.add("carousel-button", "previous")

        let buttonNext = document.createElement("button")
        buttonNext.innerHTML = "&#8594;"
        buttonNext.classList.add("carousel-button", "next")
        buttonWrapper.append(buttonPrev)
        buttonWrapper.append(buttonNext)
        carousel.append(buttonWrapper)
    }
    return carousel
}

function createText(txt) {
    let paraDiv = document.createElement("div")
    paraDiv.classList.add("paraDiv")
    let p = document.createElement("p")
    p.innerHTML = txt
    paraDiv.append(p)
    return paraDiv
}

function loadButtons() {
    buttons = document.getElementsByClassName("carousel-button")
    console.log(buttons)
    Array.from(buttons).forEach(button => {
        button.addEventListener("click", () => {
            const offset = button.classList.contains("next") ? 1 : -1
            console.log(offset)
            const slides = button.closest(".carousel").querySelector("[data-slides]")
            const activeSlide = slides.querySelector("[data-active]")
            let newIndex = [...slides.children].indexOf(activeSlide) + offset
            if (newIndex < 0) {
                newIndex = slides.children.length - 1
            }
            if (newIndex >= slides.children.length) {
                newIndex = 0;
            }
            slides.children[newIndex].dataset.active = '1'
            delete activeSlide.dataset.active
        })
    })

}