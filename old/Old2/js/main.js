// Import statements


// Presentation blocks behavior
// Reference: https://www.youtube.com/watch?v=bAwEj_mSzOs&list=WL&index=3
const createTile = idx =>{
    const tile = document.createElement("div");
    tile.classList.add("tile");
    return tile;
};

const createTiles = (wrapper, quantity) => {
    Array.from(Array(quantity)).map((tile, index) => {
        wrapper.appendChild(createTile(index));
    })
};

// # of blocks
let scaleFactor = 60;

// Actually calling the functions
let wrapper = document.getElementById("presentation-background");
const createGrid = () => {
    wrapper.innerHTML = "";

    let columns = Math.floor(document.body.clientWidth / scaleFactor),
    rows = Math.floor(document.body.clientHeight / scaleFactor);

    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);
    createTiles(wrapper, columns * rows);
};

createGrid();
window.addEventListener('resize', () => {
    createGrid();
});
