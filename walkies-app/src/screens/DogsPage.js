import React from 'react';

const DogsPage = () => (
    <section className="page" id="page-dogs">
        <div className="page-header"><div className="placeholder"></div><h1>My Dogs</h1></div>
        <div className="space-y-4" id="dog-list-container"></div>
        <button id="btn-add-dog" className="btn btn-secondary w-full mt-6">Add New Dog</button>
    </section>
);

export default DogsPage;
