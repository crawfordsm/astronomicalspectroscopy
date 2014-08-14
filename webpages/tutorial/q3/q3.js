
var app = angular.module('question3', ['firebase']);



app.directive('questionTabs', function() {
   return {
    restrict: 'E',
    templateUrl: 'question-tabs.html',
    controller: function() {
      this.tab=0;

      this.questions = questions;

      this.setTab = function(value) {
         this.tab = value;
      };
      this.isSet = function(value) { 
         return this.tab === value;
      };

    },
    controllerAs: 'tab'
    
   };
});

var questions = ['q1.html', 'q2.html', 'q3.html', 'q4.html'];

app.controller("AppCtrl",  function($firebase, $location) {
    // now we can use $firebase to synchronize data between clients and the server!
    var ref = new Firebase("https://astronomicalspectroscopy.firebaseio.com/");
    var sync = $firebase(ref);
    this.list = sync.$asArray();
    this.finish = 0;
    this.input='import math\n\ndef blackbody_intensity(temperature, wavelength):\n    return intensity'

    this.save = function () {
      this.project.qid=3;
      d=new Date();
      this.project.date = d;
      console.log('Current Date:' +d);
      console.log(this.project);
      console.log(this.input);
      if (this.project.answer4) {
         this.list.$add(this.project);
         this.finish=1;
      }
      else {
         alert('You have not answered all the questions yet!');
      }
      
   };
});


app.controller("pythonCtrl", function() {
    this.show = 0;
    this.called = 0;
    this.checkanswer='\n\nfrom random import random\nT=int(6000)\nw=5500\nprint [T, w, blackbody_intensity(T, w)]'
    this.hint = 0

    this.runpython = function(data) {
        data = data + this.checkanswer
        console.log(data);
        Sk.pre = "a2output"
        Sk.configure({"output":outf, "read":builtinRead});
        try {
           eval(Sk.importMainWithBody("<stdin>", false, data));
           this.show=1;
           this.called = this.called + 1;
           if (this.called >= 3) {
               this.hint=1;
           };
        }
        catch(e) { 
           alert(e.toString())
        }
    };
});

function outf(text) {
  if (text.trim()) {
    var mypre = document.getElementById('a2output');
    text = text.replace('[', '')
    text = text.replace(']', '')
    text = text.split(',')
    text =  'For an object with Temperature of ' +  text[0] + ' K, the intensity at a wavlength of ' + text[1].trim() + '&#197 will be ' + plank(text[0], text[1]).toExponential(2) + ' ergs/cm<sup>2</sup>/sr/s/&#197.\n\nYour function returned: '  + text[2];
    mypre.innerHTML = text
    console.log('outf: ' + text);
  };
};

function plank(t, w) {
    //return the planck function in ergs/cm2/sr/s/A
    var h = 6.62e-27; //erg*s
    var c = 2.998e10; //c in cm/s
    var k = 1.38e-16; // erg/K
    var intensity = 2;
    w = w * 1e-8 //convert from angstroms to cm;
    intensity = intensity * h * Math.pow(c, 2) / Math.pow(w,5) / (Math.exp(h*c/w/k/t) - 1);
    return intensity * 1e-8;
};


function builtinRead (x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
};
