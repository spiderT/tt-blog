function func1() {
    console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
    console.log(Array.from(arguments)); // [ 1, 2, 3 ]
    console.log(arguments[0]); 
    // expected output: 1
  
    console.log(arguments[1]);
    // expected output: 2
  
    console.log(arguments[2]);
    // expected output: 3
  }
  
  func1(1, 2, 3);
  