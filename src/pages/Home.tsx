import React, { useEffect, useState } from 'react';
import { Resource } from '../types';

function Home() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/src/data/resources.json')
      .then(response => response.json())
      .then(data => {
        setResources(data.resources);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading resources:', err);
        setLoading(false);
      });
  }, []);

  // Get unique categories
  const categories = [...new Set(resources.map(r => r.category))];

  return (
    <div className="container-custom py-8">
      <section className="mb-10">
        <h1 className="page-title">Welcome to Leonard's Light</h1>
        <p className="text-lg mb-6">
          Your comprehensive resource hub for rebuilding and moving forward. Find resources for
          shelters, getting IDs, setting up bank accounts, and looking for jobs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-light p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">Why Leonard's Light?</h2>
            <p>
              We understand the challenges of starting over. Our carefully curated resources 
              help you navigate the essentials for rebuilding your life.
            </p>
          </div>
          <div className="bg-light p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">How to Use This Site</h2>
            <p>
              Browse resources by category or location. Each listing includes contact information
              and direct links to the services you need.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Resource Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-3 text-center py-8">Loading resources...</div>
          ) : (
            categories.map(category => {
              const categoryResources = resources.filter(r => r.category === category);
              return (
                <div key={category} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                  <h3 className="text-xl font-bold mb-3">{category}</h3>
                  <p className="mb-4">
                    {categoryResources.length} resources available
                  </p>
                  <a href={`/${category.toLowerCase()}`} className="btn block text-center">
                    View {category} Resources
                  </a>
                </div>
              );
            })
          )}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Resources</h2>
        <div className="resources-grid">
          {loading ? (
            <div className="col-span-3 text-center py-8">Loading resources...</div>
          ) : (
            resources.slice(0, 3).map(resource => (
              <div key={resource.id} className="resource-card">
                <h3 className="resource-title">{resource.name}</h3>
                <p className="resource-description">{resource.description}</p>
                <p className="resource-contact"><strong>Category:</strong> {resource.category}</p>
                <a 
                  href={`/${resource.category.toLowerCase()}`} 
                  className="btn mt-2 inline-block"
                >
                  Learn more
                </a>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
