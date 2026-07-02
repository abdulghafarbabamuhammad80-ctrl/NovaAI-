const API_KEY = "AQ.Ab8RN6J0msva473nHhy9K63nnvQE0dhN8qtTXuhqieBX_e0p2w";

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = sender === "user" ? "user-message" : "bot-message";
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    addMessage("Thinking...", "bot");

    try {
        const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: message
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();
console.log(data);

if (!response.ok) {
    addMessage("API Error: " + JSON.stringify(data), "bot");
    return;
}

if (!data.candidates || data.candidates.length === 0) {
    addMessage("No response from Gemini: " + JSON.stringify(data), "bot");
    return;
}

        chatBox.removeChild(chatBox.lastChild);

        addMessage(
            data.candidates[0].content.parts[0].text,
            "bot"
        );

    } catch (error) {
        chatBox.removeChild(chatBox.lastChild);
        addMessage("Error: " + error.message, "bot");
    }
}

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});