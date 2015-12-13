/*
 * 传统class
 *
 * */

//function Circle(radius) {
//  this.radius = radius;
//}
//
//Object.defineProperty(Circle, 'circlesMade', {
//  get: function () {
//    console.log('call get');
//    return !this._count ? 0 : this._count;
//  },
//  set: function (val) {
//    console.log('call set');
//    this._count = val;
//  }
//});
//
//Object.defineProperty(Circle.prototype, 'radius', {
//  get: function () {
//    console.log('call prototype get');
//    return !this.radius;
//  },
//  set: function (val) {
//    console.log('call prototype set');
//    if (!Number.isInteger(val))
//      throw new Error('请输入整数');
//    this._count = val;
//  }
//});
//
//
//
//
//var circle1 = new Circle({a:'a'});
////console.log(circle1.circlesMade);

/*
 * es6
 *
 * */

class Circle {
  constructor(radius) {
    this.radius = radius;
    Circle.circlesMade++;
  };

  static draw(circle, canvas) {
    // Canvas绘制
    console.log('call draw function');
  };

  static get circlesMade() {
    console.log('call get circlesMade');
    return this._count ? 0 : this._count;
  };

  static set circlesMade(val) {
    console.log('call set circlesMade');
    this._count = val;
  };

  area() {
    console.log('call area', this.radius);
    return Math.pow(this.radius, 2) * Math.PI;
  }

  get radius() {
    console.log('call get radius');
    return this._radius;
  };

  set radius(val) {
    console.log('call set radius');
    if (!Number.isInteger((val)))
      throw new Error('输入的必须为整数');
    this._radius = val;
  };

}

var circle = new Circle(2);

console.log(circle.area());
console.log(circle.radius);

circle.radius = 4;
console.log(circle.radius);

//how about draw?? o(╯□╰)o
