// write your code here!
var input = d3.select("input");

d3.select("#reset").on("click", function() {
  d3.selectAll(".letter").remove();
  d3.select("#count").text("");
  d3.select("#phrase").text("");
});

d3.select("form").on("submit", function() {
  d3.event.preventDefault();
  let text = input.property("value");

  let word = d3
    .select("#letters")
    .selectAll("div")
    .data(createWord(text), function(d) {
      return d.character;
    });

  word
    .classed("new", false)
    .exit()
    .remove();

  console.log(word);

  word
    .enter()
    .append("div")
    .classed("letter new", true)
    .style("margin-right", "5px")
    .style("height", function(d) {
      return d.count * 20 + "px";
    })
    .text(function(d) {
      return d.character;
    });

  d3.select("#phrase").text("Analysis of: " + text);
  d3.select("#count").text("New Characters: " + word.enter().nodes().length);
  input.property("value", "");
});

let createWord = word => {
  var letters = {};
  for (let letter of word) {
    if (letters[letter]) {
      letters[letter] += 1;
    } else {
      letters[letter] = 1;
    }
  }
  return Object.keys(letters)
    .sort()
    .map(val => {
      return { character: val, count: letters[val] };
    });
};
