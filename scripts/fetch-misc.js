fetch("assets/jason/misc.json")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        display_projects(data)
    })