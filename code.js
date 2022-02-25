//General Attributions

//Akinator image used in design of the game screen is property of Elokence
//Image vector link: https://static.wikia.nocookie.net/sackman101101101/images/9/98/Akinator_defi.png/revision/latest?cb=20160126175053
var numList = [];
var filteredPSList = [];
var checker;
// Function : When the start button is clicked, the listBuilder and listReducer functions will commence ...
// in sequence.
// Purpose : The purpose for the event handler is to allow the user to initiate the functions that ...
// meet the overall purpose of the program.
onEvent("startButton","click", function () {
  listBuilder();
  if (checker == true) {
    return;
  }
  listReducer();
});
// Function : The function prompts the user for a minimum and maximum number, and creates a range between ...
// the minimum and maximum numbers set by the user, inclusive of the minimum and maximum numbers.
// Purpose : The purpose for the listBuilder function is to initially define a list in which the user's
// number is located so that the program can reduce the list and guess the number.
function listBuilder() {
  var min = promptNum("Let's say your number was located in a list of numbers. What would be the smallest number in the list? Think wisely!");
    if (min < 0 || min%1 != 0) {
    write ("I could not continue because you have not followed the game instructions.");
    checker = true;
    return;
  }
  var max = promptNum("Let's say your number was located in a list of numbers. What would be the largest number in the list? Think wisely!");
  if (max < 0 || max%1 != 0) {
    write ("I could not continue because you have not followed the game instructions.");
    return;
  }
  for (var i = 0; i < max-1; i++) {
    if (i+1 >= min) {
      appendItem(numList,i+1);
    }
  }
  appendItem(numList,max);
}
// Function : The function prompts the user if their number is even or odd and reduces the list to solely ...
// odd or even numbers based on their input. The function writes the length of the now-reduced list and then ...
// reduces the list if the user's number is a perfect square. The function then writes again the length of the ...
// reduced list and then randomly chooses a number in the list and asks the user if it is their number. If ...
// it is their number, the function writes a statement to the screen. If it is not their number, the function ...
// cycles through the list until the appropriate number is shown to the user and then writes a statement to the ...
// screen noting the amount of tries it took to get to the user;s number.
// Purpose : The purpose for the listReducer function is to reduce the built numList to the smallest list possible ...
// in order to guess the user's number.
function listReducer() {
  var prompt1 = promptNum("Is your number odd or even? 1 for ODD. 2 for EVEN");
  if (prompt1 == 1) {
    numberFilter(1);
  } else if (prompt1 == 2) {
    numberFilter(2);
  }
  write ("Ok, I have " + numList.length + " numbers in mind...");
  setTimeout(function() {
    var prompt2 = promptNum("Is your number a perfect square? 1 for YES. 2 for NO");
    if (prompt2 == 1) {
      for (var k = 0; k < numList.length; k++) {
        var sqrNum = "" + Math.sqrt(numList[k]);
        if (sqrNum.length == 1) {
          appendItem(filteredPSList, numList[k]);
        }
      }
    } else if (prompt2 == 2) {
      for (var l=0; l < numList.length; l++) {
        appendItem(filteredPSList, numList[l]);
      }
    }
    write (("Ok, I have " + filteredPSList.length) + " numbers in mind...");
  }, 500);
  setTimeout(function() {
    var rgNum = filteredPSList[randomNumber(0,filteredPSList.length)];
    var prompt3 = promptNum("Hmm.. Is your number " + rgNum + "? 1 for YES. 2 for NO");
    if (prompt3 == 1) {
      write("I guessed your number correctly the first time! Your number is " + rgNum + ".");
    } else if (prompt3 == 2) {
      removeItem(filteredPSList, (filteredPSList.indexOf(rgNum)));
      var counter = 2;
      var subt = 0;
// The implementation and understanding of the indexOf function is thanks to the w3schools website and documentation;
// Link: https://www.w3schools.com/jsref/jsref_indexof_array.asp.
      for (var i = 0; i < filteredPSList.length; i++) {
        rgNum = filteredPSList[randomNumber(0,(filteredPSList.length)-subt)];
        prompt3 = promptNum("Hmm.. Is your number " + rgNum + "? 1 for YES. 2 for NO");
        if (prompt3 == 1) {
          write("I guessed your number correctly on try number " + counter + "! Your number is " + rgNum + ".");
          break;
        } else {
          counter++;
          subt++;
          removeItem(filteredPSList, (filteredPSList.indexOf(rgNum)));
        }
      }
    }
  }, 500);
  
}
// Function: The numberFilter function removes odd or even numbers from the built numList based on an number ... 
// identifier defined in the call of the function. If the identifier is 1, the function removes all even numbers ... 
// from the built numList. If the identifier is 2, the function removes all odd numbers from the built numList.
// Purpose: The purpose of the numberFilter function is to further reduce numList in order to assist the program in ...
// guessing the user's desired number. With the help of the numberFilter function, the program can reduce the list
// to a single number in a simple fashion.
function numberFilter(identifier) {
  if (identifier == 1) {
    for (var i = 0; i < numList.length; i++) {
      if (numList[i] % 2 == 0) {
        removeItem(numList,i);
      }
    }
  }
  if (identifier == 2) {
    for (var j =0; j < numList.length; j++) {
        if (numList[j] % 2 > 0) {
          removeItem(numList,j);
      }
    }
  }
}
