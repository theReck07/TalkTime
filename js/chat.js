/* ============================================
   TalkTime — chat.js
   Full chat page interactivity
   ============================================ */

/* ─── Emoji data ─────────────────────────────── */
const ALL_EMOJIS = [
  '😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊',
  '😋','😎','😍','🥰','😘','😗','😙','😚','🙂','🤗',
  '🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥',
  '😮','🤐','😯','😪','😫','😴','😌','😛','😜','😝',
  '🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️','🙁',
  '😖','😞','😟','😤','😢','😭','😦','😧','😨','😩',
  '🤯','😬','😰','😱','🥵','🥶','😳','🤪','😵','😡',
  '😠','🤬','😷','🤒','🤕','🤢','🤮','🤧','😇','🥳',
  '🥺','🤠','🤡','👹','👺','💀','☠️','👻','👽','🤖',
  '💩','😺','😸','😹','😻','😼','😽','🙀','😿','😾',
  '👋','🤚','🖐','✋','🖖','👌','🤌','🤏','✌️','🤞',
  '🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','👍',
  '👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝',
  '🙏','✍️','💅','🤳','💪','🦵','🦶','👂','🦻','👃',
  '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔',
  '❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️',
  '✨','🌟','⭐','🔥','💥','🎉','🎊','🎈','🎁','🏆',
  '🚀','💡','🔑','🔒','🛡️','⚡','🌈','🌊','🍕','🎮',
];

/* ─── Conversation data ──────────────────────── */
const CONVERSATIONS = {
  pankaj: {
    name: 'Pankaj',
    avatarClass: 'av-blue',
    initials: 'PK',
    status: 'Online',
    messages: [
      { type: 'received', text: 'Hi! Welcome to TalkTime 👋', time: '10:24 AM' },
      { type: 'received', text: 'Secure chat looks really cool 😎', time: '10:24 AM' },
      { type: 'sent',     text: 'Hello! Thanks for having me 🙌', time: '10:25 AM' },
      { type: 'received', text: 'This is end-to-end encrypted 🔒\nAll your messages are safe here.', time: '10:26 AM' },
      { type: 'sent',     text: 'That\'s exactly what I needed! 🔐', time: '10:27 AM' },
    ],
  },
  piyush: {
    name: 'Piyush',
    avatarClass: 'av-green',
    initials: 'PI',
    status: 'Last seen 1h ago',
    messages: [
      { type: 'received', text: 'Let\'s talk security 🔐', time: '9:00 AM' },
      { type: 'sent',     text: 'Sure! What do you want to discuss?', time: '9:02 AM' },
    ],
  },
  sarah: {
    name: 'Sarah',
    avatarClass: 'av-pink',
    initials: 'SA',
    status: 'Online',
    messages: [
      { type: 'sent',     text: 'Hey Sarah, are you free later?', time: '8:00 AM' },
      { type: 'received', text: 'Sounds good to me!', time: '8:15 AM' },
    ],
  },
  team: {
    name: 'Dev Team',
    avatarClass: 'av-orange',
    initials: 'TM',
    status: 'Group · 5 members',
    messages: [
      { type: 'received', text: 'Deployment is live 🚀', time: 'Yesterday' },
      { type: 'sent',     text: 'Great work everyone! 🎉', time: 'Yesterday' },
    ],
  },
  riya: {
    name: 'Riya',
    avatarClass: 'av-purple',
    initials: 'RI',
    status: 'Last seen Mon',
    messages: [
      { type: 'received', text: 'See you tomorrow!', time: 'Mon' },
      { type: 'sent',     text: 'Looking forward to it! 😊', time: 'Mon' },
    ],
  },
};

/* ─── State ──────────────────────────────────── */
let activeChat = 'pankaj';
let typingTimer = null;

/* ─── Element refs ───────────────────────────── */
const messagesEl       = document.getElementById('messages');
const messageInput     = document.getElementById('messageInput');
const sendBtn          = document.getElementById('sendBtn');
const emojiBtn         = document.getElementById('emojiBtn');
const emojiBox         = document.getElementById('emojiBox');
const emojiGrid        = document.getElementById('emojiGrid');
const emojiSearch      = document.getElementById('emojiSearch');
const chatHeaderName   = document.getElementById('chatHeaderName');
const chatHeaderStatus = document.getElementById('chatHeaderStatus');
const typingIndicator  = document.getElementById('typingIndicator');
const chatListItems    = document.querySelectorAll('.chat-item');
const searchInput      = document.getElementById('searchInput');
const attachBtn        = document.getElementById('attachBtn');
const fileInput        = document.getElementById('fileInput');
const sidebarToggle    = document.getElementById('sidebarToggle');
const sidebar          = document.getElementById('sidebar');

/* ─── Helpers ────────────────────────────────── */

/** Format current time as HH:MM AM/PM */
function nowTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

/** Scroll messages to bottom */
function scrollToBottom(smooth = true) {
  messagesEl.scrollTo({
    top: messagesEl.scrollHeight,
    behavior: smooth ? 'smooth' : 'instant',
  });
}

/** Build a message group DOM element */
function buildMessageGroup(type, text, time) {
  const conv = CONVERSATIONS[activeChat];
  const group = document.createElement('div');
  group.className = `msg-group ${type}`;

  const stack = document.createElement('div');
  stack.className = 'msg-stack';

  const bubble = document.createElement('div');
  bubble.className = `message ${type}`;
  bubble.innerHTML = text.replace(/\n/g, '<br/>');

  const ts = document.createElement('div');
  ts.className = 'msg-time' + (type === 'sent' ? ' right' : '');
  ts.textContent = type === 'sent' ? `${time} ✓✓` : time;

  stack.appendChild(bubble);
  stack.appendChild(ts);

  if (type === 'received') {
    const av = document.createElement('div');
    av.className = `avatar ${conv.avatarClass} msg-avatar`;
    av.textContent = conv.initials;
    group.appendChild(av);
  }

  group.appendChild(stack);
  return group;
}

