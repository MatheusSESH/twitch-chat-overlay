const userName = process.env.USER_NAME
const userText = process.env.USER_TEXT

const renderElement = document.querySelector('#container')

const addElemt = () => {
    
    const divEl = document.createElement("div")
    divEl.setAttribute('class','message')

    const span = document.createElement("span")
    span.setAttribute('class','cian')
    const textSpan = document.createTextNode(`${userName}: `) 
    span.appendChild(textSpan)

    const textP = document.createElement('p')
    const menssageP = document.createTextNode(`${userText}`)
    textP.appendChild(menssageP)

    divEl.appendChild(span)
    divEl.appendChild(textP)
    renderElement.appendChild(divEl)

}
addElemt()