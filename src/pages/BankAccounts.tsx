import React, { useEffect, useState } from 'react';
import { Resource } from '../types';

function BankAccounts() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/src/data/resources.json')
      .then(response => response.json())
      .then(data => {
        const bankResources = data.resources.filter((resource: Resource) => resource.category === 'Banking');
        setResources(bankResources);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading resources:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-custom py-8">
      <h1 className="page-title">Bank Accounts</h1>
      <div className="bg-light p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-3">Why You Need a Bank Account</h2>
        <p className="mb-3">
          A bank account is essential for financial stability. It provides a safe place for your money, 
          helps you avoid check-cashing fees, and builds a financial history.
        </p>
        <p>
          Many banks offer second-chance accounts specifically designed for people who are rebuilding 
          their financial lives.
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
          <p>No banking resources found. Please check back later.</p>
        </div>
      )}
    </div>
  );
}

export default BankAccounts;
