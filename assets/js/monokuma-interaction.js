/* Interação do Monokuma no hero: cena acessível, sem ação de reiniciar a fala. */
(function monokumaInteraction() {
    "use strict";

    const dialog = document.getElementById("monokuma-dialog");
    const closeButton = dialog?.querySelector("[data-monokuma-close]");
    const gameScreen = dialog?.querySelector(".monokuma-game-screen");
    const portraitWrap = dialog?.querySelector(".monokuma-portrait-wrap");
    const triggers = document.querySelectorAll("[data-monokuma-trigger]");

    if (!dialog || !closeButton || !gameScreen || !portraitWrap || !triggers.length) return;

    let lastTrigger = null;

    function openDialog(event) {
        lastTrigger = event.currentTarget;
        if (!dialog.open) dialog.showModal();
        closeButton.focus();
    }

    function closeDialog() {
        if (dialog.open) dialog.close();
    }

    triggers.forEach(trigger => trigger.addEventListener("click", openDialog));
    closeButton.addEventListener("click", closeDialog);

    dialog.addEventListener("click", event => {
        if (event.target === dialog || event.target === gameScreen || event.target === portraitWrap) closeDialog();
    });

    // O elemento <dialog> já fecha com Escape; o evento close devolve o foco ao gatilho.
    dialog.addEventListener("close", () => {
        if (lastTrigger?.isConnected) lastTrigger.focus();
    });
})();
