export class Utility {

  public static names = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'q', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ]


  public static numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9
  ]


  public static generateNewIdNumber() {
    var newId = '';
    for (let i = 0; i < 7; i++) {
      var index = randomIntFromInterval(0, this.numbers.length - 1);
      newId += this.numbers[index];
    }
    return parseInt(newId);
  }

  public static generateNewId() {
    var newId = '';
    for (let i = 0; i < 4; i++) {
      var index = randomIntFromInterval(0, this.names.length - 1);
      newId += this.names[index];
    }
    return newId;
  }


}

export class Globals {
  public static readonly uniqId = 'uniqId';

}

function randomIntFromInterval(min, max) // min and max included
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function cloneAll(obj) {
  /*  let newObj = JSON.parse(JSON.stringify(obj));
    console.log(obj, newObj);*/
  var clone = Object.create(Object.getPrototypeOf(obj));

  var props = Object.getOwnPropertyNames(obj);
  props.forEach(function (key) {
    var desc = Object.getOwnPropertyDescriptor(obj, key);
    Object.defineProperty(clone, key, desc);
  });

  return clone;
}
