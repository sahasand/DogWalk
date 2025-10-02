import React from 'react';

const HomePage = () => (
    <section className="page" id="page-home">
        <div className="space-y-10 stagger-in home-screen">
            <header className="home-header space-y-4 pt-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                        <span className="eyebrow block">Today</span>
                        <h1 className="hero-title">Hello, Alex!</h1>
                        <p className="text-soft" id="home-greeting-subtitle">Ready for a new adventure? 🐾</p>
                    </div>
                    <button className="icon-button" id="home-notifications" aria-label="Notifications">
                        <span className="icon-button-indicator"></span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                    </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-soft" id="home-weather">
                    <span className="weather-pill" id="home-weather-pill">🌤️ 68°F • Perfect walking weather</span>
                </div>
            </header>

            <div id="upcoming-walk-section" className="space-y-4">
                <div className="home-section-header">
                    <h2 className="section-title">Next Walk</h2>
                </div>
                <article id="upcoming-walk-card" className="glass-card hero-card" data-walk-id="99">
                    <div className="hero-card-main">
                        <div className="hero-illustration" aria-hidden="true">🐕</div>
                        <div className="hero-card-copy">
                            <p className="hero-status" id="upcoming-walk-status">In progress</p>
                            <h3 className="hero-card-title" id="upcoming-walk-title">With Jordan Lee</h3>
                            <p className="hero-card-meta" id="upcoming-walk-time">Today at 4:00 PM</p>
                            <div className="hero-pill-row">
                                <span className="badge-muted" id="upcoming-walk-duration">30 min</span>
                                <span className="hero-dogs" id="upcoming-walk-dogs">🐶 Buddy</span>
                            </div>
                        </div>
                        <img id="upcoming-walk-avatar" src="https://placehold.co/96x96/0F766E/0B1120?text=J" alt="Jordan Lee" className="hero-avatar" />
                    </div>
                    <div className="hero-card-actions">
                        <button className="btn btn-primary hero-cta" id="upcoming-walk-cta" type="button">Join live walk</button>
                        <button className="ghost-link" id="upcoming-walk-details" type="button">View walk details</button>
                    </div>
                </article>
            </div>

            <div id="home-metrics" className="grid grid-cols-3 gap-3"></div>

            <div className="quick-actions-grid">
                <button id="cta-book-walk" className="btn btn-primary w-full text-base py-4">Book New Walk</button>
                <button id="cta-recurring-walk" className="btn btn-secondary w-full text-base py-4">Schedule Walk</button>
            </div>

            <section className="space-y-4">
                <div className="home-section-header">
                    <h2 className="section-title">Recent Activity</h2>
                    <button className="link-button" id="home-view-history" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3h18v18H3z"/><path d="M16 3v18"/><path d="M8 3v18"/><path d="M3 8h18"/><path d="M3 16h18"/></svg>
                        <span>View all</span>
                    </button>
                </div>
                <div className="space-y-3" id="recent-activity-list"></div>
            </section>
        </div>
    </section>
);

export default HomePage;
