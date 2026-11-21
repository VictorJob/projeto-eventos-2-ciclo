/* Calendário mensal público. Datas SQL date são tratadas como componentes locais. */
(function calendarioPage() {
    "use strict";

    const grid = document.getElementById("calendar-grid");
    const statusMessage = document.getElementById("calendar-status-message");
    const retryButton = document.getElementById("calendar-retry");
    const monthTitle = document.getElementById("calendar-month");
    const categorySelect = document.getElementById("calendar-category");
    const dialog = document.getElementById("day-dialog");
    const today = new Date();
    const todayKey = isoLocal(today);
    const state = {
        year: today.getFullYear(),
        month: today.getMonth(),
        eventos: [],
        categoria: "",
        carregando: false,
        erro: "",
        aviso: ""
    };
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    function isoLocal(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }

    // Não usar new Date("YYYY-MM-DD"): a coluna SQL é uma data local, não um instante UTC.
    function dateFromSql(value) {
        const [year, month, day] = String(value).slice(0, 10).split("-").map(Number);
        return new Date(year, month - 1, day);
    }

    function displayDate(date) {
        return new Intl.DateTimeFormat("pt-BR", { dateStyle: "full" }).format(date);
    }

    function categoryColor(value) {
        return /^(#[0-9a-f]{3,8}|rgba?\([\d.,%\s]+\)|[a-z]{3,20})$/i.test(String(value ?? ""))
            ? String(value)
            : "var(--color-primary)";
    }

    function eventsForMonth() {
        return state.eventos.filter(evento => {
            const date = dateFromSql(evento.data);
            return date.getFullYear() === state.year
                && date.getMonth() === state.month
                && (!state.categoria || String(evento.categoria?.id) === state.categoria);
        });
    }

    function updateStatus() {
        retryButton.hidden = true;

        if (state.carregando) {
            statusMessage.innerHTML = '<span class="calendar-skeleton" aria-hidden="true"></span> Carregando agenda…';
            return;
        }

        if (state.erro) {
            statusMessage.textContent = state.erro;
            retryButton.hidden = false;
            return;
        }

        if (state.aviso) {
            statusMessage.textContent = state.aviso;
            retryButton.hidden = false;
            return;
        }

        const total = eventsForMonth().length;
        statusMessage.textContent = total
            ? `${total} evento(s) neste mês.`
            : "Nenhum evento encontrado... baka!";
    }

    function render() {
        const monthDate = new Date(state.year, state.month, 1);
        monthTitle.textContent = new Intl.DateTimeFormat("pt-BR", {
            month: "long",
            year: "numeric"
        }).format(monthDate);

        const byDay = new Map();
        const monthEvents = eventsForMonth();
        monthEvents.forEach(evento => {
            const key = String(evento.data).slice(0, 10);
            byDay.set(key, [...(byDay.get(key) || []), evento]);
        });

        const offset = monthDate.getDay();
        const totalDays = new Date(state.year, state.month + 1, 0).getDate();
        let cells = "";

        weekdays.forEach(day => {
            cells += `<div class="calendar-weekday" role="columnheader">${day}</div>`;
        });

        for (let index = 0; index < offset; index++) {
            cells += '<div class="calendar-day calendar-day--outside" role="gridcell" aria-hidden="true"></div>';
        }

        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(state.year, state.month, day);
            const key = isoLocal(date);
            const events = byDay.get(key) || [];
            const isToday = key === todayKey;
            const dots = events.slice(0, 3).map(evento =>
                `<i class="calendar-dot" style="--category-color:${dom.escapeHtml(categoryColor(evento.categoria?.cor))}" aria-hidden="true"></i>`
            ).join("");
            const more = events.length > 3
                ? `<span class="calendar-more">+${events.length - 3}</span>`
                : "";
            const todayClass = isToday ? " is-today" : "";
            const currentDate = isToday ? ' aria-current="date"' : "";
            const todayLabel = isToday ? ", hoje" : "";
            const fullClass = events.some(evento => Number(evento.vagas_restantes) <= 0)
                ? " has-full"
                : "";

            cells += `<button type="button" class="calendar-day${todayClass}${fullClass}" role="gridcell" aria-label="${dom.escapeHtml(displayDate(date))}${todayLabel}${events.length ? `, ${events.length} evento(s)` : ""}"${currentDate} data-date="${key}"><span class="calendar-day-number">${day}</span><span class="calendar-indicators">${dots}${more}</span></button>`;
        }

        const trailing = (7 - ((offset + totalDays) % 7)) % 7;
        for (let index = 0; index < trailing; index++) {
            cells += '<div class="calendar-day calendar-day--outside" role="gridcell" aria-hidden="true"></div>';
        }

        grid.innerHTML = cells;
        updateStatus();
    }

    function openDay(key, opener) {
        const date = dateFromSql(key);
        const events = state.eventos.filter(evento =>
            String(evento.data).slice(0, 10) === key
            && (!state.categoria || String(evento.categoria?.id) === state.categoria)
        );

        if (window.vnDialogue) {
            vnDialogue.mount(document.getElementById("calendar-vn"), {
                lines: events.length
                    ? [{
                        name: "Chihiro Fujisaki",
                        text: `${events.length} evento(s) nessa data! Agora vamos conferir horários e vagas.`,
                        sprite: "happy.png",
                        expression: "happy"
                    }]
                    : [{
                        name: "Chihiro Fujisaki",
                        text: "Nenhum evento para este dia... uma raridade no calendário acadêmico!",
                        sprite: "worried.png",
                        expression: "worried"
                    }],
                compact: true
            });
        }

        document.getElementById("day-dialog-title").textContent = displayDate(date);
        const list = document.getElementById("day-events");
        list.innerHTML = events.length
            ? events.map(evento => {
                const full = Number(evento.vagas_restantes) <= 0;
                return `<article class="calendar-event${full ? " is-full" : ""}"><h3>${dom.escapeHtml(evento.nome)}</h3><p>${dom.escapeHtml(evento.horario || "Horário a definir")} · ${dom.escapeHtml(evento.local || "Local a definir")}</p><p>${full ? "Esgotado" : `${dom.escapeHtml(evento.vagas_restantes ?? "—")} vagas restantes`}</p><a class="btn-ghost" href="evento.html?id=${encodeURIComponent(evento.id)}">Ver evento</a></article>`;
            }).join("")
            : "<p>Nenhum evento encontrado... baka!</p>";

        dialog.showModal();
        document.getElementById("day-dialog-close").focus();
        dialog.addEventListener("close", () => opener?.focus(), { once: true });
    }

    function setCategories(categories) {
        const previous = state.categoria;
        categorySelect.innerHTML = '<option value="">Todas as categorias</option>'
            + categories.map(category =>
                `<option value="${dom.escapeHtml(category.id)}">${dom.escapeHtml(category.nome)}</option>`
            ).join("");
        state.categoria = categories.some(category => String(category.id) === previous) ? previous : "";
        categorySelect.value = state.categoria;
    }

    async function loadEvents() {
        state.carregando = true;
        state.erro = "";
        state.aviso = "";
        render();

        try {
            const [eventsResult, categoriesResult] = await Promise.allSettled([
                catalogoService.listEventos(),
                catalogoService.listCategorias()
            ]);

            if (categoriesResult.status === "fulfilled") {
                setCategories(categoriesResult.value);
            } else {
                state.aviso = "Eventos carregados, mas não foi possível carregar o filtro de categorias.";
            }

            if (eventsResult.status === "rejected") {
                throw eventsResult.reason;
            }

            state.eventos = eventsResult.value;
        } catch (error) {
            console.error("[calendario] Falha ao carregar eventos:", error);
            state.erro = "Não foi possível carregar os eventos. O mês atual e hoje continuam visíveis.";
        } finally {
            state.carregando = false;
            render();
        }
    }

    document.getElementById("calendar-prev").addEventListener("click", () => {
        state.month--;
        if (state.month < 0) {
            state.month = 11;
            state.year--;
        }
        render();
    });

    document.getElementById("calendar-next").addEventListener("click", () => {
        state.month++;
        if (state.month > 11) {
            state.month = 0;
            state.year++;
        }
        render();
    });

    document.getElementById("calendar-today").addEventListener("click", () => {
        state.year = today.getFullYear();
        state.month = today.getMonth();
        render();
    });

    categorySelect.addEventListener("change", () => {
        state.categoria = categorySelect.value;
        render();
    });

    grid.addEventListener("click", event => {
        const day = event.target.closest("button[data-date]");
        if (day) {
            openDay(day.dataset.date, day);
        }
    });

    retryButton.addEventListener("click", loadEvents);
    document.getElementById("day-dialog-close").addEventListener("click", () => dialog.close());

    // A grade e o destaque de hoje aparecem antes de qualquer chamada de rede.
    loadEvents();
})();
