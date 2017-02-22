function createElement(tree) {
  const el = document.createElement(tree.tag);

  deepAssign(el, tree.attributes);

  tree.children.forEach(
    (child, i) => el.appendChild(
      !child.tag ? createTextElement(child.value) : createElement(child)
    )
  );

  el.setAttribute('data-id', tree.id);

  return el;
}

function createTextElement(value) {
  return document.createTextNode(value);
}

function patch(patches, rootNode) {
  patches.forEach(
    patch => {
      const el = findElementIn(rootNode, patch.target)[0];

      switch (patch.type) {
        case NODE:
          el.parentElement.replaceChild(
            createElement(patch.value),
            el
          );
          break;
        case ATTR:
          deepAssign(el, patch.value);
          break;
        case TEXT:
          el.replaceChild(
            createTextElement(patch.value),
            el.firstChild
          );
          break;
      }
    }
  );

  return rootNode;
}

function findElementIn(rootNode, id) {
  const found = [];

  if (rootNode.getAttribute('data-id') === '0') return [rootNode];

  rootNode.childNodes.forEach(
    child => child.getAttribute('data-id') === id ? found.push(child) : null
  );

  return found;
}

function update(oldTree, newTree) {
  const patches = diff(oldTree, newTree);

  store.setRoot(
    patch(patches, store.root)
  );

  return newTree;
}

function render(tree) {
  store.setRoot(createElement(tree));
  document.body.appendChild(store.root);
}
