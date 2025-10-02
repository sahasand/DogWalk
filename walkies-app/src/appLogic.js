let initialized = false;

export function initializeApp() {
    if (initialized) {
        return;
    }
    initialized = true;
// --- MOCK DATA ---
let dogData = [
    { id: 1, name: 'Buddy', avatar: '🐶', breed: 'Golden Retriever', age: 4, notes: 'Loves fetch, avoids loud noises.', vet: 'Parkside Vet Clinic', allergies: 'None', likes: 'Squeaky toys', dislikes: 'Skateboards' },
    { id: 2, name: 'Lucy', avatar: '🐩', breed: 'Poodle', age: 7, notes: 'A bit shy at first. Prefers quiet streets.', vet: 'Uptown Animals', allergies: 'Chicken', likes: 'Belly rubs', dislikes: 'Loud trucks' },
    { id: 3, name: 'Max', avatar: '🐕', breed: 'German Shepherd', age: 2, notes: 'Very energetic! Needs a long run.', vet: 'Parkside Vet Clinic', allergies: 'None', likes: 'Frisbees', dislikes: 'Mail carriers' },
];
const walkerData = [
    { id: 1, name: 'Alex Ray', avatar: 'https://placehold.co/100x100/0F766E/0B1120?text=A', verified: true, rating: 4.9, reviews: 124, price: 25, bio: "Hi, I'm Alex! I've been a passionate dog lover my whole life and have 5+ years of professional walking experience. I'm certified in Pet First Aid and can't wait to meet your furry friend!", badges: ["Pet CPR Certified", "5+ Years Exp."], favorite: true },
    { id: 2, name: 'Jordan Lee', avatar: 'https://placehold.co/100x100/14B8A6/0B1120?text=J', verified: true, rating: 4.8, reviews: 98, price: 24, bio: "Jordan is a marathon runner who loves taking high-energy dogs on long adventures. If your pup needs to burn off some steam, I'm your walker.", badges: ["Great with Large Dogs"], favorite: false },
    { id: 3, name: 'Casey Smith', avatar: 'https://placehold.co/100x100/0E7490/0B1120?text=C', verified: false, rating: 4.7, reviews: 75, price: 22, bio: "As a veterinary student, I have a deep understanding of animal care and behavior. I'm especially good with shy or anxious dogs.", badges: ["Experience with Puppies"], favorite: true },
];
let walkHistoryData = [
    { id: 99, date: '2025-09-16', time: '16:00', duration: 30, walker: walkerData[1], dogs: [dogData[0]], price: 25.00, status: 'In Progress' },
    { id: 1, date: '2025-09-11', walker: walkerData[1], dogs: [dogData[0]], price: 25.00, status: 'Completed', photos: ['https://placehold.co/300x200/0B1120/1DD3B0?text=Buddy+Playing', 'https://placehold.co/300x200/0F766E/0B1120?text=Happy+Pup'], activity: { pee: true, poo: true, water: true }, note: "Buddy had a great time at the park. Full of energy today!" },
    { id: 2, date: '2025-09-09', walker: walkerData[0], dogs: [dogData[0], dogData[1]], price: 40.00, status: 'Completed', photos: [], activity: { pee: true, poo: false, water: true }, note: "Lucy was a little shy but warmed up. Buddy was great as always." },
    { id: 3, date: '2025-09-05', walker: walkerData[2], dogs: [dogData[2]], price: 22.00, status: 'Completed', photos: ['https://placehold.co/300x200/0E7490/0B1120?text=Max+Running'], activity: { pee: true, poo: true, water: false }, note: "Max loved the long run by the lake!" },
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
    cards: [
        {
            id: 1,
            brand: 'Visa',
            last4: '4242',
            expiry: '12/26',
            name: 'Alex Morgan',
            billingAddress: '123 Bark Ave, Seattle, WA 98101',
            isDefault: true
        }
    ],
    transactions: [
        { date: '2025-09-11', desc: 'Walk with Jordan L.', amount: 25.00 },
        { date: '2025-09-09', desc: 'Walk with Alex R.', amount: 40.00 }
    ]
};

const userProfile = {
    name: 'Alex Morgan',
    email: 'alex.morgan@email.com',
    phone: '555-123-4567',
    address: '123 Bark Ave, Seattle, WA',
    bio: 'Dog parent to Buddy, Lucy, and Max. Always looking for new adventures for the pack!',
    emergencyContact: '',
    preferredWalkTime: 'Evenings',
    avatar: 'https://placehold.co/160x160/0B1120/1DD3B0?text=A'
};

const PROFILE_COMPLETION_FIELDS = [
    { key: 'email', label: 'Add your email address' },
    { key: 'phone', label: 'Add a phone number' },
    { key: 'address', label: 'Add your home address' },
    { key: 'bio', label: 'Tell walkers about your dogs' },
    { key: 'emergencyContact', label: 'Add an emergency contact' },
    { key: 'preferredWalkTime', label: 'Share your preferred walk time' }
];

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
                    <label class="checkable-card"><input type="radio" name="service" value="30" data-price="25" checked><div class="card-content glass-card p-4"><div class="text-2xl font-bold text-white">30 min</div><div class="text-lg text-soft">$25</div></div></label>
                    <label class="checkable-card"><input type="radio" name="service" value="60" data-price="40"><div class="card-content glass-card p-4"><div class="text-2xl font-bold text-white">60 min</div><div class="text-lg text-soft">$40</div></div></label>
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
                    <button type="button" class="chip active flex-1 btn btn-secondary" data-filter="nearest" aria-pressed="true">Nearest</button>
                    <button type="button" class="chip flex-1 btn btn-secondary" data-filter="favorites" aria-pressed="false">Favorites ★</button>
                    <button type="button" class="chip flex-1 btn btn-secondary" data-filter="price" aria-pressed="false">Price</button>
                    <button type="button" class="chip flex-1 btn btn-secondary" data-filter="top-rated" aria-pressed="false">Top Rated</button>
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
                    <div id="summary-details" class="divide-y divide-[var(--surface-border)]"></div>
                </div>
                <div class="glass-card p-5 space-y-3">
                    <h2 class="text-lg font-semibold">Price Summary</h2>
                    <div id="price-details" class="divide-y divide-[var(--surface-border)]"></div>
                    <div class="flex justify-between items-center font-bold text-lg border-t border-[var(--surface-border)] pt-3 mt-3">
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

    pages.forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        const isFullScreenPage = ['page-booking-flow', 'page-live-tracking', 'page-chat'].includes(pageId);

        if (document.querySelector('.bottom-nav')) {
            document.querySelector('.bottom-nav').style.display = isFullScreenPage ? 'none' : 'flex';
        }
    }

    navItems.forEach(item => item.classList.toggle('active', item.dataset.target === pageId));

    appState.currentPage = pageId;
    if(mainContent) mainContent.scrollTop = 0;

    switch (pageId) {
        case 'page-home': renderDashboard(); break;
        case 'page-profile': renderProfilePage(); break;
        case 'page-walk-summary': if (context?.walkId) renderWalkSummary(context.walkId, context?.backTarget); break;
        case 'page-dogs': renderDogsPage(); break;
        case 'page-dog-form': renderDogForm(context?.dogId); break;
        case 'page-inbox': renderInboxPage(); break;
        case 'page-chat': if (context?.walkerId) renderChatPage(context.walkerId); break;
        case 'page-walker-profile': if (context?.walkerId) renderWalkerProfile(context.walkerId, context.backTarget); break;
        case 'page-live-tracking': if (context?.walkId) renderLiveTracking(context.walkId); break;
        case 'page-recurring-walks': renderRecurringWalksPage(); break;
        case 'page-walk-history': renderWalkHistoryPage(); break;
        case 'page-payments': renderPaymentsPage(); break;
        default: break;
        case 'page-edit-profile': renderEditProfilePage(); break;
        case 'page-help-support': renderHelpSupportPage(); break;
    }
};

