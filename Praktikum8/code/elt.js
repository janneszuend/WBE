function elt (type, attrs, ...children) {
  let node = document.createElement(type)
  Object.keys(attrs).forEach(key => {
    node.setAttribute(key, attrs[key])
  })
  for (let child of children) {
    if (typeof child != "string") node.appendChild(child)
    else node.appendChild(document.createTextNode(child))
  }
  return node
}

function showBoard() {
  const board = document.querySelector(".board")
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const field = elt("div", { class: "field" })
      if(Math.round(Math.random()) === 1) {
        if(Math.round(Math.random()) === 1) {
          const piece = elt("div", {class: "blue piece"})
          field.appendChild(piece)
        }else {
          const piece = elt("div", {class: "red piece"})
          field.appendChild(piece)
        }

      }
      board.appendChild(field)
    }
  }
}

