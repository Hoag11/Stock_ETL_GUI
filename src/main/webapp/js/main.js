// Giả lập quyền và đăng nhập
const isLoggedIn = true;
const userRole = 'advanced';
const username = 'John Doe';

document.addEventListener("DOMContentLoaded", function () {
    // Phân quyền
    const navActions = document.getElementById('navActions');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');

    if (isLoggedIn) {
        navActions.style.display = 'none';
        userMenu.style.display = 'flex';
        userName.innerText = username;
    }

    // AI Chat chỉ cho advanced
    if (userRole === 'advanced') {
        const toggle = document.getElementById('chatToggle');
        const popup = document.getElementById('chatPopup');
        const close = document.getElementById('closeChat');

        toggle.style.display = 'flex';

        toggle.addEventListener('click', () => {
            popup.style.display = 'block';
        });

        close.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', function () {
        alert('Logged out!');
        // TODO: remove session + redirect
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // ... phần login + quyền giữ nguyên ...

    const toggle = document.getElementById('chatToggle');
    const popup = document.getElementById('chatPopup');
    const close = document.getElementById('closeChat');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChat');
    const chatBody = document.getElementById('chatBody');

    if (userRole === 'advanced') {
        toggle.style.display = 'flex';

        toggle.addEventListener('click', () => popup.style.display = 'block');
        close.addEventListener('click', () => popup.style.display = 'none');

        sendBtn.addEventListener('click', async () => {
            const question = input.value.trim();
            if (!question) return;

            addMessage(question, 'user');
            input.value = '';
            addMessage("Đang xử lý...", 'ai');

            try {
                const res = await fetch('/api/ask', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: question })
                });
                const data = await res.json();

                chatBody.lastChild.remove(); // Xoá "Đang xử lý..."
                addMessage(data.reply || 'Lỗi phản hồi từ AI', 'ai');
            } catch (err) {
                chatBody.lastChild.remove();
                addMessage('Lỗi kết nối đến server!', 'ai');
            }
        });
    }

    function addMessage(text, role) {
        const msg = document.createElement('div');
        msg.className = `message ${role}`;
        msg.innerText = text;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});
