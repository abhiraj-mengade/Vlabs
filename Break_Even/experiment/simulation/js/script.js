
let rent, wages, otherFixed, raw, pack, otherVariable, totalFixed, totalVariable, sp, qty, bepSales, bepUnits, revenue, variablePerUnit;
var xValues = [];
var yValues = [];
var chart;

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
  if (totalFixed>0) {
    document.getElementById("fixedMsg").innerHTML = "<p class='msg'>Total fixed cost = " + totalFixed + "</p>";
    if(totalVariable>0)
    {
      document.getElementById("next-3").style.visibility = "visible";
    }
  }
  else if (totalFixed==0) {
    document.getElementById("fixedMsg").innerHTML = "<p class='msg'>Total fixed cost cannot be zero. Please input again.</p>";
  }
  else {
    document.getElementById("fixedMsg").innerHTML = "<p class='msg'>Total fixed cost cannot be negative. Please input again.</p>";
  }
}

function inputVariable() {
  raw = document.getElementById("raw").value;
  pack = document.getElementById("pack").value;
  otherVariable = document.getElementById("otherVariable").value;
  document.getElementById("raw").value = null;
  document.getElementById("pack").value = null;
  document.getElementById("otherVariable").value = null;
  totalVariable = Number(raw) + Number(pack) + Number(otherVariable);
  if (totalVariable>0) {
    document.getElementById("variableMsg").innerHTML = "<p class='msg'>Total variable cost = " + totalVariable + "</p>";
    if(totalFixed>0)
    {
      document.getElementById("next-3").style.visibility = "visible";
    }
  }
  else if (totalVariable==0) {
    document.getElementById("variableMsg").innerHTML = "<p class='msg'>Total variable cost cannot be zero. Please input again.</p>";
  }
  else {
    document.getElementById("variableMsg").innerHTML = "<p class='msg'>Total variable cost cannot be negative. Please input again.</p>";
  }
}

function inputOthers() {
  sp = document.getElementById("sp").value;
  qty = document.getElementById("qty").value;
  document.getElementById("sp").value = null;
  document.getElementById("qty").value = null;
  revenue = sp*Number(qty);
  revenue = revenue.toFixed(3);
  if (revenue>0) {
    netProfit = (revenue - totalVariable - totalFixed).toFixed(3);
    variablePerUnit = totalVariable/Number(qty);
    bepUnits = totalFixed/(Number(sp) - variablePerUnit);
    bepSales = bepUnits*Number(sp);
    bepSales = bepSales.toFixed(3);
    bepUnits = bepUnits.toFixed(3);
    document.getElementById("bepInUnits").innerText = Math.round(bepUnits);
    document.getElementById("bepInSales").innerText = bepSales;
    plot();
    document.getElementById("otherMsg").innerHTML = "<p class='msg'>Total revenue = " + revenue + "</p> <p class='msg'>Net Profit = " + netProfit + "</p>";
    document.getElementById("next-4").style.visibility = "visible";
  }
  else if (revenue==0) {
    document.getElementById("otherMsg").innerHTML = "<p class='msg'>Total revenue cannot be zero. Please input again.</p>";
  }
  else {
    document.getElementById("otherMsg").innerHTML = "<p class='msg'>Total revenue cannot be negative. Please input again.</p>";
  }
  
}

function generateData(value, i1 = 0, i2 = bepUnits*1.5, step = (bepUnits/10).toFixed(3)) {
  xValues=[];
  yValues=[];
  var x, i;
  for (x=i1, i=1; x <= i2; i++) {
    xValues.push(Number(x).toFixed(3));
    yValues.push(eval(value));
    if (i==10)
    {
      x = bepUnits;
    }
    else
    {
      x = step*i;
    }
  }
};

function plot()
{
console.log(bepUnits,bepSales);
if(chart != null){
    chart.destroy();
}
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
      fill:false,
      label: "Total Cost",
      pointRadius: 0,
      borderWidth: 5,
      backgroundColor:"14, 105, 94, 0.2)",
      borderColor:"rgba(14, 105, 94, 1)",
      data: []
    },
    { 
      fill:false,
      label: "Loss Making Region",
      pointRadius: 0,
      borderWidth: 3,
      borderDash: [10,5],
      backgroundColor:"#fcb3d8",
      data: [{x:0,y:bepSales},{x:bepUnits,y:bepSales}]
    },
    { 
      fill:false,
      label: "Profit Making Region",
      pointRadius: 0,
      borderWidth: 3,
      borderDash: [10,5],
      backgroundColor:"#bcd1f7",
      data: [{x:bepUnits,y:0},{x:bepUnits,y:bepSales}]
    },
    {
      data: [ {
          x: bepUnits, 
          y: bepSales,
          r: 6
      } ],
      label: ['Break-Even Point'],
      steppedLine: true,
      backgroundColor:"rgba(245, 66, 72, 1)",
      borderColor:"rgba(245, 66, 72, 0.2)",
      type: 'bubble'
    }
    ]

generateData("totalFixed");
dataset[0].data = yValues;
generateData("x*sp");
dataset[1].data = yValues;
generateData("x * variablePerUnit + totalFixed");
dataset[2].data = yValues;

chart = new Chart(document.getElementById("myChart"), {
  type: "line",
  data: {
    labels: xValues,
    datasets: dataset
  },
  options: { responsive:false,
  scales: {
     x: {
        title: {
          color: 'red',
          display: true,
          text: 'Quantity (in units)'
        }
     },
    y: {
        title: {
          color: 'blue',
          display: true,
          text: 'Money (in Rs)'
        }
    }
  }
  }
});
}

function replot() {
  console.log("working here0");
  console.log("working here1");
  sp = Number(document.getElementById("sp2").value);
  totalFixed = Number(document.getElementById("fixed").value);
  variablePerUnit = Number(document.getElementById("variable").value);
  document.getElementById("sp2").value = null;
  document.getElementById("fixed").value = null;
  document.getElementById("variable").value = null;
  bepUnits = totalFixed/(sp - variablePerUnit);
  bepSales = bepUnits*sp;
  bepSales = bepSales.toFixed(3);
  bepUnits = bepUnits.toFixed(3);
  variablePerUnit = variablePerUnit.toFixed(3);
  document.getElementById("bepInUnits").innerText = bepUnits;
  document.getElementById("bepInSales").innerText = bepSales;
  plot();
}

