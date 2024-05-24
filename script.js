function defaultCreateElement(tag, className, container) {
    let name = document.createElement(tag)
    name.className = className
    container.appendChild(name)
    return name
}

let body = document.body;
let container = defaultCreateElement("div", "container", body)
let frame = defaultCreateElement("div", "frame", container)
let txt = defaultCreateElement("textarea", "txt", frame)
txt.readOnly = true

// store rows in arr
let rows = []
for (let i = 0; i < 3; i++) {
    let div = defaultCreateElement("div", "div", container)
    rows.push(div)
}

let btnTxt = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 0,
    "+", "-", "*", "/", "=", "", ".", "<="
]
let txtMemory = []
let question = ""

// add text to calculator buttons
btnTxt.forEach((btnTxt, i) => {
    let btn = document.createElement("button")
    btn.className = "btn"
    btn.innerText = btnTxt

    // add event listener for button click
    btn.addEventListener("click", () => {
        // changes background colour when button clicked
        btn.classList.add("clicked")
        setTimeout(() => {
            btn.classList.remove("clicked")
        }, 200)

        if (btn.innerText === "=") {
            let expression = txtMemory.join("")
            // Use try-catch to handle invalid expressions
            try {
                // Evaluate the expression using the eval function
                let result = eval(expression)
                // Check if the result is Infinity (division by zero)
                if (result === Infinity) {
                    txt.innerText = "Thou cannot do such a thing!"
                    txtMemory = []
                    question = ""
                } else {
                    // Round the result to one decimal place
                    result = parseFloat(result.toFixed(1))
                    txt.innerText = result
                    txtMemory = [result.toString()] // Update memory with the result
                    question = result.toString()
                }
            } catch (error) {
                // If an error occurs during evaluation, display "Error"
                txt.innerText = "Error"
                txtMemory = []
                question = ""
            }
        } else if (btn.innerText === "") {
            // gives the clear button its function (of clearing the screen text)
            txt.innerText = ""
            txtMemory = []
            question = ""
        } else if (btn.innerText === "<=") {
            if (question.length > 0) {
                question = question.slice(0, -1)
                txtMemory.pop()
                txt.innerText = question
            }
        } else {
            question += btn.innerText
            txt.innerText = question
            txtMemory.push(btn.innerText)
        }
    });

    // add buttons into different divs to form rows
    if (i < 5) {
        rows[0].appendChild(btn)
    } else if (i >= 5 && i < 10) {
        rows[1].appendChild(btn)
    } else {
        rows[2].appendChild(btn)
    }
});
