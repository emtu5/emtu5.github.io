fetch("assets/jason/projects.json")
    .then(response => response.json())
    .then(data => {
        display_projects(data)
    })