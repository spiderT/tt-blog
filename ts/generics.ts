// function loggingIdentity<T>(arg: T): T {
//   console.log(arg.length);
// // Property 'length' does not exist on type 'T'.
//   return arg;
// }



function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}