function renderSJDON(element, appRoot) {
  let [tag, props, ...children] = element

  let el = document.createElement(tag)
  for (let p in props) {
    el.setAttribute(p, props[p])
  }

  for (let child of children) {
    let node = document.createElement(child[0])
    let num = child.length
    for (let i = 1; i < num; i++) {
      if (typeof child[i] === 'string') {
        node.textContent = child[i]
      }else{
        let attrs = child[i]
        for (let a in attrs) {
          node.setAttribute(a, attrs[a])
        }
      }
    }
    el.appendChild(node)
  }
  appRoot.appendChild(el)
}

export {renderSJDON}