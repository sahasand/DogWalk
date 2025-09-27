document.addEventListener('DOMContentLoaded', () => {
// --- MOCK DATA ---
let dogData = [
    { id: 1, name: 'Buddy', avatar: '🐶', breed: 'Golden Retriever', age: 4, notes: 'Loves foggy morning jogs, prefers reflective harness.', vet: 'Parkside Vet Clinic', allergies: 'None', likes: 'Squeaky toys', dislikes: 'Skateboards' },
    { id: 2, name: 'Lucy', avatar: '🐩', breed: 'Poodle', age: 7, notes: 'Shy at first. Responds well to calm breathing cues.', vet: 'Uptown Animals', allergies: 'Chicken', likes: 'Belly rubs', dislikes: 'Loud trucks' },
    { id: 3, name: 'Max', avatar: '🐕', breed: 'German Shepherd', age: 2, notes: 'Very energetic! Needs a long run and trail sniff stops.', vet: 'Parkside Vet Clinic', allergies: 'None', likes: 'Frisbees', dislikes: 'Mail carriers' },
];
const walkerData = [
    { id: 1, name: 'Alex Ray', avatar: 'https://images.unsplash.com/photo-1612833608781-1d7e64496459?auto=format&fit=crop&w=200&q=60', verified: true, rating: 4.9, reviews: 124, price: 25, bio: "Hi, I'm Alex! I've been a passionate dog lover my whole life and have 5+ years of professional walking experience. I'm certified in Pet First Aid and can't wait to meet your furry friend!", badges: ["Pet CPR Certified", "5+ Years Exp."], favorite: true },
    { id: 2, name: 'Jordan Lee', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60', verified: true, rating: 4.8, reviews: 98, price: 24, bio: "Jordan is a marathon runner who loves taking high-energy dogs on long adventures. If your pup needs to burn off some steam, I'm your walker.", badges: ["Great with Large Dogs"], favorite: false },
    { id: 3, name: 'Casey Smith', avatar: 'https://images.unsplash.com/photo-1521579971123-1192931a1452?auto=format&fit=crop&w=200&q=60', verified: false, rating: 4.7, reviews: 75, price: 22, bio: "As a veterinary student, I have a deep understanding of animal care and behavior. I'm especially good with shy or anxious dogs.", badges: ["Experience with Puppies"], favorite: true },
];
let walkHistoryData = [
    { id: 99, date: '2025-09-16', time: '16:00', duration: 30, route: 'Dogpatch Loop', walker: walkerData[1], dogs: [dogData[0]], price: 25.00, status: 'In Progress' },
    { id: 1, date: '2025-09-11', walker: walkerData[1], dogs: [dogData[0]], route: 'Waterfront Promenade', price: 25.00, status: 'Completed', photos: ['https://placehold.co/300x200/334155/FFFFFF?text=Buddy+Playing', 'https://placehold.co/300x200/415a77/FFFFFF?text=Happy+Pup'], activity: { pee: true, poo: true, water: true }, note: "Buddy had a great time at the park. Full of energy today!" },
    { id: 2, date: '2025-09-09', walker: walkerData[0], dogs: [dogData[0], dogData[1]], route: 'Mission Greenway', price: 40.00, status: 'Completed', photos: [], activity: { pee: true, poo: false, water: true }, note: "Lucy was a little shy but warmed up. Buddy was great as always." },
    { id: 3, date: '2025-09-05', walker: walkerData[2], dogs: [dogData[2]], route: 'Sunrise Ridge', price: 22.00, status: 'Completed', photos: ['https://placehold.co/300x200/1d2d44/FFFFFF?text=Max+Running'], activity: { pee: true, poo: true, water: false }, note: "Max loved the long run by the lake!" },
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

const weatherSnapshot = {
    location: 'Dogpatch, SF',
    mood: 'Gentle mist',
    temperature: 58,
    updatedAgo: '3 minutes ago',
    heroMetrics: [
        { label: 'Visibility', value: '1.2 mi' },
        { label: 'Fog index', value: '62 / 100' },
        { label: 'Feels like', value: '56°' },
    ],
    details: [
        { label: 'Humidity', value: '92%' },
        { label: 'Wind', value: '4 mph NE' },
        { label: 'Sunrise', value: '6:43 AM' },
        { label: 'UV', value: 'Low (2)' },
    ],
    narrative: 'Low tide fog hugging the waterfront. Keep Buddy’s reflective harness on for the first 10 minutes.',
};

const quickActionConfig = [
    {
        id: 'book',
        title: 'Book a FogWalk',
        description: 'Schedule a Strava-inspired route built for misty mornings.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
        action: 'booking',
    },
    {
        id: 'care-notes',
        title: 'Update care notes',
        description: 'Log meds and harness reminders before hand-off.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><polyline points="17 21 17 13 7 13 7 21"/><line x1="7" y1="3" x2="7" y2="8"/></svg>',
        action: 'dogs',
    },
    {
        id: 'safety',
        title: 'Fog safety checklist',
        description: 'Headspace-style breathing and visibility tips.',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
        action: 'checklist',
    },
];

const routeSpotlights = [
    {
        id: 'waterfront',
        name: 'Waterfront Promenade',
        distance: '2.4 mi',
        terrain: 'Boardwalk · Flat',
        highlight: 'Apple Weather-inspired fog layers hug the bay.',
        bestFor: 'Calm mornings',
    },
    {
        id: 'sunrise-ridge',
        name: 'Sunrise Ridge Loop',
        distance: '3.1 mi',
        terrain: 'Trail · Moderate',
        highlight: 'Nike Run Club stats show 320 ft elevation gain.',
        bestFor: 'Energy burners',
    },
    {
        id: 'mission-green',
        name: 'Mission Greenway',
        distance: '1.8 mi',
        terrain: 'City · Low Traffic',
        highlight: 'Strava heatmaps signal fewer cyclists before 8 AM.',
        bestFor: 'Shy pups',
    },
];

const careInsights = [
    {
        title: 'Pre-walk calm routine',
        copy: 'Try Calm’s two-minute box breathing audio to settle anxious pups before leashing up.',
    },
    {
        title: 'Visibility gear check',
        copy: 'Switch to the amber LED collar whenever the fog index climbs above 60 to mirror Nike Run Club safety standards.',
    },
    {
        title: 'Post-walk recovery',
        copy: 'Strava-style prompts remind walkers to log hydration and paw checks after routes longer than 2 miles.',
    },
];

const onboardingSlides = [
    {
        eyebrow: 'Welcome',
        title: 'Walk through the fog with confidence',
        copy: 'FogWalk layers Apple Weather-style forecasts with trusted walkers so every outing stays calm and safe.',
        metric: { icon: '🌫️', text: 'Live visibility index tailored to your neighborhood' },
    },
    {
        eyebrow: 'Trusted Guides',
        title: 'Meet walkers vetted like Rover pros',
        copy: 'Every DogWalk guide is background checked, Pet CPR certified, and rated 4.8★ or higher by nearby neighbors.',
        metric: { icon: '🛡️', text: '92% of owners rebook their first walker' },
    },
    {
        eyebrow: 'Immersive Tracking',
        title: 'See the route, weather, and photos in real time',
        copy: 'Strava-inspired dashboards track progress while fog alerts nudge you to share check-ins instantly.',
        metric: { icon: '📡', text: 'Live map with safety checkpoints every 10 minutes' },
    },
    {
        eyebrow: 'Personal Care',
        title: 'Tailor every walk to your companion',
        copy: 'Headspace-like guidance keeps shy pups at ease with breathing cues, playlists, and personalized pace settings.',
        metric: { icon: '💛', text: 'Add care cards for meds, harness fit, and favorite treats' },
    },
    {
        eyebrow: 'Ready to explore',
        title: 'Book your first FogWalk in under two minutes',
        copy: 'Choose a route, align schedules, and enjoy post-walk photo stories—your city’s mist has never felt friendlier.',
        metric: { icon: '🚶‍♀️', text: 'Launch booking now and save your preferred route' },
    },
];

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
    const heroTitle = document.getElementById('home-hero-title');
    const heroSubtitle = document.getElementById('home-hero-subtitle');
    const heroEyebrow = document.getElementById('home-hero-eyebrow');
    const heroConditions = document.getElementById('home-hero-conditions');

    const hours = new Date().getHours();
    const greeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';
    if (heroTitle) heroTitle.textContent = `${greeting}, Alex`;
    if (heroEyebrow) heroEyebrow.textContent = `${weatherSnapshot.mood} • ${weatherSnapshot.location}`;

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

    if (heroSubtitle) {
        if (upcomingWalk) {
            const dateObj = upcomingWalk.date ? new Date(`${upcomingWalk.date}T${upcomingWalk.time || '00:00'}`) : null;
            const now = new Date();
            let timeLabel = 'soon';
            if (dateObj && !Number.isNaN(dateObj.valueOf())) {
                const sameDay = dateObj.toDateString() === now.toDateString();
                const dateLabel = sameDay ? 'today' : dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                const timeText = upcomingWalk.time ? dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '';
                timeLabel = timeText ? `${dateLabel} at ${timeText}` : dateLabel;
            }
            const dogsLabel = (upcomingWalk.dogs || []).map(d => d.name).join(' & ') || 'your pup';
            const walkerName = upcomingWalk.walker?.name || 'your walker';
            heroSubtitle.textContent = `${walkerName} meets ${dogsLabel} ${timeLabel}. ${weatherSnapshot.narrative}`;
        } else {
            heroSubtitle.textContent = weatherSnapshot.narrative;
        }
    }

    if (heroConditions) {
        heroConditions.innerHTML = weatherSnapshot.heroMetrics.map(metric => `
            <div class="home-hero-condition">
                <span class="label">${metric.label}</span>
                <span class="value">${metric.value}</span>
            </div>
        `).join('');
    }

    const upcomingCard = document.getElementById('upcoming-walk-card');
    if (upcomingCard) {
        if (upcomingWalk) {
            upcomingCard.style.display = '';
            upcomingCard.dataset.walkId = upcomingWalk.id;
            const avatarEl = document.getElementById('upcoming-walk-avatar');
            const titleEl = document.getElementById('upcoming-walk-title');
            const timeEl = document.getElementById('upcoming-walk-time');
            const durationEl = document.getElementById('upcoming-walk-duration');
            const dogsEl = document.getElementById('upcoming-walk-dogs');

            const walkerName = upcomingWalk.walker?.name || 'Your walker';
            if (avatarEl && upcomingWalk.walker?.avatar) {
                avatarEl.src = upcomingWalk.walker.avatar;
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
                        const routeLabel = upcomingWalk.route ? ` · ${upcomingWalk.route}` : '';
                        timeEl.textContent = timeLabel ? `${dateLabel} at ${timeLabel}${routeLabel}` : `${dateLabel}${routeLabel}`;
                    } else {
                        timeEl.textContent = upcomingWalk.route || 'Scheduled';
                    }
                } else {
                    timeEl.textContent = upcomingWalk.route || 'Scheduled';
                }
            }

            if (durationEl) durationEl.textContent = upcomingWalk.duration ? `${upcomingWalk.duration} min` : 'Walk scheduled';
            if (dogsEl) {
                const dogLabels = (upcomingWalk.dogs || []).map(dog => dog.name).join(', ');
                dogsEl.textContent = dogLabels || 'Buddy';
            }

            upcomingCard.onclick = () => goToPage('page-live-tracking', { walkId: upcomingWalk.id });
            upcomingCard.style.cursor = 'pointer';
        } else {
            upcomingCard.style.display = 'none';
            upcomingCard.onclick = null;
            upcomingCard.style.cursor = 'default';
        }
    }

    const panelOpenBooking = document.getElementById('panel-open-booking');
    if (panelOpenBooking) panelOpenBooking.onclick = () => launchBookingFlow('home-upcoming-adjust');

    const weatherTemp = document.getElementById('weather-temp');
    if (weatherTemp) weatherTemp.textContent = `${weatherSnapshot.temperature}°`;
    const weatherMood = document.getElementById('weather-mood');
    if (weatherMood) weatherMood.textContent = weatherSnapshot.mood;
    const weatherLocation = document.getElementById('weather-location');
    if (weatherLocation) weatherLocation.textContent = weatherSnapshot.location;
    const weatherUpdated = document.getElementById('weather-updated-at');
    if (weatherUpdated) weatherUpdated.textContent = `Updated ${weatherSnapshot.updatedAgo}`;
    const weatherGrid = document.getElementById('weather-grid');
    if (weatherGrid) {
        weatherGrid.innerHTML = weatherSnapshot.details.map(detail => `
            <div>
                <dt>${detail.label}</dt>
                <dd>${detail.value}</dd>
            </div>
        `).join('');
    }

    const quickActionsContainer = document.getElementById('home-quick-actions');
    if (quickActionsContainer) {
        quickActionsContainer.innerHTML = quickActionConfig.map(action => `
            <button type="button" class="quick-action-card" data-action="${action.action}">
                <span class="quick-action-icon">${action.icon}</span>
                <div class="quick-action-meta">
                    <h3>${action.title}</h3>
                    <p>${action.description}</p>
                </div>
            </button>
        `).join('');
        quickActionsContainer.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', () => handleDashboardAction(btn.dataset.action));
        });
    }

    const routeList = document.getElementById('home-route-list');
    if (routeList) {
        routeList.innerHTML = routeSpotlights.map(route => `
            <article class="route-card" data-route="${route.id}">
                <div class="route-card-header">
                    <div>
                        <h3 class="route-name">${route.name}</h3>
                        <div class="route-meta"><span>${route.distance}</span><span>${route.terrain}</span></div>
                    </div>
                    <span class="route-pill">${route.bestFor}</span>
                </div>
                <div class="route-card-footer">
                    <span>${route.highlight}</span>
                    <button type="button" class="panel-link route-select" data-route="${route.id}">Preview</button>
                </div>
            </article>
        `).join('');
        routeList.querySelectorAll('.route-select').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                previewRoute(btn.dataset.route);
            });
        });
    }

    const insightGrid = document.getElementById('home-insight-grid');
    if (insightGrid) {
        insightGrid.innerHTML = careInsights.map(insight => `
            <article class="insight-card">
                <h3>${insight.title}</h3>
                <p>${insight.copy}</p>
            </article>
        `).join('');
    }

    const completedWalks = walkHistoryData
        .filter(w => w.status === 'Completed')
        .sort((a, b) => new Date(b.date + 'T00:00:00') - new Date(a.date + 'T00:00:00'));

    const recentActivityList = document.getElementById('recent-activity-list');
    if (recentActivityList) {
        const recentWalks = completedWalks.slice(0, 3);
        recentActivityList.innerHTML = recentWalks.map(walk => `
            <article class="glass-card p-4 flex items-start gap-3 recent-activity" data-walk-id="${walk.id}">
                <img src="${walk.walker.avatar}" class="w-12 h-12 rounded-xl object-cover" alt="${walk.walker.name}">
                <div class="flex-1">
                    <p class="font-semibold">${walk.route || 'Neighborhood walk'}</p>
                    <p class="text-xs opacity-70">${new Date(walk.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • ${walk.walker.name}</p>
                </div>
                <span class="font-bold text-sm">$${walk.price.toFixed(2)}</span>
            </article>
        `).join('');
        recentActivityList.querySelectorAll('.recent-activity').forEach(card => {
            card.addEventListener('click', () => goToPage('page-walk-summary', { walkId: parseInt(card.dataset.walkId, 10) }));
        });
    }

    const heroBookBtn = document.getElementById('hero-book-btn');
    if (heroBookBtn) heroBookBtn.onclick = () => launchBookingFlow('home-hero');
    const heroChecklistBtn = document.getElementById('hero-checklist-btn');
    if (heroChecklistBtn) heroChecklistBtn.onclick = showFogChecklist;
}

