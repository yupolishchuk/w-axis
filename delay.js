Function.prototype.delay = function(num) {
  setTimeout(this, num)
}

var foo = function () {
  console.log("bingo!");
};


foo.delay(300); // после 0.3s:"bingo!"
bar.delay(600); // после 0.6s: "Wow!"

function bar() {
  console.log("Wow!");
}


