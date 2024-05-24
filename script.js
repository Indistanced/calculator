function defaultCreateElement(tag, className, container) {
    let name = document.createElement(tag)
    name.className = className
    container.appendChild(name)
    return name
}

let body = document.body
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
    { text: "1", accessKey: "1" }, { text: "2", accessKey: "2" }, { text: "3", accessKey: "3" }, { text: "4", accessKey: "4" }, { text: "5", accessKey: "5" },
    { text: "6", accessKey: "6" }, { text: "7", accessKey: "7" }, { text: "8", accessKey: "8" }, { text: "9", accessKey: "9" }, { text: "0", accessKey: "0" },
    { text: "+", accessKey: "+" }, { text: "-", accessKey: "-" }, { text: "*", accessKey: "*" }, { text: "/", accessKey: "/" },
    { text: "=", accessKey: "=" }, { text: "", accessKey: "" }, { text: ".", accessKey: "." }, { text: "<=", accessKey: "Backspace" }
]
let txtMemory = []
let question = ""

// add text to calculator buttons
btnTxt.forEach((btnData, i) => {
    let btn = document.createElement("button")
    btn.className = "btn"
    btn.innerText = btnData.text
    btn.accessKey = btnData.accessKey

    // add event listener for button click
    btn.addEventListener("click", () => handleClick(btn))

    // add buttons into different divs to form rows
    if (i < 5) {
        rows[0].appendChild(btn)
    } else if (i >= 5 && i < 10) {
        rows[1].appendChild(btn)
    } else {
        rows[2].appendChild(btn)
    }
})

function handleClick(btn) {
    // changes background colour when button clicked
    btn.classList.add("clicked")
    setTimeout(() => {
        btn.classList.remove("clicked")
    }, 200)

    if (btn.innerText === "=") {
        let expression = txtMemory.join("")
        // use try-catch to handle invalid expressions
        try {
            // evaluate the expression using the eval function
            let result = eval(expression)
            // check if the result is Infinity (division by zero)
            if (result === Infinity) {
                txt.innerText = "Thou cannot do such a thing!"
                txtMemory = []
                question = ""
            } else {
                // round the result to one decimal place
                result = parseFloat(result.toFixed(1))
                txt.innerText = result
                txtMemory = [result.toString()] // update memory with the result
                question = result.toString()
            }
        } catch (error) {
            // display "Error" if an error occurs during evaluation
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
}

// add keyboard support
document.addEventListener("keydown", (event) => {
    const key = event.key
    btnTxt.forEach((btnData) => {
        if (btnData.accessKey === key) {
            const btn = document.querySelector(`button[accesskey="${key}"]`)
            if (btn) {
                handleClick(btn)
            }
        }
    })
})
