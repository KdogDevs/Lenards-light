import React, { useEffect, useState } from 'react';
import { Resource } from '../types';

function Shelters() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/src/data/resources.json')
      .then(response => response.json())
      .then(data => {
        const shelterResources = data.resources.filter((resource: Resource) => resource.category === 'Shelter');
        setResources(shelterResources);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading resources:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-custom py-8">
      <h1 className="page-title">Shelters</h1>
      <div className="bg-light p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-3">Finding Safe Housing</h2>
        <p>
          Emergency and transitional shelters provide immediate housing assistance. 
          They often offer additional services such as meals, case management, and 
          connections to permanent housing options.
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
          <p>No shelter resources found. Please check back later.</p>
        </div>
      )}
    </div>
  );
}

export default Shelters;
