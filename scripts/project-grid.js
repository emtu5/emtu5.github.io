function display_projects(data) {
    let container = document.getElementById("projects-grid")
    data.forEach(element => {
        console.log(element)
        let div = document.createElement("div")
        div.classList.add('tile', 'row')
        let article = document.createElement("article")
        // no actual info checking lol
        article.innerHTML += `<h2>${element["title"]}</h2><p>${element["description"]}</p>`
        div.append(article);
        if (element['carousel']) {
            let figure = document.createElement("figure")
            figure.innerHTML = `<img src=${element['carousel'][0]}>`
            console.log("aaaaaaaaaaaaaaaaaa")
            div.append(figure)
        }
        container.append(div);
    })
}