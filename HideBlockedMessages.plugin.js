/**
 * @name HideBlockedMessages
 * @author KneesDev
 * @description Hides messages from blocked users completely.
 * @version 1.0.0
 */

module.exports = meta => ({
    start() {
        const style = document.createElement("style");
        style.id = "hide-blocked-messages";
        style.textContent = `
        [data-list-id="chat-messages"] > .groupStart_d5deea {
          display: none !important; /* Hide blocked messages */
        }
        `;
        document.head.appendChild(style);

        const chatMessagesContainer = document.querySelector('[data-list-id="chat-messages"]');
        if (chatMessagesContainer) {
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('groupStart_d5deea') && chatMessagesContainer.contains(node)) {
                            if (node.parentElement === chatMessagesContainer) {
                                node.style.display = 'none';
                            }
                        }
                    });
                });
            });

            observer.observe(chatMessagesContainer, {
                childList: true,
                subtree: true
            });
        }
    },

    stop() {
        const styleElement = document.getElementById('hide-blocked-messages');
        if (styleElement) {
            styleElement.remove();
        }
    }
});