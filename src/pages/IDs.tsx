import React, { useEffect, useState } from 'react';
import { Resource } from '../types';

function IDs() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/src/data/resources.json')
      .then(response => response.json())
      .then(data => {
        const idResources = data.resources.filter((resource: Resource) => resource.category === 'Identification');
        setResources(idResources);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading resources:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-custom py-8">
      <h1 className="page-title">Get IDs</h1>
      <div className="bg-light p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-3">Why Identification Is Important</h2>
        <p>
          Having proper identification documents is crucial for accessing services, 
          opening bank accounts, applying for jobs, and securing housing. Here you'll find 
          resources to help you obtain various forms of ID.
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="resources-grid">
          {resources.map(resource => (
            <div key={resource.id} className="resource-card">
              <h2 className="resource-title">{resource.name}</h2>
              <p className="resource-description">{resource.description}</p>
              <p className="resource-contact">
                <strong>Contact:</strong> {resource.contact}
              </p>
              <p className="resource-contact">
                <strong>Location:</strong> {resource.location.county}, {resource.location.state}, {resource.nation}
              </p>
              <a 
                href={resource.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn mt-3 inline-block"
              >
                Visit Website
              </a>
            </div>
          ))}
        </div>
      )}

      {!loading && resources.length === 0 && (
        <div className="text-center p-8 bg-light rounded-lg">
          <p>No identification resources found. Please check back later.</p>
        </div>
      )}
    </div>
  );
}

export default IDs;
