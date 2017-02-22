function createElement(tree) {
  const el = document.createElement(tree.tag);

  deepAssign(el, tree.attributes);

  tree.children.forEach(
    (child, i) => el.appendChild(createElement(child))
  );

  el.setAttribute('data-id', tree.id);

  return el;
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