/** Append a new message and scroll */
function appendMessage(type, text, time = nowTime()) {
  // Insert before the typing indicator
  const group = buildMessageGroup(type, text, time);
  messagesEl.insertBefore(group, typingIndicator);
  scrollToBottom();
}

/** Show / hide the typing indicator */
function showTyping(show) {
  typingIndicator.style.display = show ? 'flex' : 'none';
  if (show) scrollToBottom();
}

/** Simulate a reply from the contact */
function simulateReply() {
  showTyping(true);
  const delay = 1200 + Math.random() * 1000;
  setTimeout(() => {
    showTyping(false);
    const replies = [
      'Got it! 👍',
      'Interesting 🤔',
      'That makes sense!',
      'Sure, let\'s do it 🚀',
      'Thanks for letting me know 😊',
      'I agree completely!',
      'Nice one 🔥',
      'haha 😂',
    ];
    const text = replies[Math.floor(Math.random() * replies.length)];
    appendMessage('received', text);
  }, delay);
}

/* ─── Load a conversation ────────────────────── */
function loadChat(chatId) {
  activeChat = chatId;
  const conv = CONVERSATIONS[chatId];

  // Update header
  chatHeaderName.textContent = conv.name;
  chatHeaderStatus.innerHTML = `<span class="online-dot"></span> ${conv.status}`;

  // Clear messages
  messagesEl.innerHTML = '';

  // Date divider
  const divider = document.createElement('div');
  divider.className = 'date-divider';
  divider.innerHTML = '<span>Today</span>';
  messagesEl.appendChild(divider);

  // Render messages
  conv.messages.forEach(m => {
    const group = buildMessageGroup(m.type, m.text, m.time);
    messagesEl.appendChild(group);
  });

  // Re-add typing indicator
  const typing = document.createElement('div');
  typing.className = 'msg-group received';
  typing.id = 'typingIndicator';
  typing.style.display = 'none';
  const av = document.createElement('div');
  av.className = `avatar ${conv.avatarClass} msg-avatar`;
  av.textContent = conv.initials;
  const stack = document.createElement('div');
  stack.className = 'msg-stack';
  const bubble = document.createElement('div');
  bubble.className = 'message received typing-bubble';
  bubble.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  stack.appendChild(bubble);
  typing.appendChild(av);
  typing.appendChild(stack);
  messagesEl.appendChild(typing);
  // Update global ref
  Object.defineProperty(window, 'typingIndicator', { get: () => typing, configurable: true });

  scrollToBottom(false);
}

/* ─── Send message ───────────────────────────── */
function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  // Save to conversation store
  CONVERSATIONS[activeChat].messages.push({ type: 'sent', text, time: nowTime() });

  appendMessage('sent', text);
  messageInput.value = '';
  messageInput.style.height = 'auto';

  // Close emoji picker
  emojiBox.classList.remove('show');
  emojiBtn.classList.remove('active');

  simulateReply();
}

/* ─── Auto-resize textarea ───────────────────── */
messageInput.addEventListener('input', () => {
  messageInput.style.height = 'auto';
  messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
});

/* Send on Enter (Shift+Enter = newline) */
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);

/* ─── Emoji picker ───────────────────────────── */

/** Render emojis into grid */
function renderEmojis(filter = '') {
  const list = filter
    ? ALL_EMOJIS.filter(e => e.includes(filter))
    : ALL_EMOJIS;

  emojiGrid.innerHTML = '';
  list.forEach(emoji => {
    const span = document.createElement('span');
    span.textContent = emoji;
    span.addEventListener('click', () => {
      messageInput.value += emoji;
      messageInput.focus();
    });
    emojiGrid.appendChild(span);
  });
}

renderEmojis(); // initial render

emojiBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = emojiBox.classList.toggle('show');
  emojiBtn.classList.toggle('active', open);
  if (open) emojiSearch.focus();
});

emojiSearch.addEventListener('input', () => {
  renderEmojis(emojiSearch.value);
});

// Close emoji picker on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.emoji-wrapper')) {
    emojiBox.classList.remove('show');
    emojiBtn.classList.remove('active');
  }
});

/* ─── File attachment ────────────────────────── */
attachBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
  const files = Array.from(fileInput.files);
  files.forEach(file => {
    appendMessage('sent', `📎 <em>${file.name}</em> (${(file.size / 1024).toFixed(1)} KB)`);
  });
  fileInput.value = '';
  simulateReply();
});

/* ─── Chat list switching ────────────────────── */
chatListItems.forEach(item => {
  item.addEventListener('click', () => {
    chatListItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Remove unread badge
    const badge = item.querySelector('.unread-badge');
    if (badge) badge.remove();

    const chatId = item.dataset.chat;
    if (chatId) loadChat(chatId);

    // Close sidebar on mobile
    sidebar.classList.remove('open');
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) overlay.classList.remove('show');
  });
});

/* ─── Sidebar search ─────────────────────────── */
searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  chatListItems.forEach(item => {
    const name = item.querySelector('.chat-name')?.textContent.toLowerCase() || '';
    const msg  = item.querySelector('.last-msg')?.textContent.toLowerCase() || '';
    item.style.display = (name.includes(q) || msg.includes(q)) ? '' : 'none';
  });
});

/* ─── Mobile sidebar toggle ──────────────────── */

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
overlay.id = 'sidebarOverlay';
document.body.appendChild(overlay);

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});

/* ─── Init: load default chat ────────────────── */
// The HTML already has the default messages rendered,
// so just scroll to bottom on first load.
scrollToBottom(false);