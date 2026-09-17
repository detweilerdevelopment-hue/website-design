const modal = document.querySelector('#modal');
const content = document.querySelector('#modal-content');
const menu = document.querySelector('.menu-toggle');
document.querySelector('#year').textContent = new Date().getFullYear();
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); document.querySelector('nav').classList.toggle('open', open); });
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => { document.querySelector('nav').classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open menu'); }));
const forms = {
 membership: ['Find your place in the alliance.', 'Introduce yourself and tell us a little about your work.'],
 contact: ['Good connections start here.', 'Have a question? We’d love to learn what’s on your mind.'],
 events: ['Be part of what’s next.', 'Register your interest in networking and educational events.'],
 community: ['Make a difference, together.', 'Tell us about a local cause or how you’d like to get involved.']
};
function openForm(type) {
 const [title, description] = forms[type];
 content.innerHTML = `<p class="eyebrow">LET’S CONNECT</p><h2 id="dialog-title">${title}</h2><p>${description}</p><form><label>Your name<input name="name" autocomplete="name" required maxlength="100"></label><label>Email address<input type="email" name="email" autocomplete="email" required maxlength="200"></label><label>Company or organization<input name="company" autocomplete="organization" maxlength="150"></label><label>${type === 'membership' ? 'Your role in the industry' : 'Your message'}<textarea name="message" maxlength="2000" required></textarea></label><p class="form-note">This is a website preview. Create a downloadable inquiry; no information is sent or stored on a server.</p><button class="button" type="submit">Create my inquiry <span>↗</span></button></form>`;
 content.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  const fields = Object.fromEntries(new FormData(event.target));
  const file = new Blob([`Regional Mortgage Alliance — ${type} inquiry\n\nName: ${fields.name}\nEmail: ${fields.email}\nOrganization: ${fields.company}\n\n${fields.message}\n`], {type:'text/plain'});
  const url = URL.createObjectURL(file);
  content.innerHTML = '<p class="eyebrow">YOUR NEXT STEP</p><h2 id="dialog-title">Your inquiry is ready.</h2><p class="success">Your details have been prepared for download. Nothing has been submitted.</p><p>The organization’s contact information will be added when this website launches.</p><a class="download-link" download="alliance-inquiry.txt">Download your inquiry ↗</a>';
  content.querySelector('a').href = url;
  modal.addEventListener('close', () => URL.revokeObjectURL(url), {once:true});
 });
 modal.setAttribute('aria-labelledby','dialog-title');
 if (!modal.open) modal.showModal();
}
const details = {
 network: ['A community of connections.', 'Connect with fellow mortgage professionals, industry partners, and people who share your commitment to the communities we serve. Gatherings create space to exchange ideas, ask questions, and build relationships.', 'Event dates and locations will be published here once confirmed.'],
 education: ['Keep your perspective growing.', 'Explore professional development through shared expertise and meaningful industry conversations. Educational sessions bring people together to learn from one another.', 'The session schedule and registration details will be added once confirmed.'],
 privacy: ['Your privacy matters.', 'This preview does not send form entries to a server or save them in browser storage. Inquiry downloads are generated on your device. Google Fonts is used to load the website’s typefaces.', 'A full organization-specific privacy policy should be added before collecting information on the live website.']
};
document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => openForm(button.dataset.modal)));
document.querySelectorAll('[data-detail]').forEach(button => button.addEventListener('click', () => { const type = button.dataset.detail; const [title, body, note] = details[type]; content.innerHTML = `<p class="eyebrow">REGIONAL MORTGAGE ALLIANCE</p><h2 id="dialog-title">${title}</h2><p>${body}</p><p>${note}</p>${type !== 'privacy' ? '<button class="button" id="interest">Register your interest <span>↗</span></button>' : ''}`; content.querySelector('#interest')?.addEventListener('click', () => openForm('events')); modal.setAttribute('aria-labelledby','dialog-title'); modal.showModal(); }));
document.querySelector('.close-modal').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if(event.target === modal) { const rect = modal.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) modal.close(); }});
