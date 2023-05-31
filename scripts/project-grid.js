let buttons = null
function display_projects(data) {
    let container = document.getElementById("projects-grid")
    data.forEach(element => {
        console.log(element)

        let div = document.createElement("div")
        div.classList.add('tile', 'row')

        let article = document.createElement("article")
        if(element["hyperlink"]) {
            article.innerHTML += `<a href=${element["hyperlink"]}><h2>${element["title"]}</h2></a><p>${element["description"]}</p>`
        }
        else {
            article.innerHTML += `<h2>${element["title"]}</h2><p>${element["description"]}</p>`
        }
        div.append(article);

        if (element['carousel']) {
            let carousel = document.createElement("div")
            carousel.classList.add("carousel")

            let slidesContainer = document.createElement("div")
            slidesContainer.classList.add("slides")
            slidesContainer.setAttribute('data-slides', '1')
            console.log(element["carousel"])

            element['carousel'].forEach(imagePath => {
                let img = document.createElement("img")
                if (element["carousel"][0] === imagePath) {
                    img.setAttribute("data-active", "1")
                }
                img.classList.add("slide", "zoom")
                console.log(imagePath)
                img.src = imagePath
                slidesContainer.append(img)
            })
            carousel.append(slidesContainer)

            if(element["carousel"].length > 1) {
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
            console.log("aaaaaaaaaaaaaaaaaa")
            div.append(carousel)
        }
        else if (element["text"]) {
            let paraDiv = document.createElement("div")
            paraDiv.classList.add("paraDiv")
            let p = document.createElement("p")
            p.innerHTML = element["text"]
            paraDiv.append(p)
            div.append(paraDiv)
        }
        container.append(div);
    })
    loadButtons()
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
            slides.children[newIndex].dataset.active = true
            delete activeSlide.dataset.active
        })
    })


}