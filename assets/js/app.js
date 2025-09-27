document.addEventListener('DOMContentLoaded', () => {
// --- MOCK DATA ---
let dogData = [
    { id: 1, name: 'Buddy', avatar: '🐶', breed: 'Golden Retriever', age: 4, notes: 'Loves fetch, avoids loud noises.', vet: 'Parkside Vet Clinic', allergies: 'None', likes: 'Squeaky toys', dislikes: 'Skateboards' },
    { id: 2, name: 'Lucy', avatar: '🐩', breed: 'Poodle', age: 7, notes: 'A bit shy at first. Prefers quiet streets.', vet: 'Uptown Animals', allergies: 'Chicken', likes: 'Belly rubs', dislikes: 'Loud trucks' },
    { id: 3, name: 'Max', avatar: '🐕', breed: 'German Shepherd', age: 2, notes: 'Very energetic! Needs a long run.', vet: 'Parkside Vet Clinic', allergies: 'None', likes: 'Frisbees', dislikes: 'Mail carriers' },
];
const walkerData = [
    { id: 1, name: 'Alex Ray', avatar: 'https://placehold.co/100x100/7F00FF/FFFFFF?text=A', verified: true, rating: 4.9, reviews: 124, price: 25, bio: "Hi, I'm Alex! I've been a passionate dog lover my whole life and have 5+ years of professional walking experience. I'm certified in Pet First Aid and can't wait to meet your furry friend!", badges: ["Pet CPR Certified", "5+ Years Exp."], favorite: true },
    { id: 2, name: 'Jordan Lee', avatar: 'https://placehold.co/100x100/8A2BE2/FFFFFF?text=J', verified: true, rating: 4.8, reviews: 98, price: 24, bio: "Jordan is a marathon runner who loves taking high-energy dogs on long adventures. If your pup needs to burn off some steam, I'm your walker.", badges: ["Great with Large Dogs"], favorite: false },
    { id: 3, name: 'Casey Smith', avatar: 'https://placehold.co/100x100/9370DB/FFFFFF?text=C', verified: false, rating: 4.7, reviews: 75, price: 22, bio: "As a veterinary student, I have a deep understanding of animal care and behavior. I'm especially good with shy or anxious dogs.", badges: ["Experience with Puppies"], favorite: true },
];
let walkHistoryData = [
    { id: 99, date: '2025-09-16', time: '16:00', duration: 30, walker: walkerData[1], dogs: [dogData[0]], price: 25.00, status: 'In Progress' },
    { id: 1, date: '2025-09-11', walker: walkerData[1], dogs: [dogData[0]], price: 25.00, status: 'Completed', photos: ['https://placehold.co/300x200/5f3781/FFFFFF?text=Buddy+Playing', 'https://placehold.co/300x200/8A2BE2/FFFFFF?text=Happy+Pup'], activity: { pee: true, poo: true, water: true }, note: "Buddy had a great time at the park. Full of energy today!" },
    { id: 2, date: '2025-09-09', walker: walkerData[0], dogs: [dogData[0], dogData[1]], price: 40.00, status: 'Completed', photos: [], activity: { pee: true, poo: false, water: true }, note: "Lucy was a little shy but warmed up. Buddy was great as always." },
    { id: 3, date: '2025-09-05', walker: walkerData[2], dogs: [dogData[2]], price: 22.00, status: 'Completed', photos: ['https://placehold.co/300x200/9370DB/FFFFFF?text=Max+Running'], activity: { pee: true, poo: true, water: false }, note: "Max loved the long run by the lake!" },
];

let recurringWalkPlans = [
    {
        id: 1,
        label: 'Buddy Morning Crew',
        dogIds: [1],
        walkerId: 1,
        daysOfWeek: [1, 3, 5],
        time: '09:00',
        duration: 30,
        startDate: '2025-09-18',
        address: '123 Bark Ave',
        notes: 'Buddy likes a slow warm up.',
        status: 'active',
        lastConfirmedDate: null
    }
];
const inboxData = [
    { id: 1, walkerId: 1, lastMessage: "Sounds good, see you then!", unread: false },
    { id: 3, walkerId: 3, lastMessage: "Yes, I can be there a few minutes early.", unread: true },
];
const chatData = {
    1: [{sender:'walker', text:'Hi Alex, just confirming our walk with Buddy for tomorrow at 4pm!'}, {sender:'user', text:'Yep, looks good!'}, {sender:'walker', text:"Sounds good, see you then!"}],
    3: [{sender:'walker', text:'Hi, just wanted to check if Max has any issues with other dogs at the park.'}, {sender:'user', text:'He is usually very friendly!'}, {sender:'walker', text:"Yes, I can be there a few minutes early."}],
};
const paymentData = {
    card: { type: 'Visa', last4: '4242', expiry: '12/26'},
    transactions: [{date: '2025-09-11', desc: 'Walk with Jordan L.', amount: 25.00}, {date: '2025-09-09', desc: 'Walk with Alex R.', amount: 40.00}]
};

// --- RECURRING WALK HELPERS ---
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getRecurringPlanById(planId) {
    return recurringWalkPlans.find(plan => plan.id === planId);
}

function normalizeDays(days = []) {
    return Array.from(new Set(days.map(day => parseInt(day, 10)).filter(day => day >= 0 && day <= 6))).sort((a, b) => a - b);
}

function createRecurringPlan(data) {
    const plan = {
        id: Date.now(),
        label: data.label?.trim() || '',
        dogIds: Array.isArray(data.dogIds) ? Array.from(new Set(data.dogIds.map(id => parseInt(id, 10)))) : [],
        walkerId: data.walkerId ? parseInt(data.walkerId, 10) : null,
        daysOfWeek: normalizeDays(data.daysOfWeek),
        time: data.time || '09:00',
        duration: data.duration ? parseInt(data.duration, 10) : 30,
        startDate: data.startDate,
        address: data.address?.trim() || '',
        notes: data.notes?.trim() || '',
        status: 'active',
        lastConfirmedDate: null
    };
    recurringWalkPlans.push(plan);
    return plan;
}

function updateRecurringPlan(planId, updates = {}) {
    const plan = getRecurringPlanById(planId);
    if (!plan) return null;
    if (updates.daysOfWeek) plan.daysOfWeek = normalizeDays(updates.daysOfWeek);
    if (updates.dogIds) plan.dogIds = Array.from(new Set(updates.dogIds.map(id => parseInt(id, 10))));
    if (typeof updates.walkerId !== 'undefined') plan.walkerId = parseInt(updates.walkerId, 10);
    if (typeof updates.time === 'string') plan.time = updates.time;
    if (updates.duration) plan.duration = parseInt(updates.duration, 10);
    if (typeof updates.startDate === 'string') plan.startDate = updates.startDate;
    if (typeof updates.address === 'string') plan.address = updates.address.trim();
    if (typeof updates.notes === 'string') plan.notes = updates.notes.trim();
    if (typeof updates.label === 'string') plan.label = updates.label.trim();
    return plan;
}

function toggleRecurringPlanStatus(planId) {
    const plan = getRecurringPlanById(planId);
    if (!plan) return null;
    plan.status = plan.status === 'active' ? 'paused' : 'active';
    return plan.status;
}

function deleteRecurringPlan(planId) {
    const index = recurringWalkPlans.findIndex(plan => plan.id === planId);
    if (index >= 0) {
        recurringWalkPlans.splice(index, 1);
        return true;
    }
    return false;
}

function generatePlanOccurrences(plan, count = 3, fromDate = new Date()) {
    if (!plan || !Array.isArray(plan.daysOfWeek) || plan.daysOfWeek.length === 0) return [];
    const occurrences = [];
    const start = plan.startDate ? new Date(`${plan.startDate}T00:00:00`) : new Date();
    start.setHours(0, 0, 0, 0);
    const base = new Date(fromDate);
    base.setHours(0, 0, 0, 0);
    const cursor = base < start ? start : base;

    for (let offset = 0; occurrences.length < count && offset < 365; offset++) {
        const day = new Date(cursor);
        day.setDate(cursor.getDate() + offset);
        if (plan.daysOfWeek.includes(day.getDay()) && day >= start) {
            occurrences.push({
                date: day.toISOString().split('T')[0],
                time: plan.time
            });
        }
    }
    return occurrences;
}

function confirmRecurringOccurrence(planId, occurrence) {
    const plan = getRecurringPlanById(planId);
    if (!plan || !occurrence) return null;
    const walker = walkerData.find(w => w.id === plan.walkerId);
    const dogs = plan.dogIds.map(id => dogData.find(dog => dog.id === id)).filter(Boolean);
    if (!walker || dogs.length === 0) return null;

    const durationMultiplier = plan.duration === 60 ? 1.6 : plan.duration / 30;
    const computedPrice = Math.round((walker.price * durationMultiplier) * 100) / 100;
    const newWalk = {
        id: Date.now(),
        date: occurrence.date,
        time: occurrence.time || plan.time,
        duration: plan.duration,
        walker,
        dogs,
        price: computedPrice,
        status: 'Upcoming',
        address: plan.address,
        note: plan.notes,
        source: 'Recurring Plan'
    };
    walkHistoryData.unshift(newWalk);
    plan.lastConfirmedDate = occurrence.date;
    return newWalk;
}

function formatPlanDays(days = []) {
    if (!days.length) return 'No days selected';
    return days.map(day => DAY_LABELS[day] || '').filter(Boolean).join(', ');
}

function formatDateDisplay(dateString) {
    if (!dateString) return '';
    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.valueOf())) return dateString;
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatTimeDisplay(timeString = '09:00') {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(Number.isNaN(hours) ? 9 : hours, Number.isNaN(minutes) ? 0 : minutes, 0, 0);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

// --- APP STATE ---
const appState = { currentPage: 'page-home' };

// --- BOOKING FLOW HTML ---
const fullBookingFlowHTML = `
    <div class="page-header"><button class="back-btn" data-target="page-home"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><h1>Book a Walk</h1></div>
    <div class="progress-bar" id="progressBar">
        <div class="progress-line"></div><div class="progress-line-active" id="progressLineActive"></div>
        <div class="progress-step active" id="step-0"><div class="progress-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m16 14-4 4-2-2"/></svg></div><span class="progress-label">Plan</span></div>
        <div class="progress-step" id="step-1"><div class="progress-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div><span class="progress-label">Walker</span></div>
        <div class="progress-step" id="step-2"><div class="progress-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div><span class="progress-label">Review</span></div>
    </div>
    <div id="booking-screens-container">
        <section class="screen active" id="screen1">
            <div class="space-y-6 stagger-in">
                <h2 class="text-lg font-semibold">Service</h2>
                <div class="grid grid-cols-2 gap-4">
                    <label class="checkable-card"><input type="radio" name="service" value="30" data-price="25" checked><div class="card-content glass-card p-4"><div class="text-2xl font-bold">30 min</div><div class="text-lg opacity-80">$25</div></div></label>
                    <label class="checkable-card"><input type="radio" name="service" value="60" data-price="40"><div class="card-content glass-card p-4"><div class="text-2xl font-bold">60 min</div><div class="text-lg opacity-80">$40</div></div></label>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div><h2 class="text-lg font-semibold mb-3">Date</h2><div class="input-group"><input type="date" id="walk-date" class="input-field"></div></div>
                    <div><h2 class="text-lg font-semibold mb-3">Time</h2><div class="input-group"><input type="time" id="walk-time" class="input-field"></div></div>
                </div>
                <div><h2 class="text-lg font-semibold mb-3">Address</h2><div class="input-group px-4"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-50"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg><input type="text" id="address" placeholder="e.g., 123 Bark Ave" class="input-field"></div></div>
                <div><h2 class="text-lg font-semibold mb-3">Select Dogs</h2><div id="dog-selection" class="grid grid-cols-2 sm:grid-cols-4 gap-4"></div></div>
                <div><h2 class="text-lg font-semibold mb-3">Special Instructions</h2><div class="input-group"><textarea id="instructions" placeholder="He loves belly rubs!" class="input-field h-24 resize-none"></textarea></div></div>
                <button id="toScreen2Btn" class="btn btn-primary w-full" disabled>Continue</button>
            </div>
        </section>
        <section class="screen" id="screen2">
            <div class="space-y-6 stagger-in">
                 <div class="flex flex-wrap gap-2 mb-4" id="filterChips">
                    <button class="chip active flex-1 btn btn-secondary" data-filter="nearest">Nearest</button>
                     <button class="chip flex-1 btn btn-secondary" data-filter="favorites">Favorites ★</button>
                    <button class="chip flex-1 btn btn-secondary" data-filter="price">Price</button>
                    <button class="chip flex-1 btn btn-secondary" data-filter="top-rated">Top Rated</button>
                </div>
                <div id="walker-list" class="space-y-4"></div>
                <div class="grid grid-cols-2 gap-4 pt-4">
                    <button id="backTo1Btn" class="btn btn-secondary">Back</button>
                    <button id="toScreen3Btn" class="btn btn-primary" disabled>Continue</button>
                </div>
            </div>
        </section>
        <section class="screen" id="screen3">
            <div class="space-y-6 stagger-in">
                <div class="glass-card p-5 space-y-3">
                    <h2 class="text-lg font-semibold">Walk Details</h2>
                    <div id="summary-details" class="divide-y divide-[var(--glass-border)]"></div>
                </div>
                <div class="glass-card p-5 space-y-3">
                    <h2 class="text-lg font-semibold">Price Summary</h2>
                    <div id="price-details" class="divide-y divide-[var(--glass-border)]"></div>
                    <div class="flex justify-between items-center font-bold text-lg border-t border-[var(--glass-border)] pt-3 mt-3">
                        <span>Total</span><span id="total-price"></span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 pt-4">
                    <button id="backTo2Btn" class="btn btn-secondary">Back</button>
                    <button id="bookWalkBtn" class="btn btn-primary">Book Walk</button>
                </div>
            </div>
        </section>
    </div>`;

// --- ALL APP FUNCTIONS ---

const goToPage = (pageId, context = null) => {
    vibrate();
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.querySelector('.main-content');
    const appContainer = document.querySelector('.app-container');

    pages.forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        const isFullScreenPage = ['page-booking-flow', 'page-live-tracking', 'page-chat', 'page-onboarding'].includes(pageId);

        if (document.querySelector('.bottom-nav')) {
            document.querySelector('.bottom-nav').style.display = isFullScreenPage ? 'none' : 'flex';
        }
        if (appContainer) {
            appContainer.style.display = pageId === 'page-onboarding' ? 'none' : 'flex';
        }
    }

    navItems.forEach(item => item.classList.toggle('active', item.dataset.target === pageId));

    appState.currentPage = pageId;
    if(mainContent) mainContent.scrollTop = 0;

    switch (pageId) {
        case 'page-home': renderDashboard(); break;
        case 'page-history': renderHistoryPage(); break;
        case 'page-walk-summary': if (context?.walkId) renderWalkSummary(context.walkId); break;
        case 'page-dogs': renderDogsPage(); break;
        case 'page-dog-form': renderDogForm(context?.dogId); break;
        case 'page-inbox': renderInboxPage(); break;
        case 'page-chat': if (context?.walkerId) renderChatPage(context.walkerId); break;
        case 'page-walker-profile': if (context?.walkerId) renderWalkerProfile(context.walkerId, context.backTarget); break;
        case 'page-live-tracking': if (context?.walkId) renderLiveTracking(context.walkId); break;
        case 'page-recurring-walks': renderRecurringWalksPage(); break;
        case 'page-payments': renderPaymentsPage(); break;
        case 'page-promotions': renderPromotionsPage(); break;
    }
};

function launchBookingFlow(source = 'nav') {
    const bookingPage = document.getElementById('page-booking-flow');
    if (!bookingPage) return;

    bookingPage.innerHTML = fullBookingFlowHTML;
    fullInitBookingFlow();

    if (typeof window !== 'undefined' && window.analytics && typeof window.analytics.track === 'function') {
        window.analytics.track('navigate_to_booking_flow', { source });
    }

    goToPage('page-booking-flow');
}

function vibrate(duration = 10) { if (window.navigator.vibrate) window.navigator.vibrate(duration); }

function renderDashboard() {
    const upcomingSection = document.getElementById('upcoming-walk-section');
    const upcomingCard = document.getElementById('upcoming-walk-card');
    if (upcomingSection && upcomingCard) {
        const statusPriority = { 'In Progress': 0, 'Upcoming': 1 };
        const sortByDate = (a, b) => {
            if (a.date && b.date) {
                const timeA = new Date(`${a.date}T${a.time || '00:00'}`);
                const timeB = new Date(`${b.date}T${b.time || '00:00'}`);
                if (!Number.isNaN(timeA.valueOf()) && !Number.isNaN(timeB.valueOf())) {
                    return timeA - timeB;
                }
            }
            return 0;
        };
        const upcomingWalk = walkHistoryData
            .filter(walk => ['In Progress', 'Upcoming'].includes(walk.status))
            .sort((a, b) => {
                const statusDiff = (statusPriority[a.status] ?? 2) - (statusPriority[b.status] ?? 2);
                if (statusDiff !== 0) return statusDiff;
                return sortByDate(a, b);
            })[0];

        if (upcomingWalk) {
            upcomingSection.style.display = 'block';
            upcomingCard.dataset.walkId = upcomingWalk.id;

            const avatarEl = document.getElementById('upcoming-walk-avatar');
            const titleEl = document.getElementById('upcoming-walk-title');
            const timeEl = document.getElementById('upcoming-walk-time');
            const durationEl = document.getElementById('upcoming-walk-duration');
            const dogsEl = document.getElementById('upcoming-walk-dogs');

            const walkerName = upcomingWalk.walker?.name || 'Your walker';
            if (avatarEl) {
                if (upcomingWalk.walker?.avatar) avatarEl.src = upcomingWalk.walker.avatar;
                avatarEl.alt = walkerName;
            }
            if (titleEl) titleEl.textContent = `With ${walkerName}`;

            if (timeEl) {
                if (upcomingWalk.status === 'In Progress') {
                    timeEl.textContent = 'In progress now';
                } else if (upcomingWalk.date) {
                    const dateObj = new Date(`${upcomingWalk.date}T${upcomingWalk.time || '00:00'}`);
                    if (!Number.isNaN(dateObj.valueOf())) {
                        const now = new Date();
                        const sameDay = dateObj.toDateString() === now.toDateString();
                        const dateLabel = sameDay ? 'Today' : dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                        const timeLabel = upcomingWalk.time ? dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '';
                        timeEl.textContent = timeLabel ? `${dateLabel} at ${timeLabel}` : dateLabel;
                    } else {
                        timeEl.textContent = 'Scheduled';
                    }
                } else {
                    timeEl.textContent = 'Scheduled';
                }
            }

            if (durationEl) durationEl.textContent = upcomingWalk.duration ? `${upcomingWalk.duration} min` : 'Walk scheduled';
            if (dogsEl) {
                const dogLabels = (upcomingWalk.dogs || []).map(dog => dog.avatar || dog.name).join(' ');
                dogsEl.textContent = dogLabels || '🐾';
            }

            upcomingCard.onclick = () => goToPage('page-live-tracking', { walkId: upcomingWalk.id });
            upcomingCard.style.cursor = 'pointer';
        } else {
            upcomingSection.style.display = 'none';
            upcomingCard.onclick = null;
            upcomingCard.style.cursor = 'default';
        }
    }

    const completedWalks = walkHistoryData
        .filter(w => w.status === 'Completed')
        .sort((a, b) => new Date(b.date + 'T00:00:00') - new Date(a.date + 'T00:00:00'));

    const recentActivityList = document.getElementById('recent-activity-list');
    if (recentActivityList) {
        const recentWalks = completedWalks.slice(0, 2);
        recentActivityList.innerHTML = recentWalks.map(walk => `
            <div class="glass-card p-3 flex items-center gap-3">
                <img src="${walk.walker.avatar}" class="w-10 h-10 rounded-full" alt="${walk.walker.name}">
                <div>
                    <p class="font-semibold">Walk with ${walk.walker.name}</p>
                    <p class="text-xs opacity-70">${new Date(walk.date + 'T00:00:00').toLocaleDateString()}</p>
                </div>
                <span class="ml-auto font-bold text-sm">$${walk.price.toFixed(2)}</span>
            </div>`).join('');
    }

}

function renderHistoryPage() {
    document.getElementById('history-list-container').innerHTML = walkHistoryData.map(walk => `
        <div class="glass-card p-4 cursor-pointer walk-history-item" data-walk-id="${walk.id}">
            <div class="flex justify-between items-center">
                <div><p class="font-bold text-lg">${new Date(walk.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p><p class="text-sm opacity-80">With ${walk.walker.name}</p></div>
                <div class="text-right"><p class="font-bold text-lg">$${walk.price.toFixed(2)}</p><p class="text-sm opacity-80">${walk.dogs.map(d => d.avatar).join(' ')}</p></div>
            </div>
        </div>`).join('');

    document.querySelectorAll('.walk-history-item').forEach(item => {
        item.addEventListener('click', e => {
            const walkId = parseInt(e.currentTarget.dataset.walkId);
            const walk = walkHistoryData.find(w => w.id === walkId);
            if (walk.status === 'In Progress') {
                goToPage('page-live-tracking', { walkId });
            } else {
                goToPage('page-walk-summary', { walkId });
            }
        });
    });
}

function renderWalkSummary(walkId) {
    const walk = walkHistoryData.find(w => w.id === walkId);
    if (!walk) return;
    const container = document.getElementById('page-walk-summary');
    container.innerHTML = `
        <div class="page-header"><button class="back-btn" data-target="page-history"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><h1>Walk Summary</h1></div>
        <div class="space-y-6">
            <div class="glass-card overflow-hidden"><img src="https://placehold.co/600x300/3d1c5a/E0E0E0?text=Walk+Route+Map" alt="Map of walk route"></div>
            <div class="glass-card p-4 flex items-center gap-4"><img src="${walk.walker.avatar}" class="w-16 h-16 rounded-full"><div><p class="opacity-80">Your walker was</p><p class="font-bold text-xl">${walk.walker.name}</p></div></div>
            ${(walk.photos && walk.photos.length > 0) ? `<div class="glass-card p-4"><h3 class="font-semibold mb-3">Photo Gallery</h3><div class="grid grid-cols-3 gap-2">${walk.photos.map(p => `<img src="${p}" class="rounded-lg w-full h-24 object-cover">`).join('')}</div></div>` : ''}
            ${walk.activity ? `<div class="glass-card p-4"><h3 class="font-semibold mb-3">Activity Report</h3><div class="flex justify-around text-center">${['Pee', 'Poo', 'Water'].map(act => `<div><div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto ${walk.activity[act.toLowerCase()] ? 'bg-green-500/50' : 'bg-red-500/50'}">${walk.activity[act.toLowerCase()] ? '✓' : '✗'}</div><p class="text-xs mt-1">${act}</p></div>`).join('')}</div></div>` : ''}
            <div class="glass-card p-4"><h3 class="font-semibold mb-2">Walker's Note</h3><p class="opacity-80 italic">"${walk.note}"</p></div>
        </div>`;
}

function renderDogsPage() {
     document.getElementById('dog-list-container').innerHTML = dogData.map(dog => `
        <div class="glass-card p-4 flex items-center gap-4">
            <span class="text-5xl">${dog.avatar}</span>
            <div class="flex-grow"><p class="font-bold text-lg">${dog.name}</p><p class="text-sm opacity-80">${dog.breed}, ${dog.age} years old</p></div>
            <button class="btn-secondary px-3 py-2 text-sm rounded-lg dog-edit-btn" data-dog-id="${dog.id}">Edit</button>
        </div>`).join('');
     document.querySelectorAll('.dog-edit-btn').forEach(btn => btn.addEventListener('click', e => goToPage('page-dog-form', { dogId: parseInt(e.currentTarget.dataset.dogId) })));
}

function renderDogForm(dogId = null) {
    const dog = dogId ? dogData.find(d => d.id === dogId) : null;
    const title = dog ? 'Edit Dog Profile' : 'Add a New Dog';
    const container = document.getElementById('page-dog-form');
    container.innerHTML = `
        <div class="page-header"><button class="back-btn" data-target="page-dogs"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><h1>${title}</h1></div>
        <form id="dog-form" class="space-y-4">
            <h3 class="font-semibold">Basic Info</h3>
            <div class="input-group"><input name="name" type="text" placeholder="Dog's Name" required class="input-field" value="${dog?.name || ''}"></div>
            <div class="input-group"><input name="breed" type="text" placeholder="Breed" required class="input-field" value="${dog?.breed || ''}"></div>
            <div class="input-group"><input name="age" type="number" placeholder="Age (years)" required class="input-field" value="${dog?.age || ''}"></div>
            <h3 class="font-semibold pt-2">Health & Care</h3>
            <div class="input-group"><input name="vet" type="text" placeholder="Veterinarian" class="input-field" value="${dog?.vet || ''}"></div>
            <div class="input-group"><input name="allergies" type="text" placeholder="Allergies" class="input-field" value="${dog?.allergies || ''}"></div>
            <h3 class="font-semibold pt-2">Behavior</h3>
            <div class="input-group"><input name="likes" type="text" placeholder="Likes (e.g., toys, parks)" class="input-field" value="${dog?.likes || ''}"></div>
            <div class="input-group"><input name="dislikes" type="text" placeholder="Dislikes (e.g., loud noises)" class="input-field" value="${dog?.dislikes || ''}"></div>
            <button type="submit" class="btn btn-primary w-full !mt-6">Save Profile</button>
        </form>`;

    document.getElementById('dog-form').addEventListener('submit', e => {
        e.preventDefault();
        // Logic to save dog data would go here
        goToPage('page-dogs');
    });
}

function renderInboxPage() {
    document.getElementById('inbox-list-container').innerHTML = inboxData.map(convo => {
        const walker = walkerData.find(w => w.id === convo.walkerId);
        return `
        <div class="glass-card p-4 flex items-center gap-4 cursor-pointer inbox-item" data-walker-id="${walker.id}">
             <img src="${walker.avatar}" class="w-14 h-14 rounded-full">
             <div class="flex-grow">
                <div class="flex justify-between items-start">
                     <p class="font-bold text-lg">${walker.name}</p>
                     ${convo.unread ? `<span class="w-3 h-3 bg-blue-500 rounded-full mt-1"></span>` : ''}
                </div>
                <p class="text-sm opacity-80 truncate">${convo.lastMessage}</p>
             </div>
        </div>`
    }).join('');
    document.querySelectorAll('.inbox-item').forEach(item => item.addEventListener('click', e => goToPage('page-chat', { walkerId: parseInt(e.currentTarget.dataset.walkerId) })));
}

function renderChatPage(walkerId) {
    const walker = walkerData.find(w => w.id === walkerId);
    const messages = chatData[walkerId] || [];
    const container = document.getElementById('page-chat');
    container.innerHTML = `
        <div class="page-header"><button class="back-btn" data-target="page-inbox"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><h1>${walker.name}</h1></div>
        <div class="space-y-4 mb-20">
            ${messages.map(msg => `<div class="flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}"><div class="chat-bubble ${msg.sender}">${msg.text}</div></div>`).join('')}
        </div>
        <div class="fixed bottom-4 left-0 right-0 max-w-xl mx-auto px-4"><div class="input-group"><input type="text" placeholder="Type a message..." class="input-field pr-20"><button class="absolute right-2 btn btn-primary py-2 px-3 text-sm">Send</button></div></div>
    `;
}

function renderWalkerProfile(walkerId, backTarget = 'page-home') {
     const walker = walkerData.find(w => w.id === walkerId);
    if (!walker) return;
    const container = document.getElementById('page-walker-profile');
    container.innerHTML = `
        <div class="page-header">
            <button class="back-btn" data-target="${backTarget}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
            <h1>Walker Profile</h1>
            <button class="favorite-btn p-2 ${walker.favorite ? 'favorited' : ''}" data-walker-id="${walker.id}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>
        </div>
        <div class="space-y-6 stagger-in">
            <div class="flex flex-col items-center"><img src="${walker.avatar}" class="w-28 h-28 rounded-full border-4 border-[var(--glass-border)]"><h2 class="text-2xl font-bold mt-4">${walker.name}</h2><p class="opacity-70">★ ${walker.rating} (${walker.reviews} Reviews)</p></div>
            <div class="flex justify-center gap-2">${walker.badges.map(b => `<span class="bg-[var(--glass-bg)] text-xs font-semibold px-3 py-1 rounded-full">${b}</span>`).join('')}</div>
            <div class="glass-card p-5"><h3 class="font-semibold mb-2">About Me</h3><p class="opacity-80">${walker.bio}</p></div>
            <div class="glass-card p-5"><h3 class="font-semibold mb-2">Reviews</h3><div class="space-y-3"><div class="flex gap-2"><p class="font-bold">Anna K.</p><p>★★★★★</p></div><p class="opacity-80 text-sm italic">"Alex was amazing with my energetic puppy!"</p></div></div>
        </div>`;

    container.querySelector('.favorite-btn').addEventListener('click', e => {
        const button = e.currentTarget;
        const id = parseInt(button.dataset.walkerId);
        const targetWalker = walkerData.find(w => w.id === id);
        targetWalker.favorite = !targetWalker.favorite;
        button.classList.toggle('favorited');
    });
}

function renderLiveTracking(walkId) {
    const walk = walkHistoryData.find(w => w.id === walkId);
    if (!walk) return;
    const container = document.getElementById('page-live-tracking');
    container.innerHTML = `
        <div class="page-header"><button class="back-btn" data-target="page-home"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><h1>Live Walk</h1></div>
        <div class="space-y-4">
             <div class="glass-card non-hover overflow-hidden h-64 flex items-center justify-center"><img src="https://placehold.co/600x400/3d1c5a/E0E0E0?text=Live+Map" alt="Live Map" class="w-full h-full object-cover"></div>
             <div class="glass-card non-hover p-4 text-center"><p class="text-lg">Time Remaining</p><p class="text-4xl font-bold">21:47</p></div>
             <div class="glass-card non-hover p-4"><div class="flex items-center gap-4"><img src="${walk.walker.avatar}" class="w-12 h-12 rounded-full"><p class="font-semibold">${walk.walker.name} is walking ${walk.dogs.map(d=>d.name).join(', ')}</p></div></div>
             <div class="glass-card non-hover p-4"><h3 class="font-semibold mb-2">Send a Message</h3><div class="input-group"><input type="text" placeholder="Great job!" class="input-field pr-20"><button class="absolute right-2 btn btn-primary py-2 px-3 text-sm">Send</button></div></div>
        </div>`;
}

function renderRecurringWalksPage() {
    const container = document.getElementById('page-recurring-walks');
    if (!container) return;

    container.innerHTML = `
        <div class="page-header">
            <button class="back-btn" data-target="page-home" aria-label="Back to Home">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <h1>Scheduled Walks</h1>
        </div>
        <div class="space-y-6" id="recurring-page-content">
            <div id="recurring-empty-state" class="glass-card p-5 text-center space-y-2 ${recurringWalkPlans.length ? 'hidden' : ''}">
                <div class="text-4xl">🗓️</div>
                <h2 class="text-lg font-semibold">No recurring walks yet</h2>
                <p class="text-sm opacity-80">Create a schedule so your pups never miss their favorite stroll.</p>
            </div>
            <div id="recurring-plan-list" class="space-y-4"></div>
            <button class="btn btn-primary w-full" id="recurring-schedule-btn">Set Up New Schedule</button>
            <div id="recurring-plan-form-wrapper" class="scheduler-form hidden">
                <form id="recurring-plan-form" class="glass-card p-5 space-y-5" novalidate>
                    <div class="flex justify-between items-center">
                        <div>
                            <h2 class="text-lg font-semibold" id="recurring-form-title">Set Up New Schedule</h2>
                            <p class="text-sm opacity-70" id="recurring-form-subtitle">Pick the routine that fits your pups best.</p>
                        </div>
                        <button type="button" class="icon-button" id="recurring-form-close" aria-label="Close schedule form">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <h3 class="text-sm font-semibold mb-2">Plan nickname <span class="opacity-60">(optional)</span></h3>
                            <div class="input-group"><input type="text" id="recurring-plan-label" class="input-field" placeholder="e.g., Morning crew"></div>
                        </div>
                        <div>
                            <h3 class="text-sm font-semibold mb-2">Pick days</h3>
                            <div id="recurring-day-picker" class="day-picker-grid"></div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <h3 class="text-sm font-semibold mb-2">Start date</h3>
                                <div class="input-group"><input type="date" id="recurring-start-date" class="input-field"></div>
                            </div>
                            <div>
                                <h3 class="text-sm font-semibold mb-2">Walk time</h3>
                                <div class="input-group"><input type="time" id="recurring-time" class="input-field" value="09:00"></div>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-sm font-semibold mb-2">Duration</h3>
                            <div id="recurring-duration-options" class="grid grid-cols-2 gap-3"></div>
                        </div>
                        <div>
                            <h3 class="text-sm font-semibold mb-2">Select dogs</h3>
                            <div id="recurring-dog-selection" class="grid grid-cols-2 gap-3"></div>
                        </div>
                        <div>
                            <h3 class="text-sm font-semibold mb-2">Preferred walker</h3>
                            <div class="flex flex-wrap gap-2 mb-3" id="recurring-filter-chips">
                                <button type="button" class="chip btn btn-secondary active" data-filter="nearest">Nearest</button>
                                <button type="button" class="chip btn btn-secondary" data-filter="favorites">Favorites ★</button>
                                <button type="button" class="chip btn btn-secondary" data-filter="price">Price</button>
                                <button type="button" class="chip btn btn-secondary" data-filter="top-rated">Top Rated</button>
                            </div>
                            <div id="recurring-walker-list" class="space-y-3"></div>
                        </div>
                        <div>
                            <h3 class="text-sm font-semibold mb-2">Pickup address</h3>
                            <div class="input-group"><input type="text" id="recurring-address" class="input-field" placeholder="e.g., 123 Bark Ave"></div>
                        </div>
                        <div>
                            <h3 class="text-sm font-semibold mb-2">Notes for walker</h3>
                            <div class="input-group"><textarea id="recurring-notes" class="input-field h-24 resize-none" placeholder="Anything special to remember?"></textarea></div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <button type="button" class="btn btn-secondary" id="recurring-form-cancel">Cancel</button>
                        <button type="submit" class="btn btn-primary" id="recurring-form-submit">Save Schedule</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    const planListEl = container.querySelector('#recurring-plan-list');
    const emptyStateEl = container.querySelector('#recurring-empty-state');
    const formWrapper = container.querySelector('#recurring-plan-form-wrapper');
    const formEl = container.querySelector('#recurring-plan-form');
    const dayPickerEl = container.querySelector('#recurring-day-picker');
    const dogSelectionEl = container.querySelector('#recurring-dog-selection');
    const durationOptionsEl = container.querySelector('#recurring-duration-options');
    const walkerListEl = container.querySelector('#recurring-walker-list');
    const filterChipsEl = container.querySelector('#recurring-filter-chips');
    const scheduleBtn = container.querySelector('#recurring-schedule-btn');
    const closeBtn = container.querySelector('#recurring-form-close');
    const cancelBtn = container.querySelector('#recurring-form-cancel');
    const submitBtn = container.querySelector('#recurring-form-submit');
    const startDateInput = container.querySelector('#recurring-start-date');
    const timeInput = container.querySelector('#recurring-time');
    const labelInput = container.querySelector('#recurring-plan-label');
    const addressInput = container.querySelector('#recurring-address');
    const notesInput = container.querySelector('#recurring-notes');

    let editingPlanId = null;
    const todayIso = new Date().toISOString().split('T')[0];
    startDateInput.min = todayIso;

    function toggleForm(show) {
        if (show) {
            formWrapper.classList.remove('hidden');
            formWrapper.classList.add('active');
        } else {
            formWrapper.classList.add('hidden');
            formWrapper.classList.remove('active');
        }
    }

    function resetForm() {
        formEl.reset();
        editingPlanId = null;
        labelInput.value = '';
        addressInput.value = '';
        notesInput.value = '';
        timeInput.value = '09:00';
        startDateInput.value = todayIso;
        startDateInput.min = todayIso;
        renderDayPicker([]);
        renderDogSelection([]);
        renderDurationOptions(30);
        renderWalkerOptions(walkerData, null);
        filterChipsEl.querySelectorAll('button').forEach((btn, index) => btn.classList.toggle('active', index === 0));
        submitBtn.textContent = 'Save Schedule';
        container.querySelector('#recurring-form-title').textContent = 'Set Up New Schedule';
        container.querySelector('#recurring-form-subtitle').textContent = 'Pick the routine that fits your pups best.';
    }

    function renderDayPicker(selected = []) {
        dayPickerEl.innerHTML = DAY_LABELS.map((label, index) => `<button type="button" class="day-toggle${selected.includes(index) ? ' active' : ''}" data-day="${index}">${label}</button>`).join('');
    }

    function renderDogSelection(selectedIds = []) {
        dogSelectionEl.innerHTML = dogData.map(dog => `
            <label class="checkable-card">
                <input type="checkbox" name="recurring-dogs" value="${dog.id}" ${selectedIds.includes(dog.id) ? 'checked' : ''}>
                <div class="card-content glass-card p-4 flex flex-col items-center">
                    <span class="text-3xl">${dog.avatar}</span>
                    <span class="font-semibold mt-2 text-sm">${dog.name}</span>
                </div>
                <div class="checkmark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
            </label>
        `).join('');
    }

    function renderDurationOptions(selectedDuration = 30) {
        durationOptionsEl.innerHTML = [
            { value: 30, label: '30 min', price: '$25' },
            { value: 60, label: '60 min', price: '$40' }
        ].map(option => `
            <label class="checkable-card">
                <input type="radio" name="recurring-duration" value="${option.value}" ${option.value === selectedDuration ? 'checked' : ''}>
                <div class="card-content glass-card p-4">
                    <div class="text-lg font-semibold">${option.label}</div>
                    <div class="text-sm opacity-70">${option.price}</div>
                </div>
                <div class="checkmark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
            </label>
        `).join('');
    }

    function renderWalkerOptions(walkers, selectedId = null) {
        if (!walkerListEl) return;
        if (!walkers.length) {
            walkerListEl.innerHTML = '<p class="text-sm opacity-70 text-center">No walkers match your filters.</p>';
            return;
        }
        walkerListEl.innerHTML = walkers.map(walker => {
            const isSelected = walker.id === selectedId;
            return `
            <label class="walker-option glass-card p-4 flex items-center gap-3${isSelected ? ' selected' : ''}">
                <input type="radio" class="hidden" name="recurring-walker" value="${walker.id}" ${isSelected ? 'checked' : ''}>
                <img src="${walker.avatar}" alt="${walker.name}" class="w-12 h-12 rounded-full object-cover">
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        <span class="font-semibold">${walker.name}</span>
                        ${walker.verified ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#60a5fa" stroke="white" stroke-width="1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' : ''}
                    </div>
                    <p class="text-xs opacity-70">★ ${walker.rating.toFixed(1)} • $${walker.price.toFixed(0)}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="selection-indicator"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </label>
        `; }).join('');
        walkerListEl.querySelectorAll('input[name="recurring-walker"]').forEach(input => {
            const card = input.closest('.walker-option');
            if (input.checked) card?.classList.add('selected');
            input.addEventListener('change', () => {
                walkerListEl.querySelectorAll('.walker-option').forEach(option => option.classList.remove('selected'));
                card?.classList.add('selected');
            });
        });
    }

    function getSelectedDays() {
        return Array.from(dayPickerEl.querySelectorAll('.day-toggle.active')).map(btn => parseInt(btn.dataset.day, 10));
    }

    function getSelectedDogIds() {
        return Array.from(dogSelectionEl.querySelectorAll('input[name="recurring-dogs"]:checked')).map(cb => parseInt(cb.value, 10));
    }

    function getSelectedWalkerId() {
        const selected = walkerListEl.querySelector('input[name="recurring-walker"]:checked');
        return selected ? parseInt(selected.value, 10) : null;
    }

    function populateForm(plan) {
        editingPlanId = plan?.id ?? null;
        filterChipsEl.querySelectorAll('button').forEach((btn, index) => btn.classList.toggle('active', index === 0));
        renderDayPicker(plan?.daysOfWeek || []);
        renderDogSelection(plan?.dogIds || []);
        renderDurationOptions(plan?.duration || 30);
        renderWalkerOptions(walkerData, plan?.walkerId ?? null);
        const planStart = plan?.startDate || todayIso;
        startDateInput.value = planStart;
        startDateInput.min = plan?.startDate && plan.startDate < todayIso ? plan.startDate : todayIso;
        timeInput.value = plan?.time || '09:00';
        labelInput.value = plan?.label || '';
        addressInput.value = plan?.address || '';
        notesInput.value = plan?.notes || '';
        submitBtn.textContent = editingPlanId ? 'Update Schedule' : 'Save Schedule';
        container.querySelector('#recurring-form-title').textContent = editingPlanId ? 'Edit Schedule' : 'Set Up New Schedule';
        container.querySelector('#recurring-form-subtitle').textContent = editingPlanId ? 'Tweak the routine without missing a beat.' : 'Pick the routine that fits your pups best.';
        toggleForm(true);
    }

    function renderPlans() {
        if (!planListEl) return;
        if (!recurringWalkPlans.length) {
            planListEl.innerHTML = '';
            emptyStateEl?.classList.remove('hidden');
            return;
        }
        emptyStateEl?.classList.add('hidden');
        planListEl.innerHTML = recurringWalkPlans.map(plan => {
            const walker = walkerData.find(w => w.id === plan.walkerId);
            const dogs = plan.dogIds.map(id => dogData.find(d => d.id === id)?.name).filter(Boolean).join(', ');
            const nextOccurrence = generatePlanOccurrences(plan, 1)[0];
            const nextLabel = nextOccurrence ? `${formatDateDisplay(nextOccurrence.date)} at ${formatTimeDisplay(plan.time)}` : 'No upcoming days';
            const statusClass = plan.status === 'active' ? 'status-badge--active' : 'status-badge--paused';
            const statusLabel = plan.status === 'active' ? 'Active' : 'Paused';
            const nextDateAttr = nextOccurrence?.date || '';
            const disabledAttr = plan.status !== 'active' || !nextOccurrence ? 'disabled' : '';
            const subtitle = plan.label ? (walker ? walker.name : 'Walker TBD') : formatPlanDays(plan.daysOfWeek);
            return `
                <div class="glass-card p-5 space-y-3 recurring-plan-card" data-plan-id="${plan.id}">
                    <div class="flex justify-between gap-3 items-start">
                        <div>
                            <p class="font-semibold text-base">${plan.label || formatPlanDays(plan.daysOfWeek)}</p>
                            <p class="text-sm opacity-70">${subtitle}</p>
                        </div>
                        <span class="status-badge ${statusClass}">${statusLabel}</span>
                    </div>
                    <div class="text-sm opacity-80 space-y-1">
                        <p>${formatPlanDays(plan.daysOfWeek)} • ${formatTimeDisplay(plan.time)} • ${plan.duration} min</p>
                        <p>Walker: ${walker ? walker.name : 'Select during booking'}</p>
                        <p>Dogs: ${dogs || 'Select dogs'}</p>
                        <p class="next-occurrence">Next: ${nextLabel}</p>
                    </div>
                    <div class="flex flex-wrap gap-2 pt-1">
                        <button type="button" class="btn btn-secondary flex-1" data-action="review" data-occurrence-date="${nextDateAttr}" ${!nextOccurrence ? 'disabled' : ''}>Review next walk</button>
                        <button type="button" class="btn btn-primary flex-1" data-action="confirm" data-occurrence-date="${nextDateAttr}" ${disabledAttr}>Confirm next walk</button>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <button type="button" class="btn btn-secondary flex-1" data-action="edit">Edit</button>
                        <button type="button" class="btn btn-secondary flex-1" data-action="toggle">${plan.status === 'active' ? 'Pause' : 'Resume'}</button>
                        <button type="button" class="btn btn-danger flex-1" data-action="delete">Cancel plan</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderDayPicker([]);
    renderDogSelection([]);
    renderDurationOptions(30);
    renderWalkerOptions(walkerData, null);
    renderPlans();
    startDateInput.value = todayIso;

    scheduleBtn.addEventListener('click', () => {
        vibrate();
        resetForm();
        toggleForm(true);
    });

    closeBtn.addEventListener('click', () => {
        vibrate();
        resetForm();
        toggleForm(false);
    });

    cancelBtn.addEventListener('click', () => {
        vibrate();
        resetForm();
        toggleForm(false);
    });

    dayPickerEl.addEventListener('click', e => {
        const button = e.target.closest('.day-toggle');
        if (!button) return;
        vibrate();
        button.classList.toggle('active');
    });

    filterChipsEl.addEventListener('click', e => {
        const button = e.target.closest('button[data-filter]');
        if (!button) return;
        vibrate();
        filterChipsEl.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        let filtered = [...walkerData];
        const filter = button.dataset.filter;
        if (filter === 'price') filtered.sort((a, b) => a.price - b.price);
        else if (filter === 'top-rated') filtered.sort((a, b) => b.rating - a.rating);
        else if (filter === 'favorites') filtered = filtered.filter(w => w.favorite);
        renderWalkerOptions(filtered, getSelectedWalkerId());
    });

    walkerListEl.addEventListener('change', e => {
        if (e.target.name === 'recurring-walker') {
            vibrate();
        }
    });

    planListEl.addEventListener('click', e => {
        const actionBtn = e.target.closest('[data-action]');
        if (!actionBtn) return;
        const planCard = actionBtn.closest('.recurring-plan-card');
        if (!planCard) return;
        const planId = parseInt(planCard.dataset.planId, 10);
        const plan = getRecurringPlanById(planId);
        if (!plan) return;
        vibrate();
        const action = actionBtn.dataset.action;
        if (action === 'edit') {
            populateForm(plan);
        } else if (action === 'toggle') {
            toggleRecurringPlanStatus(planId);
            renderPlans();
        } else if (action === 'delete') {
            if (editingPlanId === planId) {
                resetForm();
                toggleForm(false);
            }
            deleteRecurringPlan(planId);
            renderPlans();
        } else if (action === 'confirm') {
            if (plan.status !== 'active') return;
            const date = actionBtn.dataset.occurrenceDate;
            if (!date) return;
            confirmRecurringOccurrence(planId, { date, time: plan.time });
            renderPlans();
        } else if (action === 'review') {
            const date = actionBtn.dataset.occurrenceDate;
            if (!date) return;
            appState.prefillBooking = {
                date,
                time: plan.time,
                duration: plan.duration,
                walkerId: plan.walkerId,
                dogIds: plan.dogIds,
                address: plan.address,
                notes: plan.notes
            };
            launchBookingFlow('recurring-plan');
        }
    });

    formEl.addEventListener('submit', e => {
        e.preventDefault();
        vibrate();
        const selectedDays = getSelectedDays();
        const selectedDogs = getSelectedDogIds();
        const selectedWalkerId = getSelectedWalkerId();
        const duration = parseInt((formEl.querySelector('input[name="recurring-duration"]:checked')?.value) || '30', 10);
        const startDate = startDateInput.value || todayIso;
        const time = timeInput.value || '09:00';
        if (!selectedDays.length) { alert('Select at least one day of the week.'); return; }
        if (!selectedDogs.length) { alert('Select at least one dog.'); return; }
        if (!selectedWalkerId) { alert('Choose a preferred walker.'); return; }
        if (!addressInput.value.trim()) { alert('Add a pickup address so your walker knows where to go.'); return; }

        const payload = {
            label: labelInput.value,
            daysOfWeek: selectedDays,
            dogIds: selectedDogs,
            walkerId: selectedWalkerId,
            duration,
            startDate,
            time,
            address: addressInput.value,
            notes: notesInput.value
        };

        if (editingPlanId) {
            updateRecurringPlan(editingPlanId, payload);
        } else {
            createRecurringPlan(payload);
        }
        renderPlans();
        resetForm();
        toggleForm(false);
    });
}

function renderPaymentsPage() {
    const container = document.getElementById('page-payments');
    container.innerHTML = `<div class="page-header"><button class="back-btn" data-target="page-profile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><h1>Payments</h1></div><div class="space-y-6"><div class="glass-card p-5"><h3 class="font-semibold mb-3">My Card</h3><div class="flex items-center gap-4"><img src="https://placehold.co/60x40/FFFFFF/000000?text=VISA" class="w-12 rounded-md"><p>**** **** **** ${paymentData.card.last4}</p><p class="ml-auto text-sm opacity-80">Exp ${paymentData.card.expiry}</p></div></div><div class="glass-card p-5"><h3 class="font-semibold mb-3">Transaction History</h3><div class="space-y-2">${paymentData.transactions.map(t => `<div class="flex justify-between text-sm"><p>${t.desc}</p><p>$${t.amount.toFixed(2)}</p></div>`).join('')}</div></div><button class="btn btn-secondary w-full">Add New Card</button></div>`;
}

function renderPromotionsPage() {
     const container = document.getElementById('page-promotions');
     container.innerHTML = `<div class="page-header"><button class="back-btn" data-target="page-profile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><h1>Promotions</h1></div><div class="space-y-6"><div class="glass-card p-5 text-center"><h3 class="font-semibold mb-2">Refer a Friend, Get $10!</h3><p class="opacity-80 text-sm mb-4">Share your code and you'll both get $10 off your next walk.</p><div class="p-3 bg-black/20 rounded-lg font-mono tracking-widest">ALEX-WALKS-25</div></div><div class="glass-card p-5"><h3 class="font-semibold mb-3">Active Promos</h3><div class="p-3 bg-primary-color/20 rounded-lg"><p class="font-bold">15% Off All 60-Min Walks</p><p class="text-sm opacity-80">Valid this weekend only. Auto-applied at checkout.</p></div></div></div>`;
}

function fullInitBookingFlow() {
    const bookingState = {};
    const prefill = appState.prefillBooking;
    let hasAppliedPrefillWalker = false;
    let currentScreen = 0;
    const screens = document.querySelectorAll('#page-booking-flow .screen');
    const progressBar = { line: document.getElementById('progressLineActive'), steps: [document.getElementById('step-0'), document.getElementById('step-1'), document.getElementById('step-2')] };
    const toScreen2Btn = document.getElementById('toScreen2Btn');

    function goToBookingScreen(screenIndex) {
        vibrate();
        if(screens[currentScreen]) screens[currentScreen].classList.remove('active');
        if(screens[screenIndex]) screens[screenIndex].classList.add('active');
        currentScreen = screenIndex;
        updateProgressBar();
    }

    function updateProgressBar() {
        progressBar.steps.forEach((step, i) => step.classList.toggle('active', i <= currentScreen));
        progressBar.line.style.width = `${currentScreen * 50}%`;
    }

    function showSuccessModal() {
        vibrate(50);
        const modalHTML = `<div class="modal-overlay active" id="successModal"><div class="modal-content glass-card"><svg class="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg><h2 class="text-2xl font-bold mb-2">Booking Confirmed!</h2><p class="opacity-80">Your dog's adventure is scheduled.</p><button id="modal-back-to-home" class="btn btn-primary mt-4 w-full">Back to Home</button></div></div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.getElementById('modal-back-to-home').addEventListener('click', () => {
            document.getElementById('successModal').remove();
            const newWalk = {
                id: Date.now(),
                date: bookingState.dateTime.date,
                time: bookingState.dateTime.time,
                duration: bookingState.service?.duration,
                walker: bookingState.selectedWalker,
                dogs: bookingState.selectedDogs,
                price: bookingState.total,
                status: 'Upcoming'
            };
            walkHistoryData.unshift(newWalk);
            goToPage('page-home');
        });
    }

    // Init Screen 1
    const dateInput = document.getElementById('walk-date');
    const timeInput = document.getElementById('walk-time');
    const addressInput = document.getElementById('address');
    const instructionsInput = document.getElementById('instructions');
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowIso = tomorrow.toISOString().split('T')[0];
    const minDate = prefill?.date && prefill.date < tomorrowIso ? prefill.date : tomorrowIso;
    dateInput.value = prefill?.date || tomorrowIso;
    dateInput.min = minDate;
    timeInput.value = prefill?.time || '10:00';
    if (prefill?.address) addressInput.value = prefill.address;
    if (prefill?.notes) instructionsInput.value = prefill.notes;
    const preselectedDogs = prefill?.dogIds || [];
    document.getElementById('dog-selection').innerHTML = dogData.map(dog => `<label class="checkable-card"><input type="checkbox" name="dogs" value="${dog.id}" ${preselectedDogs.includes(dog.id) ? 'checked' : ''}><div class="card-content glass-card p-4 flex flex-col items-center"><span class="text-4xl">${dog.avatar}</span><span class="font-semibold mt-2">${dog.name}</span></div><div class="checkmark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div></label>`).join('');
    if (prefill?.duration) {
        const durationRadio = document.querySelector(`input[name="service"][value="${prefill.duration}"]`);
        if (durationRadio) durationRadio.checked = true;
    }

    function validateScreen1() {
        const serviceChecked = document.querySelector('input[name="service"]:checked');
        bookingState.service = { duration: parseInt(serviceChecked.value), price: parseFloat(serviceChecked.dataset.price) };
        bookingState.dateTime = { date: document.getElementById('walk-date').value, time: document.getElementById('walk-time').value };
        bookingState.address = document.getElementById('address').value.trim();
        bookingState.selectedDogs = Array.from(document.querySelectorAll('input[name="dogs"]:checked')).map(cb => dogData.find(d => d.id === parseInt(cb.value)));
        toScreen2Btn.disabled = !(bookingState.address.length > 2 && bookingState.dateTime.date && bookingState.dateTime.time && bookingState.selectedDogs.length > 0);
    }
    document.getElementById('screen1').addEventListener('input', validateScreen1);
    validateScreen1();

    // Init Screen 2
    function renderWalkerList(walkers) {
        document.getElementById('toScreen3Btn').disabled = true;
        const walkerList = document.getElementById('walker-list');
        walkerList.innerHTML = Array(3).fill('').map(() => `<div class="glass-card p-4 flex gap-4 items-center animate-pulse"><div class="w-16 h-16 rounded-full bg-[var(--glass-border)]"></div><div class="flex-1 space-y-2"><div class="h-4 w-3/4 rounded bg-[var(--glass-border)]"></div><div class="h-3 w-1/2 rounded bg-[var(--glass-border)]"></div></div></div>`).join('');

        setTimeout(() => {
            if (walkers.length === 0) {
                 walkerList.innerHTML = `<p class="text-center opacity-80">No walkers match your criteria.</p>`;
                 return;
            }
            walkerList.innerHTML = walkers.map(w => `<div class="walker-card-container relative"><input type="radio" name="walker" value="${w.id}" class="hidden" id="walker-radio-${w.id}"><label for="walker-radio-${w.id}" class="glass-card p-4 flex gap-4 items-center cursor-pointer"><img src="${w.avatar}" alt="${w.name}" class="w-16 h-16 rounded-full view-profile-btn" data-walker-id="${w.id}"><div class="flex-1"> <div class="flex items-center gap-2"><h3 class="font-bold text-lg">${w.name}</h3>${w.verified ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" stroke-width="1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`:''}</div><p class="text-sm opacity-80">★ ${w.rating.toFixed(1)} (${w.reviews} reviews)</p></div><div class="text-right"><p class="text-xl font-bold">$${w.price.toFixed(2)}</p></div></label><button class="favorite-btn absolute top-3 right-3 p-2 ${w.favorite ? 'favorited' : ''}" data-walker-id="${w.id}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button></div>`).join('');
            walkerList.querySelectorAll('input[name="walker"]').forEach(radio => radio.addEventListener('change', e => {
                bookingState.selectedWalker = walkerData.find(w => w.id === parseInt(e.target.value));
                document.getElementById('toScreen3Btn').disabled = false;
                walkerList.querySelectorAll('.glass-card').forEach(c => c.style.borderColor = 'var(--glass-border)');
                e.target.nextElementSibling.style.borderColor = 'var(--primary-color-light)';
            }));
            if (prefill?.walkerId && !hasAppliedPrefillWalker) {
                const targetRadio = walkerList.querySelector(`input[name="walker"][value="${prefill.walkerId}"]`);
                if (targetRadio) {
                    targetRadio.checked = true;
                    targetRadio.dispatchEvent(new Event('change'));
                    hasAppliedPrefillWalker = true;
                }
            }
            walkerList.querySelectorAll('.view-profile-btn').forEach(btn => btn.addEventListener('click', e => {
                e.stopPropagation();
                goToPage('page-walker-profile', { walkerId: parseInt(e.target.dataset.walkerId), backTarget: 'page-booking-flow' });
            }));
            walkerList.querySelectorAll('.favorite-btn').forEach(btn => btn.addEventListener('click', e => {
                e.stopPropagation();
                const walkerId = parseInt(e.currentTarget.dataset.walkerId);
                const walker = walkerData.find(w => w.id === walkerId);
                walker.favorite = !walker.favorite;
                e.currentTarget.classList.toggle('favorited');
            }));
        }, 500);
    }

    renderWalkerList(walkerData);
    document.getElementById('filterChips').addEventListener('click', e => {
        const button = e.target.closest('button');
        if (button) {
            document.querySelectorAll('#filterChips .chip').forEach(c => c.classList.remove('active'));
            button.classList.add('active');
            let sorted = [...walkerData];
            const filter = button.dataset.filter;
            if (filter === 'price') sorted.sort((a, b) => a.price - b.price);
            else if (filter === 'top-rated') sorted.sort((a, b) => b.rating - a.rating);
            else if (filter === 'favorites') sorted = sorted.filter(w => w.favorite);
            renderWalkerList(sorted);
        }
    });

    // Init Screen 3
    function renderReviewScreen() {
        const servicePrice = bookingState?.service?.price || 0;
        const serviceDuration = bookingState?.service?.duration;
        bookingState.total = servicePrice;
        document.getElementById('summary-details').innerHTML = `<div class="py-2 flex justify-between"><span>Date & Time</span><span class="text-right font-semibold">${bookingState.dateTime.date} at ${bookingState.dateTime.time}</span></div> <div class="py-2 flex justify-between"><span>Dogs</span><span class="text-right font-semibold">${bookingState.selectedDogs.map(d=>d.name).join(', ')}</span></div> <div class="py-2 flex justify-between"><span>Walker</span><span class="text-right font-semibold">${bookingState.selectedWalker.name}</span></div>`;
        const serviceLabel = serviceDuration ? `${serviceDuration} min walk` : 'Walk Price';
        document.getElementById('price-details').innerHTML = `<div class="py-2 flex justify-between"><span>${serviceLabel}</span> <span>$${bookingState.total.toFixed(2)}</span></div>`;
        document.getElementById('total-price').textContent = `$${bookingState.total.toFixed(2)}`;
    }

    // Booking Flow Navigation
    toScreen2Btn.addEventListener('click', () => goToBookingScreen(1));
    document.getElementById('backTo1Btn').addEventListener('click', () => goToBookingScreen(0));
    document.getElementById('toScreen3Btn').addEventListener('click', () => { renderReviewScreen(); goToBookingScreen(2); });
    document.getElementById('backTo2Btn').addEventListener('click', () => goToBookingScreen(1));
    document.getElementById('bookWalkBtn').addEventListener('click', showSuccessModal);
    appState.prefillBooking = null;
}

function initOnboarding() {
    let currentSlide = 0;
    const slidesContainer = document.getElementById('onboarding-slides-container');
    const dotsContainer = document.getElementById('onboarding-dots-container');
    const nextBtn = document.getElementById('onboarding-next-btn');
    const totalSlides = 3;

    for(let i=0; i < totalSlides; i++) {
        dotsContainer.innerHTML += `<div class="onboarding-dot ${i === 0 ? 'active' : ''}" data-slide="${i}"></div>`;
    }
    const dots = dotsContainer.querySelectorAll('.onboarding-dot');

    function updateOnboardingUI() {
        slidesContainer.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
        if (currentSlide === totalSlides - 1) {
            nextBtn.textContent = 'Get Started';
        } else {
            nextBtn.textContent = 'Next';
        }
    }

    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateOnboardingUI();
        } else {
            try {
                localStorage.setItem('onboardingComplete', 'true');
            } catch(e) { console.error("Could not set localStorage.") }
            goToPage('page-home');
        }
    });
}