function calculateProfileCompletion(profile) {
    const total = PROFILE_COMPLETION_FIELDS.length;
    const filled = PROFILE_COMPLETION_FIELDS.reduce((count, field) => {
        const value = profile[field.key];
        return count + (typeof value === 'string' && value.trim() ? 1 : 0);
    }, 0);
    const percentage = total ? Math.round((filled / total) * 100) : 100;
    const missing = PROFILE_COMPLETION_FIELDS.filter(field => {
        const value = profile[field.key];
        return !(typeof value === 'string' && value.trim());
    }).map(field => field.label);
    return { percentage, filled, total, missing };
}

function showToast(message) {
    if (!message) return;
    const existingToast = document.querySelector('.app-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'app-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 2600);
}

function showLogoutModal() {
    vibrate(20);
    if (document.getElementById('logoutModal')) return;
    const modal = document.createElement('div');
    modal.id = 'logoutModal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content glass-card space-y-4">
            <h2 class="text-2xl font-bold text-white">Log out?</h2>
            <p class="text-sm text-soft">We'll keep your preferences saved so you can jump back in anytime.</p>
            <div class="grid grid-cols-2 gap-3">
                <button type="button" class="btn btn-secondary" id="cancel-logout">Stay Logged In</button>
                <button type="button" class="btn btn-primary" id="confirm-logout">Log Out</button>
            </div>
        </div>`;
    document.body.appendChild(modal);

    modal.addEventListener('click', e => {
        if (e.target === modal) modal.remove();
    });
    modal.querySelector('#cancel-logout').addEventListener('click', () => modal.remove());
    modal.querySelector('#confirm-logout').addEventListener('click', () => {
        modal.remove();
        showToast('You have been logged out');
        goToPage('page-home');
    });
}

function renderProfilePage() {
    const container = document.getElementById('profile-page-content');
    if (!container) return;

    const { percentage, missing } = calculateProfileCompletion(userProfile);
    const safePercentage = Math.min(100, Math.max(0, percentage));
    const completionCopy = missing.length ? 'Complete a few more details to help walkers know your pups better.' : 'Amazing! Walkers have everything they need.';
    const detailRows = [
        { label: 'Email', value: userProfile.email, placeholder: 'Add your email address' },
        { label: 'Phone', value: userProfile.phone, placeholder: 'Add a phone number' },
        { label: 'Home Address', value: userProfile.address, placeholder: 'Add your home address' },
        { label: 'Preferred Walk Time', value: userProfile.preferredWalkTime, placeholder: 'Let walkers know your ideal time' },
        { label: 'Emergency Contact', value: userProfile.emergencyContact, placeholder: 'Add an emergency contact' }
    ];

    container.innerHTML = `
        <div class="flex flex-col items-center text-center">
            <img src="${userProfile.avatar}" alt="${userProfile.name}" class="w-24 h-24 avatar-frame object-cover">
            <h2 class="text-2xl font-bold mt-4 text-white">${userProfile.name || 'Your Name'}</h2>
            <p class="text-soft text-sm">${userProfile.email || 'Add your email so walkers can reach you'}</p>
        </div>

        <div class="glass-card p-5 space-y-4">
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="font-semibold text-white">Profile completion</h3>
                    <p class="text-xs text-soft">${completionCopy}</p>
                </div>
                <span class="text-lg font-semibold text-white">${safePercentage}%</span>
            </div>
            <div class="profile-progress" role="progressbar" aria-valuenow="${safePercentage}" aria-valuemin="0" aria-valuemax="100">
                <div class="profile-progress-fill" style="width: ${safePercentage}%;"></div>
            </div>
            ${missing.length ? `<ul class="list-disc profile-task-list pl-5 space-y-1 text-sm text-soft">${missing.map(task => `<li>${task}</li>`).join('')}</ul>` : '<p class="text-sm text-soft">All set! Your profile looks great.</p>'}
        </div>

        <div class="glass-card p-4 divide-y divide-[var(--surface-border)]">
            <a href="#" class="profile-link py-3 flex justify-between items-center" data-target="page-edit-profile"><span>Edit Profile</span><span>›</span></a>
            <a href="#" class="profile-link py-3 flex justify-between items-center" data-target="page-payments"><span>Payment Methods</span><span>›</span></a>
            <a href="#" class="profile-link py-3 flex justify-between items-center" data-target="page-help-support"><span>Help &amp; Support</span><span>›</span></a>
        </div>

        <div class="glass-card p-5 space-y-3">
            <h3 class="font-semibold text-white">Account details</h3>
            <p class="text-sm text-soft">Keep this info current so walkers arrive prepared.</p>
            <div class="divide-y divide-[var(--surface-border)]">
                ${detailRows.map(row => {
                    const value = row.value && row.value.trim();
                    return `<div class="py-3 flex justify-between items-start gap-4">
                        <span class="text-sm text-soft">${row.label}</span>
                        <span class="text-sm ${value ? 'text-white font-medium' : 'italic text-soft'} text-right">${value || row.placeholder}</span>
                    </div>`;
                }).join('')}
            </div>
        </div>

        <div class="glass-card p-5 space-y-3">
            <h3 class="font-semibold text-white">About your pack</h3>
            <p class="text-sm text-soft">${userProfile.bio ? userProfile.bio : 'Add a short bio so walkers know what makes your pups special.'}</p>
        </div>

        <button id="btn-logout" class="btn btn-secondary w-full">Log Out</button>
    `;

    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', e => {
            e.preventDefault();
            showLogoutModal();
        });
    }
}

function renderEditProfilePage() {
    const container = document.getElementById('page-edit-profile');
    if (!container) return;

    container.innerHTML = `
        <div class="page-header"><button class="back-btn" data-target="page-profile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><h1>Edit Profile</h1></div>
        <form id="edit-profile-form" class="space-y-5">
            <div class="glass-card p-5 space-y-4">
                <div>
                    <label class="text-sm font-semibold block mb-2">Full name</label>
                    <div class="input-group"><input type="text" name="name" class="input-field" value="${userProfile.name || ''}" placeholder="Your full name"></div>
                </div>
                <div>
                    <label class="text-sm font-semibold block mb-2">Email</label>
                    <div class="input-group"><input type="email" name="email" class="input-field" value="${userProfile.email || ''}" placeholder="you@example.com"></div>
                </div>
                <div>
                    <label class="text-sm font-semibold block mb-2">Phone</label>
                    <div class="input-group"><input type="tel" name="phone" class="input-field" value="${userProfile.phone || ''}" placeholder="(555) 123-4567"></div>
                </div>
            </div>
            <div class="glass-card p-5 space-y-4">
                <div>
                    <label class="text-sm font-semibold block mb-2">Home address</label>
                    <div class="input-group"><input type="text" name="address" class="input-field" value="${userProfile.address || ''}" placeholder="Street, City, State"></div>
                </div>
                <div>
                    <label class="text-sm font-semibold block mb-2">Preferred walk time</label>
                    <div class="input-group"><input type="text" name="preferredWalkTime" class="input-field" value="${userProfile.preferredWalkTime || ''}" placeholder="Mornings, evenings, etc."></div>
                </div>
                <div>
                    <label class="text-sm font-semibold block mb-2">Emergency contact</label>
                    <div class="input-group"><input type="text" name="emergencyContact" class="input-field" value="${userProfile.emergencyContact || ''}" placeholder="Name &amp; phone number"></div>
                </div>
            </div>
            <div class="glass-card p-5 space-y-3">
                <label class="text-sm font-semibold block">About your pack</label>
                <div class="input-group"><textarea name="bio" class="input-field h-28 resize-none" placeholder="Share quirks, routines, or favorite treats.">${userProfile.bio || ''}</textarea></div>
            </div>
            <button type="submit" class="btn btn-primary w-full">Save changes</button>
        </form>
    `;

    const formEl = document.getElementById('edit-profile-form');
    formEl.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(formEl);
        userProfile.name = formData.get('name')?.trim() || '';
        userProfile.email = formData.get('email')?.trim() || '';
        userProfile.phone = formData.get('phone')?.trim() || '';
        userProfile.address = formData.get('address')?.trim() || '';
        userProfile.preferredWalkTime = formData.get('preferredWalkTime')?.trim() || '';
        userProfile.emergencyContact = formData.get('emergencyContact')?.trim() || '';
        userProfile.bio = formData.get('bio')?.trim() || '';
        showToast('Profile updated');
        goToPage('page-profile');
    });
}

function renderHelpSupportPage() {
    const container = document.getElementById('page-help-support');
    if (!container) return;

    container.innerHTML = `
        <div class="page-header"><button class="back-btn" data-target="page-profile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><h1>Help &amp; Support</h1></div>
        <div class="space-y-5">
            <div class="glass-card p-5 space-y-3">
                <h2 class="text-lg font-semibold text-white">We’re here for you</h2>
                <p class="text-sm text-soft">Browse quick answers or reach out to our support team 24/7.</p>
            </div>
            <div class="glass-card p-5 space-y-3">
                <h3 class="font-semibold text-white">Popular topics</h3>
                <ul class="list-disc profile-task-list pl-5 space-y-2 text-sm text-soft">
                    <li>Managing walkers and recurring schedules</li>
                    <li>Updating payment and billing details</li>
                    <li>Preparing your pup for their walk</li>
                </ul>
            </div>
            <div class="glass-card p-5 space-y-4">
                <h3 class="font-semibold text-white">Contact options</h3>
                <div class="space-y-3 text-sm text-soft">
                    <div class="flex items-start gap-3"><span class="text-lg">💬</span><div><p class="text-white font-medium">Live chat</p><p>Connect with a specialist in under 2 minutes.</p></div></div>
                    <div class="flex items-start gap-3"><span class="text-lg">📧</span><div><p class="text-white font-medium">Email</p><p>support@walkies.app</p></div></div>
                    <div class="flex items-start gap-3"><span class="text-lg">📞</span><div><p class="text-white font-medium">Phone</p><p>(800) 555-0199</p></div></div>
                </div>
                <button type="button" class="btn btn-secondary w-full" id="start-support-chat">Message support</button>
            </div>
        </div>
    `;

    const chatBtn = document.getElementById('start-support-chat');
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            showToast('Support will be in touch shortly.');
        });
    }
}

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
            const statusEl = document.getElementById('upcoming-walk-status');
            const ctaEl = document.getElementById('upcoming-walk-cta');
            const detailsBtn = document.getElementById('upcoming-walk-details');

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

            if (statusEl) {
                statusEl.textContent = upcomingWalk.status === 'In Progress' ? 'In progress' : 'Next walk';
            }

            if (durationEl) durationEl.textContent = upcomingWalk.duration ? `${upcomingWalk.duration} min` : 'Walk scheduled';
            if (dogsEl) {
                const dogLabels = (upcomingWalk.dogs || []).map(dog => dog.avatar || dog.name).join(' ');
                dogsEl.textContent = dogLabels || '🐾';
            }

            upcomingCard.onclick = () => goToPage('page-live-tracking', { walkId: upcomingWalk.id });
            upcomingCard.style.cursor = 'pointer';

            if (ctaEl) {
                ctaEl.textContent = upcomingWalk.status === 'In Progress' ? 'Join live walk' : 'Preview route';
                ctaEl.onclick = event => {
                    event.stopPropagation();
                    goToPage('page-live-tracking', { walkId: upcomingWalk.id });
                };
            }

            if (detailsBtn) {
                const walkerId = upcomingWalk.walker?.id;
                detailsBtn.textContent = walkerId ? 'About your walker' : 'Walk details';
                detailsBtn.onclick = event => {
                    event.stopPropagation();
                    if (walkerId) {
                        goToPage('page-walker-profile', { walkerId, backTarget: 'page-home' });
                    } else {
                        goToPage('page-live-tracking', { walkId: upcomingWalk.id });
                    }
                };
            }

            upcomingCard.setAttribute('aria-live', upcomingWalk.status === 'In Progress' ? 'assertive' : 'polite');
        } else {
            upcomingSection.style.display = 'none';
            upcomingCard.onclick = null;
            upcomingCard.style.cursor = 'default';
            delete upcomingCard.dataset.walkId;

            const ctaEl = document.getElementById('upcoming-walk-cta');
            if (ctaEl) ctaEl.onclick = null;

            const detailsBtn = document.getElementById('upcoming-walk-details');
            if (detailsBtn) detailsBtn.onclick = null;

            upcomingCard.removeAttribute('aria-live');
        }
    }

    const completedWalks = walkHistoryData
        .filter(w => w.status === 'Completed')
        .sort((a, b) => new Date(b.date + 'T00:00:00') - new Date(a.date + 'T00:00:00'));

    const metricsContainer = document.getElementById('home-metrics');
    if (metricsContainer) {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        const walksThisWeek = walkHistoryData.filter(walk => {
            if (!walk.date) return false;
            const walkDate = new Date(`${walk.date}T00:00:00`);
            if (Number.isNaN(walkDate.valueOf())) return false;
            return walkDate >= startOfWeek && walkDate <= endOfWeek;
        }).length;

        const scheduledCount = walkHistoryData.filter(walk => ['In Progress', 'Upcoming'].includes(walk.status)).length;
        const totalMinutes = walkHistoryData.reduce((sum, walk) => sum + (walk.duration || 30), 0);
        const highlightedWalk = walkHistoryData.find(walk => ['In Progress', 'Upcoming'].includes(walk.status));
        const heroWalkerRating = highlightedWalk?.walker?.rating;

        metricsContainer.innerHTML = `
            <div class="metric-card">
                <span class="metric-label">Walks this week</span>
                <span class="metric-value">${walksThisWeek}</span>
                <span class="metric-trend">${scheduledCount} scheduled</span>
            </div>
            <div class="metric-card">
                <span class="metric-label">Active pups</span>
                <span class="metric-value">${dogData.length}</span>
                <span class="metric-trend">Buddy pack ready</span>
            </div>
            <div class="metric-card">
                <span class="metric-label">Minutes booked</span>
                <span class="metric-value">${totalMinutes}</span>
                <span class="metric-trend">${heroWalkerRating ? `★ ${heroWalkerRating.toFixed(1)} walker` : 'Keep exploring'}</span>
            </div>
        `;
    }

    const upcomingList = document.getElementById('upcoming-walk-list');
    if (upcomingList) {
        const heroWalkId = (upcomingCard && upcomingCard.dataset.walkId) ? parseInt(upcomingCard.dataset.walkId, 10) : null;
        const otherUpcoming = walkHistoryData
            .filter(walk => ['In Progress', 'Upcoming'].includes(walk.status) && walk.id !== heroWalkId)
            .sort((a, b) => {
                const dateA = new Date(`${a.date || ''}T${a.time || '00:00'}`);
                const dateB = new Date(`${b.date || ''}T${b.time || '00:00'}`);
                if (Number.isNaN(dateA.valueOf()) || Number.isNaN(dateB.valueOf())) return 0;
                return dateA - dateB;
            });

        if (otherUpcoming.length) {
            upcomingList.innerHTML = otherUpcoming.slice(0, 3).map(walk => {
                const dateObj = walk.date ? new Date(`${walk.date}T${walk.time || '00:00'}`) : null;
                const formattedDate = dateObj && !Number.isNaN(dateObj.valueOf())
                    ? `${dateObj.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}${walk.time ? ` • ${dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}` : ''}`
                    : 'Scheduled soon';
                const durationLabel = walk.duration ? `${walk.duration} min` : '30 min';
                const dogs = (walk.dogs || []).map(d => d.name || d.avatar).join(', ');
                return `
                    <button type="button" class="glass-card upcoming-list-item" data-walk-id="${walk.id}" aria-label="View details for walk with ${walk.walker?.name || 'your walker'}">
                        <div class="upcoming-item-left">
                            <img src="${walk.walker?.avatar || 'https://placehold.co/64x64/0F172A/F8FAFC?text=W'}" alt="${walk.walker?.name || 'Walker'}" class="upcoming-avatar">
                            <div>
                                <p class="upcoming-title">Walk with ${walk.walker?.name || 'your walker'}</p>
                                <p class="upcoming-meta">${formattedDate}</p>
                                <p class="upcoming-dogs">🐾 ${dogs || 'Buddy'}</p>
                            </div>
                        </div>
                        <div class="upcoming-item-right">
                            <span class="badge-muted">${durationLabel}</span>
                            <span class="status-pill ${walk.status === 'In Progress' ? 'status-live' : ''}">${walk.status}</span>
                        </div>
                    </button>
                `;
            }).join('');

            upcomingList.querySelectorAll('.upcoming-list-item').forEach(item => {
                item.addEventListener('click', event => {
                    const walkId = parseInt(event.currentTarget.dataset.walkId, 10);
                    if (!Number.isNaN(walkId)) {
                        goToPage('page-live-tracking', { walkId });
                    }
                });
            });
        } else {
            upcomingList.innerHTML = `<div class="empty-state-card">No other walks planned. Schedule one to keep the adventures going!</div>`;
        }
    }

    const recentActivityList = document.getElementById('recent-activity-list');
    if (recentActivityList) {
        const recentWalks = completedWalks.slice(0, 2);
        recentActivityList.innerHTML = recentWalks.map(walk => {
            const walkDate = new Date(`${walk.date}T00:00:00`);
            const isValidDate = !Number.isNaN(walkDate.valueOf());
            const formattedDate = isValidDate ? walkDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : walk.date;
            const buttonLabel = `View walk summary for ${walk.walker.name} on ${formattedDate}`;
            return `
                <button type="button" class="glass-card recent-activity-item" data-walk-id="${walk.id}" aria-label="${buttonLabel}">
                    <div class="recent-activity-left">
                        <img src="${walk.walker.avatar}" class="recent-activity-avatar" alt="${walk.walker.name}">
                        <div>
                            <p class="recent-activity-title">Walk with ${walk.walker.name}</p>
                            <p class="recent-activity-meta">${formattedDate}</p>
                        </div>
                    </div>
                    <div class="recent-activity-right">
                        <span class="recent-activity-amount">$${walk.price.toFixed(2)}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                </button>`;
        }).join('');

        recentActivityList.querySelectorAll('.recent-activity-item').forEach(item => {
            item.addEventListener('click', event => {
                const walkId = parseInt(event.currentTarget.dataset.walkId, 10);
                if (!Number.isNaN(walkId)) {
                    goToPage('page-walk-summary', { walkId, backTarget: 'page-home' });
                }
            });
        });
    }

}

function renderWalkSummary(walkId, backTarget = 'page-home') {
    const walk = walkHistoryData.find(w => w.id === walkId);
    if (!walk) return;
    const container = document.getElementById('page-walk-summary');
    container.innerHTML = `
        <div class="page-header"><button class="back-btn" data-target="${backTarget || 'page-home'}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><h1>Walk Summary</h1></div>
        <div class="space-y-6">
            <div class="glass-card overflow-hidden"><img src="https://placehold.co/600x300/3d1c5a/E0E0E0?text=Walk+Route+Map" alt="Map of walk route"></div>
            <div class="glass-card p-4 flex items-center gap-4"><img src="${walk.walker.avatar}" class="w-16 h-16 avatar-frame object-cover"><div><p class="text-soft">Your walker was</p><p class="font-bold text-xl text-white">${walk.walker.name}</p></div></div>
            ${(walk.photos && walk.photos.length > 0) ? `<div class="glass-card p-4"><h3 class="font-semibold mb-3">Photo Gallery</h3><div class="grid grid-cols-3 gap-2">${walk.photos.map(p => `<img src="${p}" class="rounded-lg w-full h-24 object-cover">`).join('')}</div></div>` : ''}
            ${walk.activity ? `<div class="glass-card p-4"><h3 class="font-semibold mb-3">Activity Report</h3><div class="flex justify-around text-center">${['Pee', 'Poo', 'Water'].map(act => `<div><div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto ${walk.activity[act.toLowerCase()] ? 'bg-emerald-500/40 text-emerald-200' : 'bg-rose-500/35 text-rose-200'}">${walk.activity[act.toLowerCase()] ? '✓' : '✗'}</div><p class="text-xs mt-2 text-soft uppercase tracking-wide">${act}</p></div>`).join('')}</div></div>` : ''}
            <div class="glass-card p-4"><h3 class="font-semibold mb-2">Walker's Note</h3><p class="text-soft italic">"${walk.note}"</p></div>
        </div>`;
}

function renderWalkHistoryPage() {
    const container = document.getElementById('page-walk-history');
    if (!container) return;

    const completedWalks = walkHistoryData
        .filter(walk => walk.status === 'Completed')
        .sort((a, b) => {
            const aDate = new Date(`${a.date || ''}T${a.time || '00:00'}`);
            const bDate = new Date(`${b.date || ''}T${b.time || '00:00'}`);
            if (Number.isNaN(aDate.valueOf()) && Number.isNaN(bDate.valueOf())) return 0;
            if (Number.isNaN(aDate.valueOf())) return 1;
            if (Number.isNaN(bDate.valueOf())) return -1;
            return bDate - aDate;
        });

    const listMarkup = completedWalks.length
        ? completedWalks.map(walk => {
            const walkDate = new Date(`${walk.date || ''}T${walk.time || '00:00'}`);
            const hasValidDate = !Number.isNaN(walkDate.valueOf());
            const formattedDate = hasValidDate
                ? walkDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                : walk.date || 'Upcoming walk';
            const formattedTime = hasValidDate && walk.time ? ` • ${formatTimeDisplay(walk.time)}` : '';
            const walkerName = walk.walker?.name || 'Your walker';
            const dogsLabel = (walk.dogs || []).map(dog => dog.name).join(', ');
            return `
                <button type="button" class="glass-card walk-history-item" data-walk-id="${walk.id}" aria-label="View walk summary for ${walkerName} on ${formattedDate}">
                    <div class="flex items-center justify-between gap-4">
                        <div class="flex items-center gap-3">
                            <img src="${walk.walker?.avatar || 'https://placehold.co/64x64/0F172A/F8FAFC?text=W'}" alt="${walkerName}" class="recent-activity-avatar">
                            <div>
                                <p class="font-semibold text-white">Walk with ${walkerName}</p>
                                <p class="text-sm text-soft">${formattedDate}${formattedTime}${dogsLabel ? ` • ${dogsLabel}` : ''}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <span class="recent-activity-amount block">$${Number.isFinite(walk.price) ? walk.price.toFixed(2) : '—'}</span>
                            <span class="text-xs uppercase tracking-wide text-soft">${walk.status}</span>
                        </div>
                    </div>
                </button>`;
        }).join('')
        : `<div class="glass-card p-5 text-center space-y-2">
                <div class="text-3xl">🐾</div>
                <p class="font-semibold text-white">No completed walks yet</p>
                <p class="text-sm text-soft">Book a walk to start your pup's adventure log.</p>
            </div>`;

    container.innerHTML = `
        <div class="page-header">
            <button class="back-btn" data-target="page-home" aria-label="Back to Home">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <h1>Walk History</h1>
        </div>
        <div class="space-y-4">
            ${listMarkup}
        </div>
    `;

    container.querySelectorAll('.walk-history-item').forEach(item => {
        item.addEventListener('click', event => {
            const walkId = parseInt(event.currentTarget.dataset.walkId, 10);
            if (!Number.isNaN(walkId)) {
                goToPage('page-walk-summary', { walkId, backTarget: 'page-walk-history' });
            }
        });
    });
}

function renderDogsPage() {
     document.getElementById('dog-list-container').innerHTML = dogData.map(dog => `
        <div class="glass-card p-4 flex items-center gap-4">
            <span class="text-5xl">${dog.avatar}</span>
            <div class="flex-grow"><p class="font-bold text-lg text-white">${dog.name}</p><p class="text-sm text-soft">${dog.breed}, ${dog.age} years old</p></div>
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
             <img src="${walker.avatar}" class="w-14 h-14 avatar-frame object-cover">
             <div class="flex-grow">
                <div class="flex justify-between items-start">
                     <p class="font-bold text-lg">${walker.name}</p>
                     ${convo.unread ? `<span class="w-3 h-3 bg-teal-300 rounded-full mt-1"></span>` : ''}
                </div>
                <p class="text-sm text-soft truncate">${convo.lastMessage}</p>
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
            <div class="flex flex-col items-center"><img src="${walker.avatar}" class="w-28 h-28 avatar-frame object-cover border border-[var(--surface-border)]"><h2 class="text-2xl font-bold mt-4">${walker.name}</h2><p class="text-soft">★ ${walker.rating} (${walker.reviews} Reviews)</p></div>
            <div class="flex justify-center gap-2 flex-wrap">${walker.badges.map(b => `<span class="badge-muted">${b}</span>`).join('')}</div>
            <div class="glass-card p-5"><h3 class="font-semibold mb-2">About Me</h3><p class="text-soft">${walker.bio}</p></div>
            <div class="glass-card p-5"><h3 class="font-semibold mb-2">Reviews</h3><div class="space-y-3"><div class="flex gap-2 items-center text-soft"><p class="font-bold text-white">Anna K.</p><p>★★★★★</p></div><p class="text-sm italic text-soft">"Alex was amazing with my energetic puppy!"</p></div></div>
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
            <div class="glass-card non-hover p-4"><div class="flex items-center gap-4"><img src="${walk.walker.avatar}" class="w-12 h-12 avatar-frame object-cover"><p class="font-semibold">${walk.walker.name} is walking ${walk.dogs.map(d=>d.name).join(', ')}</p></div></div>
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
                <p class="text-sm text-soft">Create a schedule so your pups never miss their favorite stroll.</p>
            </div>
            <div id="recurring-plan-list" class="space-y-4"></div>
            <button class="btn btn-primary w-full" id="recurring-schedule-btn">Set Up New Schedule</button>
            <div id="recurring-plan-form-wrapper" class="scheduler-form hidden">
                <form id="recurring-plan-form" class="glass-card p-5 space-y-5" novalidate>
                    <div class="flex justify-between items-center">
                        <div>
                            <h2 class="text-lg font-semibold" id="recurring-form-title">Set Up New Schedule</h2>
                            <p class="text-sm text-soft" id="recurring-form-subtitle">Pick the routine that fits your pups best.</p>
                        </div>
                        <button type="button" class="icon-button" id="recurring-form-close" aria-label="Close schedule form">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <h3 class="text-sm font-semibold mb-2 text-white">Plan nickname <span class="text-soft">(optional)</span></h3>
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
                    <div class="text-sm text-soft">${option.price}</div>
                </div>
                <div class="checkmark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
            </label>
        `).join('');
    }

    function renderWalkerOptions(walkers, selectedId = null) {
        if (!walkerListEl) return;
        if (!walkers.length) {
            walkerListEl.innerHTML = '<p class="text-sm text-soft text-center">No walkers match your filters.</p>';
            return;
        }
        walkerListEl.innerHTML = walkers.map(walker => {
            const isSelected = walker.id === selectedId;
            return `
            <label class="walker-option glass-card p-4 flex items-center gap-3${isSelected ? ' selected' : ''}">
                <input type="radio" class="hidden" name="recurring-walker" value="${walker.id}" ${isSelected ? 'checked' : ''}>
                <img src="${walker.avatar}" alt="${walker.name}" class="w-12 h-12 avatar-frame object-cover">
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        <span class="font-semibold">${walker.name}</span>
                        ${walker.verified ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#5eead4" stroke="#0b1120" stroke-width="1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' : ''}
                    </div>
                    <p class="text-xs text-soft">★ ${walker.rating.toFixed(1)} • $${walker.price.toFixed(0)}</p>
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
                            <p class="text-sm text-soft">${subtitle}</p>
                        </div>
                        <span class="status-badge ${statusClass}">${statusLabel}</span>
                    </div>
                    <div class="text-sm text-soft space-y-1">
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

function detectCardBrand(cardNumber = '') {
    const digits = cardNumber.replace(/\D/g, '');
    if (/^4/.test(digits)) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard';
    if (/^3[47]/.test(digits)) return 'American Express';
    if (/^6(?:011|5)/.test(digits)) return 'Discover';
    return 'Card';
}

function sortPaymentCards() {
    if (!Array.isArray(paymentData.cards)) {
        paymentData.cards = [];
        return;
    }
    paymentData.cards.sort((a, b) => {
        if (a.isDefault === b.isDefault) return b.id - a.id;
        return a.isDefault ? -1 : 1;
    });
}

function setDefaultPaymentCard(cardId) {
    let updated = false;
    if (!Array.isArray(paymentData.cards)) {
        paymentData.cards = [];
        return updated;
    }
    paymentData.cards.forEach(card => {
        const isMatch = card.id === cardId;
        if (isMatch) updated = true;
        card.isDefault = isMatch;
    });
    if (updated) sortPaymentCards();
    return updated;
}

function createPaymentCard({ number, expiry, name, billingAddress, makeDefault }) {
    const digits = number.replace(/\D/g, '');
    if (!Array.isArray(paymentData.cards)) {
        paymentData.cards = [];
    }
    const card = {
        id: Date.now(),
        brand: detectCardBrand(digits),
        last4: digits.slice(-4),
        expiry,
        name,
        billingAddress,
        isDefault: Boolean(makeDefault)
    };

    if (card.isDefault || paymentData.cards.length === 0) {
        paymentData.cards.forEach(existing => { existing.isDefault = false; });
        card.isDefault = true;
    }

    paymentData.cards.push(card);
    sortPaymentCards();
    return card;
}

function formatMaskedCard(last4 = '') {
    return `**** **** **** ${last4}`.trim();
}

function renderPaymentsPage(noticeMessage = '') {
    const container = document.getElementById('page-payments');
    sortPaymentCards();
    const cards = paymentData.cards || [];
    const cardListHTML = cards.length
        ? cards.map(card => `
            <div class="glass-card p-5 space-y-4" data-card-id="${card.id}">
                <div class="flex items-start gap-4">
                    <div class="flex-1 space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="uppercase tracking-[0.2em] text-xs text-soft">${card.brand}</span>
                            ${card.isDefault ? '<span class="badge-muted">Default</span>' : `<button type="button" class="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 hover:border-[var(--surface-border-strong)] transition" data-make-default="${card.id}">Make Default</button>`}
                        </div>
                        <p class="text-2xl font-semibold text-white">${formatMaskedCard(card.last4)}</p>
                        <div class="text-sm text-soft flex items-center gap-2">
                            <span>Expiry</span>
                            <span class="text-white font-medium">${card.expiry}</span>
                        </div>
                    </div>
                </div>
                <div class="space-y-2 text-sm text-soft">
                    <div>
                        <span class="block text-[0.65rem] uppercase tracking-[0.3em] text-white/60">Cardholder</span>
                        <p class="text-white font-medium">${card.name}</p>
                    </div>
                    <div>
                        <span class="block text-[0.65rem] uppercase tracking-[0.3em] text-white/60">Billing Address</span>
                        <p>${card.billingAddress}</p>
                    </div>
                </div>
            </div>
        `).join('')
        : '<div class="glass-card p-5 text-sm text-soft text-center">No payment methods yet. Add a card to get started.</div>';

    container.innerHTML = `
        <div class="page-header">
            <button class="back-btn" data-target="page-profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <h1>Payments</h1>
        </div>
        <div class="space-y-6">
            <div id="payment-notice" class="hidden glass-card p-4 text-sm bg-[rgba(94,234,212,0.12)] border border-[var(--surface-border-strong)] text-white/80"></div>
            <div id="card-list" class="space-y-4">
                ${cardListHTML}
            </div>
            <button class="btn btn-secondary w-full" id="show-add-card">Add New Card</button>
            <div class="glass-card p-5 space-y-4 hidden" id="add-card-panel">
                <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-lg">Add new payment method</h3>
                    <button type="button" class="icon-button" id="close-add-card" aria-label="Close add card form">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>
                <form id="add-card-form" class="space-y-4">
                    <div class="space-y-2">
                        <label for="card-number" class="block text-sm font-medium text-white/80">Card number</label>
                        <div class="input-group">
                            <input type="text" id="card-number" class="input-field" inputmode="numeric" autocomplete="cc-number" placeholder="1234 5678 9012 3456" required>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-2">
                            <label for="card-expiry" class="block text-sm font-medium text-white/80">Expiry</label>
                            <div class="input-group">
                                <input type="text" id="card-expiry" class="input-field" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/YY" required>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label for="card-cvv" class="block text-sm font-medium text-white/80">CVV</label>
                            <div class="input-group">
                                <input type="text" id="card-cvv" class="input-field" inputmode="numeric" autocomplete="cc-csc" placeholder="123" required>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label for="card-name" class="block text-sm font-medium text-white/80">Cardholder name</label>
                        <div class="input-group">
                            <input type="text" id="card-name" class="input-field" autocomplete="cc-name" placeholder="Alex Morgan" required>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label for="billing-address" class="block text-sm font-medium text-white/80">Billing address</label>
                        <div class="input-group">
                            <input type="text" id="billing-address" class="input-field" autocomplete="cc-address" placeholder="123 Bark Ave, Seattle, WA" required>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-2">
                            <label for="billing-city" class="block text-sm font-medium text-white/80">City</label>
                            <div class="input-group">
                                <input type="text" id="billing-city" class="input-field" autocomplete="address-level2" placeholder="Seattle" required>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="space-y-2">
                                <label for="billing-state" class="block text-sm font-medium text-white/80">State</label>
                                <div class="input-group">
                                    <input type="text" id="billing-state" class="input-field" autocomplete="address-level1" placeholder="WA" maxlength="2" required>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label for="billing-zip" class="block text-sm font-medium text-white/80">ZIP</label>
                                <div class="input-group">
                                    <input type="text" id="billing-zip" class="input-field" inputmode="numeric" autocomplete="postal-code" placeholder="98101" required>
                                </div>
                            </div>
                        </div>
                    </div>
                    <label class="flex items-center gap-3 text-sm text-soft">
                        <input type="checkbox" id="make-default-card" class="h-4 w-4 rounded border border-[var(--surface-border)] bg-transparent">
                        Set as default payment method
                    </label>
                    <p id="add-card-feedback" class="hidden text-sm text-[#fca5a5]" role="alert"></p>
                    <div class="flex gap-3">
                        <button type="submit" class="btn btn-primary flex-1">Save Card</button>
                        <button type="button" class="btn btn-secondary flex-1" id="cancel-add-card">Cancel</button>
                    </div>
                </form>
            </div>
            <div class="glass-card p-5">
                <h3 class="font-semibold mb-3">Transaction History</h3>
                <div class="space-y-2">
                    ${paymentData.transactions.length ? paymentData.transactions.map(t => `<div class="flex justify-between text-sm text-soft"><p>${t.desc}</p><p>$${t.amount.toFixed(2)}</p></div>`).join('') : '<p class="text-sm text-soft">No transactions yet.</p>'}
                </div>
            </div>
        </div>
    `;

    const showAddCardBtn = container.querySelector('#show-add-card');
    const addCardPanel = container.querySelector('#add-card-panel');
    const addCardForm = container.querySelector('#add-card-form');
    const cancelAddCardBtn = container.querySelector('#cancel-add-card');
    const closeAddCardBtn = container.querySelector('#close-add-card');
    const cardNumberInput = container.querySelector('#card-number');
    const cardExpiryInput = container.querySelector('#card-expiry');
    const cardCvvInput = container.querySelector('#card-cvv');
    const feedbackEl = container.querySelector('#add-card-feedback');
    const noticeEl = container.querySelector('#payment-notice');

    if (noticeEl) {
        noticeEl.textContent = noticeMessage;
        noticeEl.classList.toggle('hidden', !noticeMessage);
    }

    const hideForm = () => {
        addCardForm?.reset();
        addCardPanel?.classList.add('hidden');
        showAddCardBtn?.classList.remove('hidden');
        feedbackEl?.classList.add('hidden');
    };

    showAddCardBtn?.addEventListener('click', () => {
        addCardPanel.classList.remove('hidden');
        showAddCardBtn.classList.add('hidden');
        requestAnimationFrame(() => cardNumberInput?.focus());
    });

    cancelAddCardBtn?.addEventListener('click', hideForm);
    closeAddCardBtn?.addEventListener('click', hideForm);

    const formatCardNumberInput = event => {
        const digits = event.target.value.replace(/\D/g, '').slice(0, 19);
        event.target.value = digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    };

    const formatExpiryInput = event => {
        let value = event.target.value.replace(/\D/g, '').slice(0, 4);
        if (value.length >= 3) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        }
        event.target.value = value;
    };

    const formatCvvInput = event => {
        event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4);
    };

    cardNumberInput?.addEventListener('input', formatCardNumberInput);
    cardExpiryInput?.addEventListener('input', formatExpiryInput);
    cardCvvInput?.addEventListener('input', formatCvvInput);

    addCardForm?.addEventListener('submit', e => {
        e.preventDefault();
        feedbackEl?.classList.add('hidden');
        const number = cardNumberInput.value.replace(/\s+/g, '');
        const expiry = cardExpiryInput.value.trim();
        const cvv = cardCvvInput.value.trim();
        const name = container.querySelector('#card-name').value.trim();
        const addressLine = container.querySelector('#billing-address').value.trim();
        const city = container.querySelector('#billing-city').value.trim();
        const state = container.querySelector('#billing-state').value.trim();
        const zip = container.querySelector('#billing-zip').value.trim();
        const makeDefault = container.querySelector('#make-default-card').checked;

        const showError = message => {
            if (!feedbackEl) return;
            feedbackEl.textContent = message;
            feedbackEl.classList.remove('hidden');
        };

        if (number.length < 13 || number.length > 19) return showError('Enter a valid card number.');
        if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry)) return showError('Enter expiry as MM/YY.');
        if (cvv.length < 3 || cvv.length > 4) return showError('Enter a valid CVV.');
        if (!name) return showError('Enter the cardholder name.');
        if (!addressLine || !city || !state || !zip) return showError('Complete the billing address.');

        const stateCode = state.replace(/[^a-z]/gi, '').slice(0, 2).toUpperCase();
        if (stateCode.length !== 2) return showError('Use a 2-letter state code.');

        const postalCode = zip.replace(/\s+/g, '');
        if (postalCode.length < 3) return showError('Enter a valid ZIP/postal code.');

        const billingAddress = `${addressLine}, ${city}, ${stateCode} ${postalCode}`;
        createPaymentCard({ number, expiry, name, billingAddress, makeDefault });
        hideForm();
        renderPaymentsPage('New card saved.');
    });

    container.querySelectorAll('[data-make-default]').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.currentTarget.dataset.makeDefault, 10);
            if (setDefaultPaymentCard(id)) {
                renderPaymentsPage('Default payment method updated.');
            }
        });
    });
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
        const modalHTML = `<div class="modal-overlay active" id="successModal"><div class="modal-content glass-card"><svg class="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg><h2 class="text-2xl font-bold mb-2 text-white">Booking Confirmed!</h2><p class="text-soft">Your dog's adventure is scheduled.</p><button id="modal-back-to-home" class="btn btn-primary mt-4 w-full">Back to Home</button></div></div>`;
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
        walkerList.innerHTML = Array(3).fill('').map(() => `<div class="glass-card p-4 flex gap-4 items-center animate-pulse"><div class="w-16 h-16 rounded-full bg-[var(--surface-border)]"></div><div class="flex-1 space-y-2"><div class="h-4 w-3/4 rounded bg-[var(--surface-border)]"></div><div class="h-3 w-1/2 rounded bg-[var(--surface-border)]"></div></div></div>`).join('');

        setTimeout(() => {
            if (walkers.length === 0) {
                 walkerList.innerHTML = `<p class="text-center text-soft">No walkers match your criteria.</p>`;
                 return;
            }
            walkerList.innerHTML = walkers.map(w => `<div class="walker-card-container"><input type="radio" name="walker" value="${w.id}" class="hidden" id="walker-radio-${w.id}"><label for="walker-radio-${w.id}" class="glass-card p-4 flex gap-4 items-start cursor-pointer"><img src="${w.avatar}" alt="${w.name}" class="w-16 h-16 avatar-frame view-profile-btn object-cover" data-walker-id="${w.id}"><div class="flex-1"> <div class="flex items-center gap-2"><h3 class="font-bold text-lg text-white">${w.name}</h3>${w.verified ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#5eead4" stroke="#0b1120" stroke-width="1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`:''}</div><p class="text-sm text-soft">★ ${w.rating.toFixed(1)} (${w.reviews} reviews)</p></div><div class="ml-auto flex flex-col items-end justify-between gap-3 self-stretch"><p class="text-xl font-bold text-white">$${w.price.toFixed(2)}</p><button type="button" class="favorite-btn ${w.favorite ? 'favorited' : ''}" data-walker-id="${w.id}" aria-pressed="${w.favorite}" aria-label="Toggle favorite for ${w.name}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button></div></label></div>`).join('');
            walkerList.querySelectorAll('input[name="walker"]').forEach(radio => radio.addEventListener('change', e => {
                bookingState.selectedWalker = walkerData.find(w => w.id === parseInt(e.target.value));
                document.getElementById('toScreen3Btn').disabled = false;
                walkerList.querySelectorAll('.glass-card').forEach(c => c.style.borderColor = 'var(--surface-border)');
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
                e.preventDefault();
                e.stopPropagation();
                const buttonEl = e.currentTarget;
                const walkerId = parseInt(buttonEl.dataset.walkerId);
                const walker = walkerData.find(w => w.id === walkerId);
                walker.favorite = !walker.favorite;
                buttonEl.classList.toggle('favorited');
                buttonEl.setAttribute('aria-pressed', String(walker.favorite));
            }));
        }, 500);
    }

    renderWalkerList(walkerData);
    document.getElementById('filterChips').addEventListener('click', e => {
        const button = e.target.closest('button');
        if (button) {
            document.querySelectorAll('#filterChips .chip').forEach(c => {
                c.classList.remove('active');
                c.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
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

const notificationsButton = document.getElementById('home-notifications');
if (notificationsButton) {
    notificationsButton.addEventListener('click', () => showToast('You\'re all caught up!'));
}

const managePlansLink = document.getElementById('home-manage-plans');
if (managePlansLink) {
    managePlansLink.addEventListener('click', () => goToPage('page-recurring-walks'));
}

const viewHistoryLink = document.getElementById('home-view-history');
if (viewHistoryLink) {
    viewHistoryLink.addEventListener('click', () => goToPage('page-walk-history'));
}

// --- APP INITIALIZATION ---
goToPage('page-home');
}
