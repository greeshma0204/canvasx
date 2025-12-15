
const blocks = document.querySelectorAll(".block");
const canvas = document.getElementById("canvas");

//  DRAG START 
blocks.forEach(block => {
    block.setAttribute("draggable", "true");

    block.addEventListener("dragstart", e => {
        e.dataTransfer.effectAllowed = "copy";
        e.dataTransfer.setData("type", block.dataset.type);
        block.classList.add("dragging");
    });

    block.addEventListener("dragend", () => {
        block.classList.remove("dragging");
    });
});

//  ALLOW DROP ON CANVAS 
canvas.addEventListener("dragover", e => {
    e.preventDefault();
});

canvas.addEventListener("drop", e => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    addBlockToCanvas(type);
});

//  TEMPLATES 
function addBlockToCanvas(type) {
    const div = document.createElement("div");
    div.classList.add("canvas-block");

    const templates = {
        hero: `
            <h1 style="color:#e9c77d">Hero Section</h1>
            <p>Write your hero description here...</p>
        `,
        bio: `
            <h2 style="color:#d9b362">Bio Section</h2>
            <p>Add your biography text here...</p>
        `,
        gallery: `
            <h2 style="color:#d9b362">Gallery</h2>
            <p>Image placeholders...</p>
        `,
        publications: `
            <h2 style="color:#d9b362">Publications</h2>
            <ul>
                <li>Publication 1</li>
            </ul>
        `,
        contact: `
            <h2 style="color:#d9b362">Contact</h2>
            <p>Email: example@gmail.com</p>
        `,
        footer: `
            <h3 style="color:#e9c77d">Footer Section</h3>
            <p>All rights reserved © 2025</p>
        `
    };

    div.innerHTML = templates[type];

    //  MAKE BLOCK EDITABLE 
    div.setAttribute("contenteditable", "true");

    div.addEventListener("focus", () => {
        div.style.borderColor = "#e2bf70";
        div.style.boxShadow = "0 0 15px rgba(255, 215, 120, 0.3)";
    });

    div.addEventListener("blur", () => {
        div.style.borderColor = "#d9b362";
        div.style.boxShadow = "none";
    });

    canvas.appendChild(div);
}