// --- APP INITIALIZATION ---
function initApp() { 
    let onboardingComplete = false;
    try {
        onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
    } catch (e) {
        console.error("Could not access localStorage. Defaulting to onboarding.", e);
    }

    if (onboardingComplete) {
        goToPage('page-home');
    } else {
        initOnboarding();
        goToPage('page-onboarding');
    }
}

// Add main event listeners
function handleNavItemClick(item) {
    const target = item?.dataset?.target;
    if (!target) return;

    if (target === 'page-booking-flow') {
        launchBookingFlow('bottom-nav');
    } else {
        goToPage(target);
    }
}

document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => handleNavItemClick(item)));
document.body.addEventListener('click', e => {
     const backBtn = e.target.closest('.back-btn');
     const profileLink = e.target.closest('.profile-link');
     if (backBtn) {
         goToPage(backBtn.dataset.target);
     } else if(profileLink && profileLink.dataset.target) {
         e.preventDefault();
         goToPage(profileLink.dataset.target);
     }
});
document.getElementById('cta-book-walk').addEventListener('click', () => launchBookingFlow('home-cta'));
document.getElementById('cta-recurring-walk').addEventListener('click', () => goToPage('page-recurring-walks'));
document.getElementById('btn-add-dog').addEventListener('click', () => goToPage('page-dog-form'));

// Start the app
initApp();
    });
