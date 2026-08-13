document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("What Your Name?");
    // console.log(yourName);
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = 'Unkown';
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
// console.log(blocks);
let orderRange = [...Array(blocks.length).keys()];
// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// let orderRange = Array.from(Array(blocks.length).keys());
// console.log(orderRange);

// let testOrederRange = [1, 11, 13, 12, 18, 17, 19, 0, 2, 16, 5, 7, 9, 3, 10, 4, 6, 8, 14, 15];
//Add order css property to game blocks
blocks.forEach((block, index) => {
    // console.log(index);
    block.style.order = orderRange[index];
    //add click event
    block.addEventListener('click', function () {
        //trigger the flip block function
        flipBolck(block);
    });
});
//flip block function
function flipBolck(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    //collect all flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => (flippedBlock.classList.contains('is-flipped')));
    //if there two selected blocks
    if (allFlippedBlocks.length === 2) {
        // console.log('two seleceted')
        //stop clicking function
        stopClicking();
        //check matched block function
        checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}
//check matched block function
function checkMatchedBlock(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');
    // console.log('firstBlock:', firstBlock);
    // console.log('secondBlock:', secondBlock);
    if (firstBlock.dataset.techno === secondBlock.dataset.techno) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById("sccess").play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
        document.getElementById("fail").play();
    }
};
//stop clicking function
function stopClicking() {
    //Add class no clicking on main container
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        //remove class no clicking after the duration
        blocksContainer.classList.remove('no-clicking');

    }, duration);


};
//shuffle function
function shuffle(array) {
    //seting vars
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        //get random number
        random = Math.floor(Math.random() * current);
        //decrease lengthby one
        current--;
        // console.log(random);
        //[1] save current element in stash
        temp = array[current];
        //[2] current element =random element
        array[current] = array[random];
        //[3] random element=get element from stash
        array[random] = temp;

    }
    return array;
}
//[1] save current element in stash
//[2] current element =random element
//[3] random element=get element from stash














