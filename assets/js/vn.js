/* Motor de diálogos sequenciais da visual novel — compatível com a API de fala única. */
(function vn() {
    "use strict";

    const SPRITE_DIR = "assets/images/personagens/chihiro/";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function normalizeLines(options) {
        const source = Array.isArray(options.lines) ? options.lines : [options];
        return source.filter(line => line && typeof line.text === "string").map(line => ({
            name: String(line.name ?? options.name ?? "Chihiro Fujisaki"),
            text: String(line.text),
            sprite: String(line.sprite ?? options.sprite ?? "normal.png"),
            expression: String(line.expression ?? options.expression ?? "normal"),
            className: String(line.className ?? "")
        }));
    }

    function spritePath(value) {
        return value.includes("/") ? value : `${SPRITE_DIR}${value}`;
    }

    function mount(host, options = {}) {
        if (!host) return null;
        const lines = normalizeLines(options);
        const completionSprite = options.completionSprite
            ? spritePath(String(options.completionSprite))
            : "";
        const completionAlt = String(options.completionAlt ?? "Chihiro Fujisaki, corpo inteiro");
        const completionReplay = Boolean(completionSprite && options.completionReplay === true);
        if (!lines.length) {
            host.replaceChildren();
            host.classList.remove("vn-host");
            return null;
        }

        if (host._vnTimer) window.clearInterval(host._vnTimer);
        host.hidden = false;
        host.classList.add("vn-host");
        const scene = document.createElement("section");
        scene.className = `vn-dialogue${options.compact ? " vn-dialogue--compact" : ""}${completionReplay ? " vn-dialogue--replayable" : ""}`;
        scene.setAttribute("aria-label", "Diálogo da visual novel");

        const sprite = document.createElement("img");
        sprite.className = "vn-sprite";
        sprite.alt = "";
        sprite.setAttribute("aria-hidden", "true");
        sprite.addEventListener("error", () => {
            sprite.hidden = true;
            if (replayButton) replayButton.hidden = true;
        });
        sprite.addEventListener("load", () => { sprite.hidden = false; });

        const replayButton = completionReplay ? document.createElement("button") : null;
        if (replayButton) {
            replayButton.className = "vn-replay";
            replayButton.type = "button";
            replayButton.hidden = true;
            replayButton.setAttribute("aria-label", "Reiniciar diálogo com Chihiro Fujisaki");
        }

        const speaking = document.createElement("span");
        speaking.className = "vn-speaking";
        speaking.textContent = "SPEAKING";
        speaking.setAttribute("aria-hidden", "true");

        const name = document.createElement("span");
        name.className = "vn-name";

        const text = document.createElement("span");
        text.className = "vn-text";
        text.setAttribute("aria-live", "polite");
        text.setAttribute("aria-atomic", "true");

        const next = document.createElement("span");
        next.className = "vn-next";
        next.textContent = "▼";
        next.setAttribute("aria-hidden", "true");

        const box = document.createElement("button");
        box.className = "vn-box";
        box.type = "button";
        box.setAttribute("aria-label", "Avançar diálogo");
        box.append(name, text, next);

        const close = document.createElement("button");
        close.className = "vn-close";
        close.type = "button";
        close.textContent = "×";
        close.setAttribute("aria-label", "Encerrar diálogo");

        if (replayButton) scene.append(replayButton);
        scene.append(sprite, speaking, box, close);
        host.replaceChildren(scene);

        let lineIndex = 0;
        let timer = null;
        let complete = false;
        let disposed = false;
        let completionShown = false;

        function stopTimer() {
            if (timer) window.clearInterval(timer);
            if (host._vnTimer) window.clearInterval(host._vnTimer);
            timer = null;
            host._vnTimer = null;
        }

        function showCompletion() {
            if (!completionSprite || completionShown || disposed) return;
            completionShown = true;
            const boxHadFocus = document.activeElement === box;
            stopTimer();
            scene.classList.add("vn-dialogue--complete");
            scene.setAttribute("aria-label", completionReplay
                ? "Diálogo concluído. Ative o sprite de Chihiro para reiniciar."
                : "Apresentação de Chihiro concluída");
            sprite.src = completionSprite;
            sprite.alt = completionAlt;
            sprite.classList.remove("is-entering");
            void sprite.offsetWidth;
            sprite.classList.add("is-entering");
            next.hidden = true;
            if (replayButton) {
                box.disabled = true;
                box.setAttribute("aria-hidden", "true");
                speaking.textContent = "REPLAY";
                replayButton.setAttribute("aria-label", String(options.completionReplayLabel ?? "Reiniciar diálogo com Chihiro Fujisaki"));
                replayButton.hidden = false;
                replayButton.classList.remove("is-entering");
                void replayButton.offsetWidth;
                replayButton.classList.add("is-entering");
                if (boxHadFocus) replayButton.focus({ preventScroll: true });
            } else {
                box.setAttribute("aria-disabled", "true");
                box.setAttribute("aria-label", "Diálogo concluído. Use o botão Encerrar diálogo para fechar.");
            }
            host.dispatchEvent(new CustomEvent("vn:complete", { bubbles: true }));
        }

        function end() {
            if (disposed) return;
            disposed = true;
            stopTimer();
            host.dispatchEvent(new CustomEvent("vn:end", { bubbles: true }));
            host.replaceChildren();
            host.classList.remove("vn-host");
            host.hidden = true;
        }

        function showLine(index) {
            stopTimer();
            if (index >= lines.length) {
                if (completionSprite) {
                    showCompletion();
                    return;
                }
                end();
                return;
            }
            lineIndex = index;
            complete = false;
            completionShown = false;
            const line = lines[index];
            name.textContent = line.name;
            text.textContent = "";
            next.hidden = false;
            box.removeAttribute("aria-disabled");
            box.setAttribute("aria-label", "Avançar diálogo");
            if (replayButton) {
                replayButton.hidden = true;
                replayButton.classList.remove("is-entering");
                box.disabled = false;
                box.removeAttribute("aria-hidden");
                speaking.textContent = "SPEAKING";
            }
            sprite.src = spritePath(line.sprite);
            sprite.alt = `${line.name}, expressão ${line.expression}`;
            scene.dataset.expression = line.expression;
            scene.className = `vn-dialogue${options.compact ? " vn-dialogue--compact" : ""}${completionReplay ? " vn-dialogue--replayable" : ""}${line.className ? ` ${line.className}` : ""}`;
            sprite.classList.remove("is-entering");
            // Força reinício da animação sem dependência de frameworks.
            void sprite.offsetWidth;
            sprite.classList.add("is-entering");

            const chars = Array.from(line.text);
            if (reduceMotion.matches || chars.length === 0) {
                text.textContent = line.text;
                complete = true;
                if (lineIndex === lines.length - 1) showCompletion();
                return;
            }
            let position = 0;
            timer = window.setInterval(() => {
                position += 1;
                text.textContent = chars.slice(0, position).join("");
                if (position >= chars.length) {
                    stopTimer();
                    complete = true;
                    if (lineIndex === lines.length - 1) showCompletion();
                }
            }, Number(options.typingSpeed) > 0 ? Number(options.typingSpeed) : 24);
            host._vnTimer = timer;
        }

        function advance() {
            if (disposed || completionShown) return;
            if (!complete) {
                stopTimer();
                text.textContent = lines[lineIndex].text;
                complete = true;
                if (lineIndex === lines.length - 1) showCompletion();
                return;
            }
            showLine(lineIndex + 1);
        }

        function replay() {
            if (disposed || !completionShown) return;
            showLine(0);
            box.focus({ preventScroll: true });
        }

        box.addEventListener("click", advance);
        // O elemento é um botão nativo: Enter e espaço geram um único evento click acessível.
        if (replayButton) replayButton.addEventListener("click", replay);
        close.addEventListener("click", end);
        showLine(0);
        return Object.freeze({
            close: end,
            next: advance,
            get currentIndex() { return lineIndex; }
        });
    }

    window.vnDialogue = Object.freeze({ mount });
})();
