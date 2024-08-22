if (!customElements.get("translate-xy")) {
    customElements.define("translate-xy", class extends HTMLElement {
        constructor() {
            super();
            this.onMutation = this.onMutation.bind(this);
        }
        connectedCallback() {
            this.load();
            this.observer = new MutationObserver(this.onMutation);
            this.observer.observe(this, {
                childList: true,
                subtree: true
            });
        }
        disconnectedCallback() {
            this.observer.disconnect();
        }
        load() {
            let self = this,
                translatexy       = JSON.parse(self.dataset.translatexy) || {},
                translatexySort   = Object.keys(translatexy).sort().reverse().reduce((r, k) => (r[k] = translatexy[k], r), {});
            Object.entries(translatexySort).forEach(entry => {
                var originalStr  = entry[0],
                    translateStr = entry[1];
                var regex     = new RegExp(originalStr, 'g');
                var elements = self.getElementsByTagName('*');
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                
                    for (var j = 0; j < element.childNodes.length; j++) {
                        var node = element.childNodes[j];
                
                        if (node.nodeType === 3) {
                            var text = node.nodeValue;
                            var replacedText = text.replace(regex,translateStr);
                
                            if (replacedText !== text) {
                                element.replaceChild(document.createTextNode(replacedText), node);
                            }
                        }
                    }
                }
            });
        }
        onMutation(mutations) {
            this.load();
        }
    })
}