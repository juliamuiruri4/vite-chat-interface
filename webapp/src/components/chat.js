import { LitElement, html } from 'lit';
import { loadMessages, saveMessages, clearMessages } from '../utils/chatStore.js';
import './chat.css'; // Import the CSS file

export class ChatInterface extends LitElement {
  static get properties() {
    return {
      messages: { type: Array },
      inputMessage: { type: String },
      isLoading: { type: Boolean }
    };
  }

  constructor() {
    super();
    // Initialize component state
    this.messages = [];
    this.inputMessage = '';
    this.isLoading = false;
  }

  // Render into light DOM so external CSS applies
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    // Load chat history from localStorage when component is added to the DOM
    this.messages = loadMessages();
  }

  updated(changedProps) {
    // Save chat history to localStorage whenever messages change
    if (changedProps.has('messages')) {
      saveMessages(this.messages);
    }
  }

  render() {
    // Render the chat UI: header, messages, and input area
    return html`
      <div class="chat-container">
        <div class="chat-header">
          <button class="clear-cache-btn" @click=${this._clearCache}> 🧹Clear Chat</button>
        </div>
        <div class="chat-messages">
          ${this.messages.map(message => html`
            <div class="message ${message.role === 'user' ? 'user-message' : 'ai-message'}">
              <div class="message-content">
                <span class="message-sender">${message.role === 'user' ? 'You' : 'AI'}</span>
                <p>${message.content}</p>
              </div>
            </div>
          `)}
          ${this.isLoading ? html`
            <div class="message ai-message">
              <div class="message-content">
                <span class="message-sender">AI</span>
                <p>Thinking...</p>
              </div>
            </div>
          ` : ''}
        </div>
        <div class="chat-input">
          <input 
            type="text" 
            placeholder="Type your message here..." 
            .value=${this.inputMessage}
            @input=${this._handleInput}
            @keyup=${this._handleKeyUp}
          />
          <button @click=${this._sendMessage} ?disabled=${this.isLoading || !this.inputMessage.trim()}>
            Send
          </button>
        </div>
      </div>
    `;
  }

  // Clear chat history from localStorage and UI
  _clearCache() {
    clearMessages();
    this.messages = [];
  }

  // Update inputMessage state as the user types
  _handleInput(e) {
    this.inputMessage = e.target.value;
  }

  // Send message on Enter key if not loading
  _handleKeyUp(e) {
    if (e.key === 'Enter' && this.inputMessage.trim() && !this.isLoading) {
      this._sendMessage();
    }
  }

  // Handle sending a message and receiving a response
  async _sendMessage() {
    if (!this.inputMessage.trim() || this.isLoading) return;
    
    // Add user's message to the chat
    const userMessage = {
      role: 'user',
      content: this.inputMessage
    };
    
    this.messages = [...this.messages, userMessage];
    const userQuery = this.inputMessage;
    this.inputMessage = '';
    this.isLoading = true;
    
    try {
      // Simulate AI response (replace with real API call later)
      const aiResponse = await this._mockAiCall(userQuery);
      
      // Add AI's response to the chat
      this.messages = [
        ...this.messages,
        { role: 'assistant', content: aiResponse }
      ];
    } catch (error) {
      // Handle errors gracefully
      console.error('Error calling model:', error);
      this.messages = [
        ...this.messages,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ];
    } finally {
      this.isLoading = false;
    }
  }

  // Simulate an AI response (placeholder for future integration)
  async _mockAiCall(message) {
    console.log('Would send to Azure model:', message);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `This is a placeholder response. You'll need to integrate with your AI API to get real responses.`;
  }
}

customElements.define('chat-interface', ChatInterface);