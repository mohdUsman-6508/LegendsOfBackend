//almost everything is module in node.js

export const sayHello = () => {
  console.log("Marhaba! how are you");
};

function greet() {
  console.log("Assalamualaikum");
}

const goodbye = () => {
  console.log("Good Bye!");
  return Math.random() * 100;
};

// module.exports = greet;
// module.exports = goodbye;

//only one default export per module

export default greet;
export { goodbye };
