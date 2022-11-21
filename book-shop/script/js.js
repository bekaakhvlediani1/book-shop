let bagData=null
let booksData = {}
fetch('../books.json') //path to the file with json data
    .then(response => {
        return response.json();
    })
    .then(datas => {
        man(datas)
    });



function man(datas) {
    drawingData(datas)
    functions(datas);
    closingFunctions(datas);

}

function closingFunctions(datas) {
    const elements = document.querySelectorAll(".cancelButton");
    console.log(elements)
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function (e) {
            console.log(`${i}button`)
            let gettingId = `${i}button`
            let element = document.getElementById(gettingId);
            e.path[1].remove();
        })
    }
}
function drawingBagData(data, index) {
    let check=true
    let i = 0;
        let books=document.getElementsByClassName('boughtBook')
        console.log(books)
        for(let i=0; i<books.length; i++){
            console.log(books[i].id, `boughtBook${index}`)
            if(books[i].id===`boughtBook${index}`){
                check=false
            }
        }
        if(check){
        const fragment = document.createElement("div");
        const bagCatalog=document.getElementsByClassName("bagCatalog")
        const textDiv = document.createElement("div");
        const author = document.createElement('p');
        author.textContent = data.author;
        const bookName = document.createElement('h2');
        bookName.textContent = data.title;
        fragment.className = "boughtBook";
        fragment.id = `boughtBook${index}`;
        textDiv.createElement = ('p')
        textDiv.className = "textContent"
        const img = document.createElement("img");
        img.src = data.imageLink;
        textDiv.appendChild(author)
        textDiv.appendChild(bookName)
        fragment.appendChild(img)
        fragment.appendChild(textDiv)
        console.log(bagCatalog, fragment)
        bagCatalog[0].appendChild(fragment)
        }
}

function functions(datas) {
    const elements = document.querySelectorAll("button");
    let j = 0;
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function (e) {
            if (elements[i].textContent == "show more") {
                if (!e.path[3].querySelector(".showMOre")) {
                    const showMOre = document.createElement("div");
                    showMOre.className = "showMOre";
                    showMOre.innerHTML = `<p>${datas[(e.path[1].id) - 1].description}</p>`;
                    const cancelButton = document.createElement("button");
                    cancelButton.innerHTML = "close"
                    cancelButton.className = "cancelButton"
                    cancelButton.id = `${j + 'button'}`
                    showMOre.appendChild(cancelButton)
                    e.path[2].appendChild(showMOre)
                    closingFunctions(datas)
                    j++;
                }
            } else {
                drawingBagData(datas[(Math.floor(i / 2))], Math.floor(i / 2))
            }
        });
    }
}

function drawingData(datas) {
    const mainDiv = document.querySelector('.wrapper')
    const bookCatalog = document.createElement("bookCatalog");
    const bagCatalog = document.createElement("bagCatalog");
    bookCatalog.className = "bookCatalog"
    bagCatalog.className ="bagCatalog "
    let i = 0;
    mainDiv.appendChild(bookCatalog)
    mainDiv.appendChild(bagCatalog)
    datas.map(data => {
        i++
        const fragment = document.createElement("div");
        const textDiv = document.createElement("div");
        const author = document.createElement('p');
        author.textContent = data.author;
        const bookName = document.createElement('h2');
        bookName.textContent = data.title;
        const price = document.createElement('p');
        price.textContent = `Price: ${data.price}`;
        fragment.className = "bookData";
        fragment.id = `bookData${i}`;
        textDiv.createElement = ('p')
        textDiv.className = "textContent"
        const buttons = document.createElement('div');
        buttons.className = "buttons"
        buttons.id = i;
        const img = document.createElement("img");
        const showBttn = document.createElement("button");
        showBttn.innerHTML = "show more";
        const addBttn = document.createElement("button");
        buttons.appendChild(showBttn)
        addBttn.innerHTML = "add to bag"
        buttons.appendChild(addBttn)
        img.src = data.imageLink;
        textDiv.appendChild(author)
        textDiv.appendChild(bookName)
        textDiv.appendChild(price)
        textDiv.appendChild(buttons)
        fragment.appendChild(img)
        fragment.appendChild(textDiv)
        bookCatalog.appendChild(fragment)
    }
    )
}