class TreeNode {
  /** @type {string} */
  text
  /** @type {number} */
  nestCount
  /** @type {TreeNode | undefined} */
  parentNode
  /** @type {TreeNode[]} */
  parentNodes
  /** @type {TreeNode[]} */
  childNodes = []
  /**
   * 
   * @param {string} text 
   * @param {number} nestCount 
   * @param {TreeNode | undefined} parentNode 
   */
  constructor(text, nestCount, parentNode) {
    this.text = text.trim();
    this.nestCount = nestCount;
    this.parentNode = parentNode;
    this.parentNodes = parentNode ? [...parentNode.parentNodes, parentNode] : [];
    this.parentNode?.childNodes.push(this);
  }
  get isRoot() {
    return !!this.parentNode;
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
    
    const rootNode = new TreeNode(title, 0, undefined);
  
    // 区切り文字判定
    const divider = lines[0].slice(0, 1) == " " ? "  " : "\t"
  
    var parents = [rootNode];
    
    return [rootNode, ...lines.map(v => {
      const nestCount = NestedTextParser.getNestCount(v, divider);
      const parent = parents.at(nestCount - 1);
      const mapNode = new TreeNode(v.trim(), nestCount, parent);
      if(parents.length == nestCount) {
        parents.push(mapNode);
      } else {
        parents = [...parents.slice(0, nestCount), mapNode]
      }
      return mapNode;
    })]
  }
}