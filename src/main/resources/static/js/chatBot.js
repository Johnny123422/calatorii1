
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    document.getElementById('open-chat').addEventListener('click', () => {
    chatBox.style.display = 'block';
});

    document.getElementById('close-chat').addEventListener('click', () => {
    chatBox.style.display = 'none';
});

    // Functie pentru a adăuga mesaje în fereastră
    function addMessage(sender, text) {
    chatMessages.innerHTML += `<div><b>${sender}:</b> ${text}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

    // Trimiterea mesajului la Enter
    chatInput.addEventListener('keypress', async function(e){
    if(e.key === 'Enter' && chatInput.value.trim() !== '') {
    const message = chatInput.value;
    addMessage('Tu', message);
    chatInput.value = '';

    // Afișăm un mesaj temporar "scrie..."
    const tempId = 'temp-' + Date.now();
    chatMessages.innerHTML += `<div id="${tempId}"><b>Expert:</b> ...</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Trimitere la OpenAI API
    try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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' // Înlocuiește cu cheia ta
},
    body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
{role: "system", content: "Ești un expert prietenos de călătorii care răspunde clar și concis."},
{role: "user", content: message}
    ]
})
});

    const data = await response.json();
    const reply = data.choices[0].message.content;
    document.getElementById(tempId).innerHTML = `<b>Expert:</b> ${reply}`;

} catch (err) {
    document.getElementById(tempId).innerHTML = `<b>Expert:</b> Îmi pare rău, a apărut o eroare.`;
    console.error(err);
}
}
});

