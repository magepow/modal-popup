if  (!customElements.get("micro-modal"))  {
    
    customElements.define("micro-modal",  class  extends HTMLElement {
        constructor() {
            super();
            this.modalId = this.uniqid();
            var modalId = this.modalId;
            this.template = `<div class="modal micromodal-slide" id="${modalId}" aria-hidden="true">
                <div class="modal__overlay" tabindex="-1" data-micromodal-close>
                    <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="${modalId}-title">
                        <header class="modal__header">
                            <h2 class="modal__title"  id="${modalId}-title">
                                {{modalTitle}}
                            </h2>
                            <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
                        </header>
                        <main class="modal__content" id="${modalId}-content">
                            {{modalContent}}
                        </main>
                        <footer class="modal__footer">
                            {{modalFooter}}
                        </footer>
                    </div>
                </div>
            </div>
            `;
        }
        connectedCallback() {
            this.load();
        }

        uniqid(length)  {
            length  = length  ||  10;
            var result  = "",
                characters  = "abcdefghijklmnopqrstuvwxyz0123456789",
                charactersLength  = characters.length;
            for (var  i = 0;  i < length; i++)  {
                result  +=  characters.charAt(
                    Math.floor(Math.random()  * charactersLength)
                );
            }
            return  result;
        }

        datasetToObject(dataset)  {
            var object  = Object.assign({}, dataset);
            for (var  property  in  object) {
                var value = object[property];
                switch  (value) {
                    case  null:
                        value = null;
                        break;
                    case  false:
                        value = false;
                        break;
                    case  true:
                        value = true;
                        break;
                    case  !isNaN(value):
                        value = Number(value);
                        break;
                    default:
                        try {
                            value = JSON.parse(value);
                        } catch (e) {
                            //  value = value;
                        }
                        try {
                            value = (0, eval)("(" + value + ")");
                        } catch (e) {
                            value = value;
                        }
                }
                object[property]  = value;
            }
            return  object;
        }

        load()  {
            var self  = this,
                popup = self.template;
            var title = 'Title ....',
                content = 'Content ....',
                footer = 'Footer ....';
            popup = popup.replace('{{modalTitle}}', title);
            popup = popup.replace('{{modalContent}}', content);
            popup = popup.replace('{{modalFooter}}', footer);

            self.innerHTML = popup;
            MicroModal.show(self.modalId, {
                onShow: () => document.body.classList.add('howdy'),
                onClose: () => {
                    document.body.classList.remove('howdy');
                    if(self.dataset.clean) self.remove();
                },
                awaitCloseAnimation: true,
                openClass: 'open'
            });

        }

    });
}
