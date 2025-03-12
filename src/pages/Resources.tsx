import React, { useEffect, useState } from 'react';
import { Resource } from '../types';

// Type for grouped resources structure
type GroupedResources = {
  [nation: string]: {
    [state: string]: Resource[];
  };
};

function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setLoading(true);
    fetch('/src/data/resources.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load resources');
        }
        return response.json();
      })
      .then(data => {
        setResources(data.resources);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load resources. Please try again later.');
        setLoading(false);
        console.error('Error loading resources:', err);
      });
  }, []);

  // Group resources by nation and then by state
  const groupedResources = resources.reduce<GroupedResources>((acc, resource) => {
    if (!acc[resource.nation]) {
      acc[resource.nation] = {};
    }
    
    if (!acc[resource.nation][resource.location.state]) {
      acc[resource.nation][resource.location.state] = [];
    }
    
    acc[resource.nation][resource.location.state].push(resource);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="container-custom py-8">
        <h1 className="page-title">Resources</h1>
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-8">
        <h1 className="page-title">Resources</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="page-title">Resources</h1>
      <p className="mb-8 text-lg">Find helpful resources organized by location. Click on any resource to learn more.</p>
      
      {Object.entries(groupedResources as GroupedResources).map(([nation, states]) => (
        <div key={nation} className="nation-container">
          <h2 className="nation-title">{nation}</h2>
          
          {Object.entries(states).map(([state, stateResources]) => (
            <div key={state} className="state-container">
              <h3 className="state-title">{state}</h3>
              
              <div className="resources-grid">
                {stateResources.map((resource: Resource) => (
                  <div key={resource.id} className="resource-card">
                    <h4 className="resource-title">{resource.name}</h4>
                    <p className="resource-description">{resource.description}</p>
                    <p className="resource-contact">
                      <strong>Contact:</strong> {resource.contact}
                    </p>
                    <p className="resource-contact">
                      <strong>Category:</strong> {resource.category}
                    </p>
                    <p className="resource-contact">
                      <strong>Location:</strong> {resource.location.county}, {resource.location.state}
                    </p>
                    <a 
                      href={resource.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="resource-link"
                    >
                      Visit Website
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Resources;
