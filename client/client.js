
function edit(id){

    let parent = window.event.target.parentElement;
    //let parent = document.getElementById(id);
    title = parent.querySelector("h1").innerText;
    content = parent.querySelector("p").innerText;
    if(!parent.querySelector("form"))
 
    {
    let form = `
    <form action="/update" method="post">
        <input type="text" name="title" value = "${title}">
        <textarea name="content" placeholder = "content">${content}</textarea>
        <input type = "hidden" name = "id" value = "${id}">
        <input type="submit" value="save post">
    </form>`;

    parent.innerHTML +=form;
    }
    

}