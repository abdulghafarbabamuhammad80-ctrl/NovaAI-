const chat = document.getElementById("chat");

let messages = JSON.parse(localStorage.getItem("novaChats")) || [];

function saveChats(){
localStorage.setItem("novaChats", JSON.stringify(messages));
}

function addMessage(type,text){

const div = document.createElement("div");

div.className = type;

div.textContent = text;

chat.appendChild(div);

chat.scrollTop = chat.scrollHeight;
}

messages.forEach(msg=>{
addMessage(msg.type,msg.text);
});

function getReply(msg){

msg = msg.toLowerCase();

if(msg.includes("hello") || msg.includes("hi"))
return "Hello!";

if(msg.includes("name"))
return "My name is Nova AI.";

if(msg.includes("creator"))
return "You are my creator.";

if(msg.includes("joke"))
return [
"Why did the computer go to school? To improve its memory.",
"I would tell you a joke about JavaScript, but it might not execute.",
"Computers are fast because they never stop for coffee."
][Math.floor(Math.random()*3)];

if(msg.includes("time"))
return new Date().toLocaleTimeString();

if(msg.includes("date"))
return new Date().toDateString();

if(msg === "help")
return "Commands: help, time, date, joke, roll dice, flip coin, calculator";

if(msg === "roll dice")
return "🎲 You rolled " + (Math.floor(Math.random()*6)+1);

if(msg === "flip coin")
return Math.random() < 0.5 ? "Heads" : "Tails";

if(msg.startsWith("calc ")){
try{
return "Answer: " + eval(msg.replace("calc ",""));
}
catch{
return "Invalid calculation";
}
}

const randomReplies = [
"Interesting.",
"Tell me more.",
"I understand.",
"Can you explain further?",
"That's cool.",
"I like learning new things.",
"Let's talk about it.",
"Good question.",
"What do you think?",
"Nova is listening."
];

return randomReplies[
Math.floor(Math.random()*randomReplies.length)
];

}

function sendMessage(){

const input = document.getElementById("userInput");

const text = input.value.trim();

if(text === "") return;

addMessage("user","You: " + text);

messages.push({
type:"user",
text:"You: " + text
});

addMessage("bot","Nova is typing...");

const reply = getReply(text);

setTimeout(() => {

chat.lastChild.remove();

addMessage("bot","Nova: " + reply);

},1000);

saveChats();

input.value = "";
}

function clearChat(){

chat.innerHTML = "";

messages = [];

localStorage.removeItem("novaChats");
}
document.getElementById("userInput")
.addEventListener("keypress", function(event){

if(event.key === "Enter"){
sendMessage();
}

});