function handleDashboardAction(action) {
    switch (action) {
        case 'booking':
            launchBookingFlow('home-quick-action');
            break;
        case 'dogs':
            goToPage('page-dogs');
            break;
        case 'checklist':
            showFogChecklist();
            break;
        default:
            break;
    }
}

function previewRoute(routeId) {
    const route = routeSpotlights.find(r => r.id === routeId);
    if (!route) return;
    const message = `${route.name}\n${route.distance} • ${route.terrain}\n\n${route.highlight}\n\nTap “Book a FogWalk” to lock this in.`;
    window.alert(message);
}

function showFogChecklist() {
    const checklist = [
        'Attach reflective harness & LED collar',
        'Practice Calm-style 4×4 breathing before leaving',
        'Pack towel for dew + hydration squeeze bottle',
        'Share live route link with family',
    ];
    window.alert(`FogWalk safety checklist:\n\n${checklist.map((item, index) => `${index + 1}. ${item}`).join('\n')}`);
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
    container.innerHTML = `<div class="page-header"><button class="back-btn" data-target="page-home"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><h1>Scheduled Walks</h1></div><div class="space-y-4"><div class="glass-card p-4"><div class="flex justify-between items-center"><p class="font-bold">Mon, Wed, Fri</p><span class="text-sm bg-green-500/50 px-2 py-1 rounded-full">Active</span></div><p class="text-sm opacity-80">9:00 AM, 30 min with Alex R.</p></div><button class="btn btn-primary w-full">Set Up New Schedule</button></div>`;
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
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('walk-date').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('walk-date').min = tomorrow.toISOString().split('T')[0];
    document.getElementById('walk-time').value = '10:00';
    document.getElementById('dog-selection').innerHTML = dogData.map(dog => `<label class="checkable-card"><input type="checkbox" name="dogs" value="${dog.id}"><div class="card-content glass-card p-4 flex flex-col items-center"><span class="text-4xl">${dog.avatar}</span><span class="font-semibold mt-2">${dog.name}</span></div><div class="checkmark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div></label>`).join('');

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
}

