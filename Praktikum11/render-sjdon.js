

function elt(type, attrs, ...children) {
    let node = document.createElement(type)
    for (a in attrs) {
      node.setAttribute(a, attrs[a])
    }
    for (let child of children) {
      if (typeof child != "string") node.appendChild(child)
      else node.appendChild(document.createTextNode(child))
    }
    return node
  }


function renderSJDON(element, appRoot) {
  let [tag, props, ...children] = element

  let el = elt(tag, props)

  // if (props) {
  //   Object.assign(el, props)
  // }

  // for (let child of children) {
  //   el.appendChild(document.createElement(child))
  // }

  appRoot.appendChild(el)
}

export {renderSJDON}