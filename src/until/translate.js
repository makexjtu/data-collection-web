//根据key获取对应的value
class Translate {
  constructor() { }
  getTranslate(items, key) {
    if(key === "") return "";
    for(var i=0; i<items.length; i++) {
      if(items[i].value === key) return items[i].label;
    }
    return key;
  }
}
const translate = new Translate();
export default translate;