function initOnboarding() {
    let currentSlide = 0;
    const slidesContainer = document.getElementById('onboarding-slides-container');
    const dotsContainer = document.getElementById('onboarding-dots-container');
    const nextBtn = document.getElementById('onboarding-next-btn');
    const backBtn = document.getElementById('onboarding-back-btn');
    const skipBtn = document.getElementById('onboarding-skip-btn');
    const progressLabel = document.getElementById('onboarding-progress-label');
    const totalSlides = onboardingSlides.length;

    if (!slidesContainer || !dotsContainer || !nextBtn || !backBtn || !progressLabel) return;

    slidesContainer.innerHTML = onboardingSlides.map(slide => `
        <article class="onboarding-slide">
            <span class="onboarding-eyebrow">${slide.eyebrow}</span>
            <h2 class="onboarding-title">${slide.title}</h2>
            <p class="onboarding-copy">${slide.copy}</p>
            ${slide.metric ? `<div class="onboarding-metric"><span>${slide.metric.icon}</span><span>${slide.metric.text}</span></div>` : ''}
        </article>
    `).join('');

    dotsContainer.innerHTML = onboardingSlides.map((_, idx) => `
        <button class="onboarding-dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}" aria-label="Go to slide ${idx + 1}"></button>
    `).join('');

    const dots = Array.from(dotsContainer.querySelectorAll('.onboarding-dot'));

    function updateOnboardingUI() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
        nextBtn.textContent = currentSlide === totalSlides - 1 ? 'Get Started' : 'Next';
        progressLabel.textContent = `Step ${currentSlide + 1} of ${totalSlides}`;
        backBtn.disabled = currentSlide === 0;
    }

    function completeOnboarding() {
        try {
            localStorage.setItem('onboardingComplete', 'true');
        } catch (e) {
            console.error('Could not set localStorage.', e);
        }
        goToPage('page-home');
    }

    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateOnboardingUI();
        } else {
            completeOnboarding();
        }
    });

    backBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateOnboardingUI();
        }
    });

    dots.forEach(dot => dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.dataset.slide, 10);
        if (!Number.isNaN(slideIndex)) {
            currentSlide = slideIndex;
            updateOnboardingUI();
        }
    }));

    if (skipBtn) {
        skipBtn.addEventListener('click', () => completeOnboarding());
    }

    updateOnboardingUI();
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
const addDogButton = document.getElementById('btn-add-dog');
if (addDogButton) {
    addDogButton.addEventListener('click', () => goToPage('page-dog-form'));
}

// Start the app
initApp();
    });
