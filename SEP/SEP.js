function renderQuestion(elem, json){



  let el = document.createElement(div);

  objs = JSON.parse(json)


  for (let child of objs) {
    let node = document.createElement(child[0]);
    let num = child.length;
    for (let i = 1; i < num; i++) {
      if (typeof child[i] === "string") {
        node.textContent = child[i];
      } else {
        let attrs = child[i];
        for (let a in attrs) {
          node.setAttribute(a, attrs[a]);
        }
      }
    }
    el.appendChild(node);
  }
  elem.appendChild(el);
}





function addLimitedListener (elem, type, max,  handler){
  let element = document.querySelector(elem)
  for(let i = 0;i<max;i++){
    element.addEventlistener(type, handler)
  }
}




function stringifySJDON(...input){
  let output = ""
  for (let entry of input){
    if (entry === "br"){
      output += "<br />"
    }

  }
  return output
}
