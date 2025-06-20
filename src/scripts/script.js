// Get form elements
const formContainer = document.querySelector(".aside-form");
const form = document.querySelector("form");
const quantityToDraw = document.getElementById("numbers-quantity");
const startNumber = document.getElementById("numbers-from");
const finalNumber = document.getElementById("numbers-to");
const dontRepeatNumbers = document.getElementById("repeat-number");

// Get result elements
const resultContainer = document.querySelector("div.result");
const resultsDiv = document.querySelector("div.results");
const drawAgain = document.querySelector("button.draw-again-button");
const resultsQuantity = document.querySelector("p.result-number span");

let drawQuantity = 1;

quantityToDraw.oninput = () => {
    quantityToDraw.value = quantityToDraw.value.replace(/\D/g, "");
};

startNumber.oninput = () => {
    startNumber.value = startNumber.value.replace(/\D/g, "");
};

finalNumber.oninput = () => {
    finalNumber.value = finalNumber.value.replace(/\D/g, "");
};

form.onsubmit = (event) => {
    event.preventDefault();

    generateRandomNumber(
        quantityToDraw.value,
        startNumber.value,
        finalNumber.value
    );

    drawQuantity = 1;
    resultsQuantity.innerText = `${Number(drawQuantity)}°`;
};

drawAgain.addEventListener("click", () => {
    generateRandomNumber(
        quantityToDraw.value,
        startNumber.value,
        finalNumber.value
    );

    drawQuantity++;
    resultsQuantity.innerText = `${Number(drawQuantity)}°`;
});

function generateRandomNumber(quantity, min, max) {
    try {
        const canGenerateWithoutRepeat = Number(max) >= Number(quantity);

        if (dontRepeatNumbers.checked && !canGenerateWithoutRepeat) {
            throw new RangeError(
                `Não é possível gerar ${quantity} sem repetir`
            );
        } else if (min >= max) {
            throw new RangeError(
                "Número mínimo não pode ser maior ou igual ao número máximo"
            );
        }

        resultsDiv.innerHTML = "";

        let generatedNumbers = [];

        for (let i = 0; i < quantity; i++) {
            const minCeiled = Math.ceil(min);
            const maxFloored = Math.floor(max);

            const randomNumber = Math.floor(
                Math.random() * (maxFloored - minCeiled + 1) + minCeiled
            );

            if (dontRepeatNumbers.checked) {
                if (generatedNumbers.includes(randomNumber)) {
                    i--;
                    continue;
                }
            }

            showResults(randomNumber);

            generatedNumbers.push(randomNumber);
        }
    } catch (error) {
        console.log(error);

        if (error instanceof RangeError) {
            alert(error);
        } else {
            alert("Algo deu errado, tente novamente mais tarde!");
        }
    }
}

function showResults(result) {
    try {
        const resultItemContainer = document.createElement("div");
        resultItemContainer.classList.add("result-container");

        const resultSpan = document.createElement("span");
        resultSpan.classList.add("result-item");
        resultSpan.innerText = result;

        resultItemContainer.appendChild(resultSpan);
        resultsDiv.appendChild(resultItemContainer);

        formContainer.classList.remove("visible");
        formContainer.classList.add("invisible");

        resultContainer.classList.remove("invisible");
        resultContainer.classList.add("visible");
    } catch (error) {
        console.log(error);

        alert("Algo deu errado, tente novamente.");
    }
}
