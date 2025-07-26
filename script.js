var arr = JSON.parse(localStorage.getItem("addProduct")) || [];
let datta = { books: [] };
const favcards = JSON.parse(localStorage.getItem("loved")) || [];
        let myArray = [...favcards];
        let allProducts = [];

fetch("https://edu-me01.github.io/Json-Data/Digital-Library.json")
    .then(res => res.json())
    .then(data => {
        datta = data;
        localStorage.setItem("datta", JSON.stringify(data));
        allProducts = data.books;
        const container = document.getElementById("p__book");
        const x = document.getElementById("nn");
        if (x) x.innerHTML = `${myArray.length}`;
        data.books.forEach(item => {
            const inCart = arr.find(book => book.id == item.id);
            const quantity = inCart ? inCart.quantity : 1;

            container.innerHTML += `
                <div class="p_book" data-id="${item.id}">
                    <div class="p_book-img">
                        <img src="${item.coverImage}">
                        <div class="top-icons">
                            <button class="icon-btn" onclick="openModal(${item.id})"><i class="fas fa-expand"></i></button>
                            <button class="icon-btn" id="lovedd" onclick="loved(this, ${item.id})"><i class="fa-regular fa-heart"></i></button>
                            <!-- Modal -->
                            <div id="myModal" class="modal">
                                <div id="m_content" class="modal-content">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p_book-p">
                        <h4>${item.title}</h4>
                        <p>${item.category}</p>
                        <p>By:<span class="p_book-span">${item.author}</span></p>
                        <p>Downloads: <span class="p_book-span">+${item.downloads}</span></p>

                        <button class="add_to_card_btn" style="${inCart ? 'display:none;' : ''}" onclick="addd(this, ${item.id})">
                            <i class="fas fa-shopping-cart"></i> Add to cart
                        </button>

                        <div class="quantity-box" style="display:${inCart ? 'flex' : 'none'}">
                            <i class="fas fa-trash"></i>
                            <span id="qty">${inCart ? inCart.quantity : 1}</span>
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>     
                </div>
            `;
        });

        updateCartCount();
    });


function addd(btn, ID) {
    var p = datta.books.find(u => u.id == ID);
    if (!p) return alert("Book not found!");

    let existing = arr.find(book => book.id == ID);
    if (existing) {
        existing.quantity++;
    } else {
        p.quantity = 1;
        arr.push(p);
    }

    localStorage.setItem("addProduct", JSON.stringify(arr));


    btn.style.display = "none";


    let qtyBox = btn.nextElementSibling;
    if (qtyBox) {
        qtyBox.style.display = "flex";
        qtyBox.querySelector("#qty").textContent = "1";
    }

    updateCartCount();
}


document.addEventListener("click", function (e) {
    if (e.target.classList.contains("fa-plus")) {
        let qtyBox = e.target.parentElement;
        let qtySpan = qtyBox.querySelector("#qty");
        let qty = parseInt(qtySpan.textContent);
        qty++;
        qtySpan.textContent = qty;

        let parentCard = e.target.closest(".p_book");
        let bookID = parentCard.getAttribute("data-id");
        let item = arr.find(book => book.id == bookID);
        if (item) item.quantity = qty;
        localStorage.setItem("addProduct", JSON.stringify(arr));
        updateCartCount();
    }

    if (e.target.classList.contains("fa-trash")) {
        let qtyBox = e.target.parentElement;
        let qtySpan = qtyBox.querySelector("#qty");
        let qty = parseInt(qtySpan.textContent);

        let parentCard = e.target.closest(".p_book");
        let bookID = parentCard.getAttribute("data-id");

        if (qty > 1) {
            qty--;
            qtySpan.textContent = qty;

            let item = arr.find(book => book.id == bookID);
            if (item) item.quantity = qty;
        } else {

            arr = arr.filter(book => book.id != bookID);


            qtyBox.style.display = "none";


            let addBtn = qtyBox.previousElementSibling;
            if (addBtn && addBtn.classList.contains("add_to_card_btn")) {
                addBtn.style.display = "inline-block";
            }
        }

        localStorage.setItem("addProduct", JSON.stringify(arr));
        updateCartCount();
    }
});


