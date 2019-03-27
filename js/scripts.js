
let trainedNet;

function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 256));
}

function processTrainingData(data) {
    return data.map(d => {
        return {
            input: encode(d.input),
            output: d.output
        }
    })
}

function train(data) {
    let net = new brain.NeuralNetwork();
    net.train(processTrainingData(data));
    trainedNet = net.toFunction();
};
var input;
window.onload = function(){
 input = prompt("Please enter your Essay below", "Right here would be fine");

}
function execute(input) {
    let results = trainedNet(encode(input));
    console.log(results)
    let output;
    let certainty;
    if (results.pass > results.fail) {
        output = 'Passed'
        certainty = Math.floor(results.pass * 100)
    } else { 
        output = 'Failed'
        certainty = Math.floor(results.fail * 100)
    }

    return "I'm " + certainty + "% sure that you " + output;
}

train(trainingData);
console.log(execute('text to check'));
