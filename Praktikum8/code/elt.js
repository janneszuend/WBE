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

document.addEventListener("DOMContentLoaded", function() {
  const board = document.querySelector(".board");
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const field = elt("div", { class: "field" });
      board.appendChild(field);
    }
  }
});
