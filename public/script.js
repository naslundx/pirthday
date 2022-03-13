const dateTxt = document.querySelector("input");
const updateTxt = document.getElementById("update");
const resultTxt = document.getElementById("result");
const searchBox = document.getElementById("searchbox")

const step2 = () => {
    // update ui
}

const step3 = (value) => {
    resultTxt.innerText = `
        Ditt födelsedatum förekommer först efter ${value['position']} decimaler!
        
    `;
    // ...${value['decimals']}...
}

const search = () => {
    searchBox.classList.add("unlimited");

    // sätt ihop yymmdd datum
    const value = dateTxt.value;
    const yymmdd = value[2] + value[3] + value[5] + value[6] + value[8] + value[9];
    updateTxt.innerText = "Du föddes " + yymmdd + "...";
    resultTxt.innerText = "..."

    // Skicka request
    fetch(`/search/${yymmdd}`)
        .then(async response => {
            const json = await response.json();
            console.log(json);
            step3(json);
        })
}

dateTxt.value = "1990-01-01";
