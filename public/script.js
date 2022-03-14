const dateTxt = document.querySelector("input");
const updateTxt = document.getElementById("update");
const resultTxt = document.getElementById("result");
const searchBox = document.getElementById("searchbox");
const decimals = document.getElementById("decimals");
const decimalsFull = document.getElementById("full");
const decimalsCenter = document.getElementById("center");
const decimalsRest = document.getElementById("rest");

const PI_LARGE = `
3.14159265358979323846264338327950288419716939937510
58209749445923078164062862089986280348253421170679
82148086513282306647093844609550582231725359408128
48111745028410270193852110555964462294895493038196
44288109756659334461284756482337867831652712019091
45648566923460348610454326648213393607260249141273
72458700660631558817488152092096282925409171536436
78925903600113305305488204665213841469519415116094
33057270365759591953092186117381932611793105118548
07446237996274956735188575272489122793818301194912
98336733624406566430860213949463952247371907021798
60943702770539217176293176752384674818467669405132
00056812714526356082778577134275778960917363717872
14684409012249534301465495853710507922796892589235
42019956112129021960864034418159813629774771309960
51870721134999999837297804995105973173281609631859
50244594553469083026425223082533446850352619311881
71010003137838752886587533208381420617177669147303
59825349042875546873115956286388235378759375195778
18577805321712268066130019278766111959092164201989`.split('\n').join('');

const move = (marginleft = 0) => {
    decimals.style.marginLeft = marginleft + "px";

    const rect = decimalsCenter.getBoundingClientRect();
    
    // console.log(rect.top, rect.right, rect.bottom, rect.left);

    // If we've reached the right spot, stop
    if ((rect.left + rect.right) / 2 < document.body.clientWidth / 2) {
        return;
    }

    let newmargin;

    // Are we too far way? Just jump
    if (rect.right > document.body.clientWidth * 4) {
        newmargin = -(rect.right - document.body.clientWidth * 4);
    }
    // Still far away?
    else if (rect.right > document.body.clientWidth * 2) {
        newmargin = marginleft - 5;
    }
    // Still far away?
    else if (rect.right > document.body.clientWidth) {
        newmargin = marginleft - 3;
    }
    // Closing in?
    else {
        newmargin = marginleft - 2;
    }

    // console.log(newmargin);

    setTimeout(() => move(newmargin), 10);
}

const update = (value) => {
    resultTxt.innerHTML = `
        ...förekommer först efter <b>${value['position']}</b> decimaler!
    `;

    decimals.classList.remove("marquee");
    decimals.classList.add("display");
    decimalsFull.innerText = value['before'];
    decimalsCenter.innerText = value['searched'];
    decimalsRest.innerText = value['after'];

    setTimeout(move, 10);
}

const search = () => {
    searchBox.classList.add("unlimited");

    // sätt ihop yymmdd datum
    const value = dateTxt.value;
    const yymmdd = value[2] + value[3] + value[5] + value[6] + value[8] + value[9];
    updateTxt.innerHTML = `Ditt födelsedatum, <b>${yymmdd}</b>...`;
    resultTxt.innerText = "..."

    // Skicka request
    fetch(`/search/${yymmdd}`)
        .then(async response => {
            const json = await response.json();
            console.log(json);
            update(json);
        })
}

dateTxt.value = "2022-03-14";
decimalsFull.innerText = PI_LARGE;

// Popup
var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

document.onkeydown = (evt) => {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        toggleModal();
    }
};
