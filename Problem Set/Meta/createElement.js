const helperFunction = () => {};

export const JSONtoHTML = (json) => {
  let result = "";
  //   if (!(json instanceof Object)) {
  //     return json;
  //   }
  if (json.type) {
    result = result + `<${json.type}`;
  }
  if (json.props) {
    for (let k in json.props) {
      result = result + ` ${k}="${json.props[k]}"`;
    }
  }
  if (json.type) {
    result = result + ">";
  }
  if (json.children) {
    if (Array.isArray(json.children)) {
      for (let child of json.children) {
        const childHtml = JSONtoHTML(child);
        result = result + `${childHtml}`;
      }
    } else {
      result = result + json.children;
    }
  }
  if (json.type) {
    result = result + `</${json.type}>`;
  }
  return result;
};

const json = {
  type: "div",
  props: { id: "hello", class: "foo" },
  children: [
    { type: "h1", children: "HELLO" },
    {
      type: "p",
      children: [{ type: "span", props: { class: "bar" }, children: "World" }],
    },
  ],
};

console.log(JSONtoHTML(json));
