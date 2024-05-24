class TreeNode {
  /** @type {string} */
  text
  /** @type {TreeNode | undefined} */
  parentNode
  /** @type {TreeNode[]} */
  parentNodes
  /** @type {TreeNode[]} */
  childNodes = []
  /** @type {any} user data */
  data
  /**
   * 
   * @param {string} text 
   * @param {TreeNode | undefined} parentNode 
   */
  constructor(text, parentNode, data) {
    this.text = text.trim();
    this.parentNode = parentNode;
    this.parentNodes = parentNode ? [...parentNode.parentNodes, parentNode] : [];
    this.parentNode?.childNodes.push(this);
    this.data = data;
  }
  get nestCount() {
    return this.parentNodes.length;
  }
  get isRoot() {
    return !!this.parentNode;
  }
  /**
   * @param {(v:TreeNode)=>void} cb 
   */
  forEach(cb) {
    cb(this);
    this.childNodes.forEach(v => v.forEach(cb));
  }

  toArray(ary) {
    if(this.childNodes.length == 0) {
      return [this];
    } else {
      /** @type {TreeNode[]} */
      var result = [this];
      this.childNodes.forEach(v => { result = [...result, ...v.toArray()]})
      return result;
    }
  }
}

class NestedTextParser {
  static getNestCount(line, divider) {
    const ary = line.split(divider).map(n => n.trim().length);
    for(var i = 0; i < ary.length; i++) {
      if(ary[i] > 0) {
        return i;
      }
    }
    // console.log(ary);
    throw new Error("テキストが見つからない:" + line);
  }
  static parse(text) {
    text = text.trim();
    const lines = text.split("\n");
    const title = lines.shift();
    
    const rootNode = new TreeNode(title, undefined, undefined);
  
    // 区切り文字判定
    const divider = lines[0].slice(0, 1) == " " ? "  " : "\t"
  
    var parents = [rootNode];
    
    return [rootNode, ...lines.map(v => {
      const nestCount = NestedTextParser.getNestCount(v, divider);
      const parent = parents.at(nestCount - 1);
      const mapNode = new TreeNode(v.trim(), parent, undefined);
      if(parents.length == nestCount) {
        parents.push(mapNode);
      } else {
        parents = [...parents.slice(0, nestCount), mapNode]
      }
      return mapNode;
    })]
  }
}