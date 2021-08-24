
let rent, wages, otherFixed, raw, pack, otherVariable, totalFixed, totalVariable, sp, qty, bepSales, bepUnits, revenue, variablePerUnit;

function NextDiv(){
  for(let i=1;i<5;i++){
    var v = document.getElementById("screen"+(i.toString()));
    if (v.style.display != "none"){
      var c = document.getElementById("screen"+(i+1).toString());
      v.style.display = "none";
      c.style.display = "block";
      break;

    }
  }
}

function inputFixed() {
  rent = document.getElementById("rent").value;
  wages = document.getElementById("wages").value;
  otherFixed = document.getElementById("otherFixed").value;
  document.getElementById("rent").value = null;
  document.getElementById("wages").value = null;
  document.getElementById("otherFixed").value = null;
  totalFixed = Number(rent) + Number(wages) + Number(otherFixed);
  document.getElementById("fixedMsg").innerText = "Total fixed cost = " + totalFixed;
}

function inputVariable() {
  raw = document.getElementById("raw").value;
  pack = document.getElementById("pack").value;
  otherVariable = document.getElementById("otherVariable").value;
  document.getElementById("raw").value = null;
  document.getElementById("pack").value = null;
  document.getElementById("otherVariable").value = null;
  totalVariable = Number(raw) + Number(pack) + Number(otherVariable);
  document.getElementById("variableMsg").innerText = " Total variable cost = " + totalVariable;
}

function inputOthers() {
  sp = document.getElementById("sp").value;
  qty = document.getElementById("qty").value;
  document.getElementById("sp").value = null;
  document.getElementById("qty").value = null;
  variablePerUnit = totalVariable/Number(qty);
  bepUnits = totalFixed/(Number(sp) - variablePerUnit);
  bepSales = bepUnits*Number(sp);
  revenue = sp*Number(qty);
  document.getElementById("bepInUnits").innerText = bepUnits;
  document.getElementById("bepInSales").innerText = bepSales;
  plot();
  document.getElementById("otherMsg").innerText = "Total revenue = " + revenue;
}

function plot()
{
console.log(bepUnits,bepSales);
var xValues = [];
var yValues = [];

dataset = [{
      fill: false,
      label: "Fixed Cost",
      pointRadius: 1,
       backgroundColor:"rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      data: []
    },
    {
      fill: {
         target: '+1',
         above: '#bcd1f7',
         below: '#fcb3d8'
      },
      label: "Total Revenue",
      pointRadius: 1,
       backgroundColor:"rgba(54, 162, 235, 0.2)",
      borderColor:"rgba(54, 162, 235, 1)",

      data: []
    },
    { 
      label: "Total Cost",
      pointRadius: 1,
      backgroundColor:"rgba(75, 192, 192, 0.2)",
      borderColor:"rgba(75, 192, 192, 1)",
      data: []
    },
    {
      data: [ {
          x: Number(bepUnits), 
          y: Number(bepSales),
          r: 5
      } ],
      label: ['Break-Even Point'],
      steppedLine: true,
      backgroundColor:"rgba(3, 229, 253, 0.2)",
      borderColor:"rgba(3, 229, 253, 1)",
      type: 'bubble'
    }
    ]

generateData("totalFixed");
dataset[0].data = yValues;
generateData("x*sp");
dataset[1].data = yValues;
generateData("x * variablePerUnit + totalFixed");
dataset[2].data = yValues;


new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: dataset
  },
  options: {}
});

function generateData(value, i1 = 0, i2 = bepUnits*1.5, step = (bepUnits/10)) {
  xValues=[];
  yValues=[];
  for (let x = i1; x <= i2; x += step) {
    xValues.push(x);
    yValues.push(eval(value));
  }
};
}
