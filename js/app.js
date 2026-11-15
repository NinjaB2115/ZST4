'use strict';
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const icon = '<svg class="icon" aria-hidden="true"><use href="#external"/></svg>';
  const contentDialog = $('#content-dialog');
  const dialogContent = $('#dialog-content');
  let opener;
  const openDialog = dialog => {
    opener = document.activeElement;
    if (!dialog.open) dialog.showModal();
  };
  const closeDialog = dialog => dialog.close();
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => { if (opener?.isConnected) opener.focus(); });
    dialog.addEventListener('click', event => {
      const box = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) closeDialog(dialog);
    });
  });
  const showContent = (title, html) => {
    dialogContent.innerHTML = '<h2 id="dialog-title">' + title + '</h2>' + html;
    openDialog(contentDialog);
  };
  const sourceLink = (url, text = 'Sprawdź na oficjalnej stronie') => '<a class="dialog-source" href="' + url + '" target="_blank" rel="noopener noreferrer">' + text + icon + '<span class="sr-only"> (otwiera się w nowej karcie)</span></a>';
  const notice = text => '<p class="dialog-notice">' + text + '</p>';
  const infos = {
    journal: ['E-dziennik', '<p>W docelowej witrynie ten skrót poprowadzi do szkolnego dziennika elektronicznego z ocenami, frekwencją i wiadomościami.</p>' + notice('Widok demonstracyjny. Mockup nie łączy się z dziennikiem, nie loguje i nie pobiera danych uczniów.')],
    schedule: ['Plan lekcji', '<p>To miejsce na skrót do aktualnego planu zajęć. W docelowym serwisie uczeń wybierze swój oddział i sprawdzi rozkład lekcji.</p>' + notice('Widok demonstracyjny. Nie publikujemy przykładowego planu, który mógłby zostać uznany za obowiązujący.')],
    changes: ['Zastępstwa', '<p>Docelowo znajdziesz tutaj odnośnik do bieżących zmian w planie lekcji.</p>' + notice('Widok demonstracyjny. Brak połączenia ze szkolnym systemem zastępstw.')],
    exams: ['Matura i egzaminy zawodowe', '<p>Informacje o egzaminach należy sprawdzać w aktualnych komunikatach szkoły. Ten widok pokazuje miejsce na uporządkowane materiały, harmonogramy i dokumenty.</p>' + notice('Mockup nie prezentuje niepotwierdzonych dat ani zasad egzaminów.')],
    documents: ['Dokumenty i druki', '<p>Statut, regulaminy, informacje dla rodziców i formularze szkolne — w docelowej witrynie dokumenty będą zebrane w jednym miejscu.</p>' + notice('Widok demonstracyjny. Nie generujemy dokumentów ani nie uruchamiamy pobierania przykładowych formularzy.')],
    library: ['Biblioteka szkolna', '<p>Przestrzeń dla czytelników, pomysłów i nowych zainteresowań. W docelowym serwisie pojawią się tu godziny otwarcia i aktualne wiadomości z biblioteki.</p>' + notice('Treść demonstracyjna. Godziny i zasady korzystania wymagają uzupełnienia przez szkołę.')],
    support: ['Pomoc i wsparcie', '<p>W szkole działa wsparcie pedagoga i psychologa. Jeśli potrzebujesz rozmowy, sekretariat pomoże ustalić kontakt z odpowiednią osobą.</p><p><strong>Sekretariat: +48 55 647 34 34</strong></p>' + notice('Ten widok nie jest formularzem zgłoszeniowym i nie przesyła żadnych informacji.')],
    admission: ['Twoja droga do ZST', '<p>Najpierw poznaj typy szkół, a następnie potwierdź aktualną ofertę, zasady i harmonogram naboru. Sekretariat pomoże Ci znaleźć właściwe informacje.</p><h3>Co warto sprawdzić?</h3><ul><li>Aktualne kierunki i profile.</li><li>Terminy i wymagane dokumenty.</li><li>Ewentualne dodatkowe wymagania dla wybranej klasy.</li></ul><p><strong>Sekretariat: +48 55 647 34 34</strong></p>' + notice('Orientacyjna prezentacja procesu. Mockup nie przyjmuje podań. Nie podajemy niepotwierdzonych terminów rekrutacji.') + sourceLink('https://zstmalbork.pl/wordpress/rekrutacja-2021/')],
    privacy: ['O projekcie demonstracyjnym', '<p>To propozycja wizualna strony ZST w Malborku, przygotowana na podstawie materiałów projektu i publicznej witryny szkoły. Nie jest oficjalnym serwisem placówki.</p><p>Strona nie ma backendu, analityki, kont użytkowników ani formularzy wysyłających dane. Wyszukiwanie i filtrowanie działają lokalnie. Ustawienia dostępności dotyczą bieżącego widoku i nie są zapisywane.</p><p>Zdjęcia pochodzą z publicznego archiwum ZST. Niektóre materiały są archiwalne. Zewnętrzne odnośniki są wyraźnie oznaczone i otwierają osobną kartę.</p>' + notice('Informacje o mockupie nie zastępują formalnej polityki prywatności ani deklaracji dostępności docelowej strony.')]
  };
  const courses = {
    technical: ['Technikum nr 2', 'Połączenie kształcenia ogólnego i zawodowego. Dla osób, które chcą rozwijać zainteresowania techniczne i przygotować się do dalszej nauki oraz pracy.', 'nasze-kierunki-technikum/'],
    vocational: ['Branżowa szkoła I stopnia', 'Droga oparta na praktycznej nauce zawodu. Dla osób, które chcą zdobywać konkretne umiejętności i doświadczenie w wybranej dziedzinie.', 'nasze-kierunki-branzowa-szkola-i-st/'],
    secondary: ['IV Liceum Ogólnokształcące', 'Kształcenie ogólne i rozwijanie zainteresowań. Dla osób, które chcą przygotować się do matury i zaplanować dalszą edukację.', 'nasze-kierunki-liceum-ogolnoksztalcace/']
  };
  const news = {
    remembrance: ['Pamięć, która łączy pokolenia', '4 listopada 2026', 'remembrance', 'Uczniowie klas wojskowych ZST w Malborku uczestniczyli w międzynarodowych obchodach Remembrance Day. Uroczystość poświęcono pamięci poległych żołnierzy.', '2026/11/04/uczniowie-klas-wojskowych-zst-w-malborku-oddali-hold-poleglym-zolnierzom-podczas-miedzynarodowych-obchodow-remembrance-day/'],
    ceremony: ['Razem podczas wojewódzkich obchodów', '26 października 2026', 'ceremony', 'Oficjalna strona szkoły odnotowuje udział ZST w Wojewódzkich Obchodach Święta Terenowych Organów Wykonawczych MON. Zdjęcie przedstawia uczestników uroczystości.', '2026/10/26/zst-w-malborku-na-wojewodzkich-obchodach-swieta-terenowych-organow-wykonawczych-mon/'],
    anniversary: ['80 lat wspólnej historii', '14 października 2026', 'anniversary', 'Zespół Szkół Technicznych w Malborku świętował jubileusz 80-lecia. W szkolnym archiwum można zobaczyć fotografie z obchodów i spotkania społeczności szkoły.', '2026/10/14/obchody-jubileuszu-80-lecia-zst/']
  };
  const gallery = {
    hero: ['Praktyczna strona nauki', 'Pracownia ZST w Malborku · fotografia archiwalna, 2021.'],
    lab: ['Nauka przez działanie', 'Zajęcia w pracowni ZST · fotografia archiwalna, 2021.'],
    anniversary: ['Wspólne chwile', 'Uczestnicy obchodów jubileuszu 80-lecia ZST · 14 października 2026.'],
    ceremony: ['Szkolne tradycje', 'Kadeci podczas wojewódzkiej uroczystości · październik 2026.']
  };
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-close')) closeDialog(button.closest('dialog'));
    if (button.dataset.open) {
      const dialog = $('#' + button.dataset.open + '-dialog');
      if (dialog) { openDialog(dialog); if (button.dataset.open === 'search') { renderSearch(); $('#site-search').focus(); } }
    }
    if (button.dataset.info && infos[button.dataset.info]) showContent(...infos[button.dataset.info]);
    if (button.dataset.course && courses[button.dataset.course]) {
      const [title, text, path] = courses[button.dataset.course];
      showContent(title, '<p>' + text + '</p><h3>Dowiedz się więcej</h3><p>Zapytaj w szkole o aktualne kierunki, profile i zasady naboru.</p>' + notice('Opis orientacyjny. Szczegółowa oferta wymaga potwierdzenia na aktualny rok szkolny.') + sourceLink('https://zstmalbork.pl/wordpress/rekrutacja-2021/' + path));
    }
    if (button.dataset.news && news[button.dataset.news]) {
      const [title, date, img, text, path] = news[button.dataset.news];
      showContent(title, '<p>' + date + '</p><img class="dialog-image" src="assets/' + img + '.webp" alt="' + title + '"><p>' + text + '</p>' + sourceLink('https://zstmalbork.pl/wordpress/' + path, 'Przeczytaj wiadomość źródłową') + notice('Skrót redakcyjny przygotowany na potrzeby mockupu.'));
    }
    if (button.dataset.gallery && gallery[button.dataset.gallery]) {
      const [title, caption] = gallery[button.dataset.gallery];
      showContent(title, '<img class="dialog-image full-image" src="assets/' + button.dataset.gallery + '.webp" alt="' + title + '"><p>' + caption + '</p>');
    }
  });
  // Mobile navigation uses the same links as desktop navigation.
  const menuToggle = $('.menu-toggle');
  const nav = $('#main-nav');
  const closeMenu = () => { nav.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); };
  menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); menuToggle.setAttribute('aria-expanded', String(open)); });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menuToggle.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width:1101px)').addEventListener('change', closeMenu);
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    $$('[data-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    let count = 0;
    $$('.news-card').forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; if (!card.hidden) count++; });
    $('#news-status').textContent = 'Liczba wyświetlonych aktualności: ' + count + '.';
  }));
  const sections = [
    ['Kierunki kształcenia', '#kierunki', 'technikum branżowa liceum zawód'],
    ['Aktualności', '#aktualnosci', 'wydarzenia wiadomości jubileusz'],
    ['O szkole', '#szkola', 'pracownie internat basen historia'],
    ['Dla ucznia i rodzica', '#dla-ucznia', 'plan zastępstwa dokumenty biblioteka pomoc egzaminy dziennik'],
    ['Rekrutacja', '#rekrutacja', 'nabór kandydat wnioski podania'],
    ['Życie szkoły', '#galeria', 'zdjęcia galeria fotografie'],
    ['Kontakt', '#kontakt', 'telefon adres sekretariat email malbork']
  ];
  const normalize = value => value.toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
  function renderSearch() {
    const query = normalize($('#site-search').value.trim());
    const found = sections.filter(item => normalize(item.join(' ')).includes(query));
    const results = $('#search-results');
    results.replaceChildren();
    found.forEach(([title, href]) => {
      const li = document.createElement('li'); const link = document.createElement('a');
      link.href = href; link.textContent = title + ' ↗'; link.addEventListener('click', () => { const d = $('#search-dialog'); opener = null; d.close(); const target = $(href); target.setAttribute('tabindex','-1'); target.focus({preventScroll:true}); target.scrollIntoView(); }); li.append(link); results.append(li);
    });
    $('#search-status').textContent = found.length ? 'Znalezione sekcje: ' + found.length + '. Wyszukiwanie działa tylko w tym mockupie.' : 'Brak wyników. Spróbuj hasła „kontakt”, „kierunki” lub „plan”.';
  }
  $('#site-search').addEventListener('input', renderSearch);
  let fontScale = 1;
  const applyFont = () => { document.documentElement.style.setProperty('--text-scale', fontScale.toFixed(1)); $('#font-output').value = Math.round(fontScale * 100) + '%'; };
  $$('[data-font]').forEach(button => button.addEventListener('click', () => { fontScale = Math.min(1.3, Math.max(1, Math.round((fontScale + (button.dataset.font === 'up' ? .1 : -.1)) * 10) / 10)); applyFont(); }));
  const applyTheme = theme => { document.documentElement.dataset.theme = theme; $$('[data-theme-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme))); };
  $$('[data-theme-choice]').forEach(button => button.addEventListener('click', () => applyTheme(button.dataset.themeChoice)));
  $('#settings-reset').addEventListener('click', () => { fontScale = 1; applyFont(); applyTheme('light'); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $$('.main-nav>a').forEach(link => { if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
        }
      });
    }, {rootMargin:'-20% 0px -55% 0px'});
    $$('main>section[id]').forEach(section => observer.observe(section));
  }
})();