function updateCartCount() {
    const countElement = document.getElementById("cart-count");
    if (countElement) {
        let total = 0;
        arr.forEach(b => total += b.quantity || 1);
        countElement.textContent = total;
    }
}
function loggin() {
    window.location.href = "login.html";
}
function reg() {
    window.location.href = "reg.html";
}
function openModal(ID) {
    document.getElementById("myModal").style.display = "block";
    const book_details = datta.books.find(b => b.id ===ID)
    var overly = document.getElementById("m_content")
    overly.innerHTML = `
    <button id="closeSidebarBtn" onclick="closeModal()" style="position: absolute; top: 4px; right: 15px; background: none; border: none; font-size: 22px; color: rgb(47, 72, 88); cursor: pointer;">✖</button>
        <div class="p_book_details" data-id="${book_details.id}">
                    <div class="p_book-img_detals">
                        <img src="${book_details.coverImage}">
                    </div>
                    <div class="p_book-p_details">
                        <h4>${book_details.title}</h4>
                        <p>category: <span class="p_book-span">${book_details.category}</span></p>
                        <span class="p_book-span"> ${book_details.tags[0]}, ${book_details.tags[1]}, ${book_details.tags[2]}, ${book_details.tags[3]} </span>
                        <p>By: <span class="p_book-span">${book_details.author}</span></p>
                        <p>Downloads: <span class="p_book-span"> +${book_details.downloads}</span></p>
                        <p>${book_details.description}</p>
                        <div style="background-color: rgb(47, 72, 88);
    height: 3px;
    width: 100%;
    border-radius: 5px;
    text-align: center;"></div>
                        <div style="display:flex; gap:20px">
                            <div>
                                <p class="p_p_details">language: <span class="p_book-span">${book_details.language}</span></p>
                                <p class="p_p_details">pages: <span class="p_book-span">${book_details.pages}</span></p>
                                <p class="p_p_details"><span class="p_book-span">${book_details.format}</span></p>
                            </div>
                            <div>
                                <p class="p_p_details">Size: <span class="p_book-span">${book_details.fileSize}</span></p>
                                <p class="p_p_details">is available: <span class="p_book-span">${book_details.available}</span></p>
                                <p class="p_p_details">publication Year: <span class="p_book-span">${book_details.publicationYear}</span></p>
                            </div>
                        </div>
                        
                        
                    </div>     
                </div>
                        
    `;
    
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// function loved(btn, id) {
//             const favItem = allProductss.find(p => p.id === id);
//             const existIndex = myArray.findIndex(p => p.id === id);
    
//             if (existIndex === -1) {
//                 myArray.push(favItem);
//                 btn.parentElement.remove();
//                 btn.innerHTML`
//                     <button class="icon-btn" id="lovedd" onclick="loved(this, ${item.id})"><i class="fa-solid fa-heart"></i></button>
//                 `;
//                 Swal.fire("Added to favorites!", "", "success");
//             } else {
//                 myArray.splice(existIndex, 1);
//                 btn.parentElement.remove();
//                 btn.innerHTML`
//                     <button class="icon-btn" id="lovedd" onclick="loved(this, ${item.id})"><i class="fa-regular fa-heart"></i></button>
//                 `;
//                 Swal.fire("Removed from favorites!", "", "warning");
//             }
    
//             localStorage.setItem("loved", JSON.stringify(myArray));
//             document.getElementById("nn").innerHTML = `${myArray.length}`;
//         }
function loved(btn, id) {
    const favItem = allProducts.find(p => p.id === id);
    const existIndex = myArray.findIndex(p => p.id === id);

    if (existIndex === -1) {
        myArray.push(favItem);
        btn.querySelector("i").classList.remove("fa-regular");
        btn.querySelector("i").classList.add("fa-solid");
        Swal.fire("Added to favorites!", "", "success");
    } else {
        myArray.splice(existIndex, 1);
        btn.querySelector("i").classList.remove("fa-solid");
        btn.querySelector("i").classList.add("fa-regular");
        Swal.fire("Removed from favorites!", "", "warning");
    }

    localStorage.setItem("loved", JSON.stringify(myArray));
    // const x = document.getElementById("nn");
    // if (x) x.innerHTML = `${myArray.length}`;
}


