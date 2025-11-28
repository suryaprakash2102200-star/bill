'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { FiPlus, FiSearch, FiTrash2, FiUser, FiPhone, FiMail } from 'react-icons/fi';
import styles from './page.module.css';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: ''
  });

  const getAuthHeaders = () => {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const authHeaders = getAuthHeaders();
      if (!authHeaders.Authorization) {
        setLoading(false);
        alert('Please log in again to view clients.');
        return;
      }

      const response = await fetch('/api/clients', {
        headers: authHeaders,
      });
      const result = await response.json();
      if (result.success) {
        setClients(result.data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async () => {
    if (!newClient.name) {
      alert('Please enter a client name');
      return;
    }

    try {
      const authHeaders = getAuthHeaders();
      if (!authHeaders.Authorization) {
        alert('Please log in again to add clients.');
        return;
      }

      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify(newClient),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setClients([...clients, result.data]);
        setShowAddModal(false);
        setNewClient({ name: '', email: '', phone: '', address: '', company: '' });
        alert('Client added successfully');
      } else {
        alert('Failed to add client');
      }
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Clients</h1>
            <p className={styles.subtitle}>Manage your client information and contacts.</p>
          </div>
          <Button variant="primary" icon={<FiPlus />} onClick={() => setShowAddModal(true)}>
            Add New Client
          </Button>
        </div>

        <div className={styles.searchBar}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search clients..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <div className={styles.grid}>
            {filteredClients.map((client) => (
              <div key={client._id} className={styles.clientCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.avatar}>
                    <FiUser />
                  </div>
                  <div>
                    <h3 className={styles.clientName}>{client.name}</h3>
                    <p className={styles.companyName}>{client.company || 'Individual'}</p>
                  </div>
                </div>
                
                <div className={styles.cardBody}>
                  {client.email && (
                    <div className={styles.infoRow}>
                      <FiMail /> <span>{client.email}</span>
                    </div>
                  )}
                  {client.phone && (
                    <div className={styles.infoRow}>
                      <FiPhone /> <span>{client.phone}</span>
                    </div>
                  )}
                  {client.address && (
                    <div className={styles.address}>
                      {client.address}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {filteredClients.length === 0 && (
              <div className={styles.emptyState}>
                <p>No clients found.</p>
              </div>
            )}
          </div>
        )}

        {/* Simple Add Client Modal Overlay */}
        {showAddModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Add New Client</h2>
              <div className={styles.modalForm}>
                <Input 
                  label="Name" 
                  value={newClient.name} 
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                />
                <Input 
                  label="Company" 
                  value={newClient.company} 
                  onChange={(e) => setNewClient({...newClient, company: e.target.value})}
                />
                <Input 
                  label="Email" 
                  value={newClient.email} 
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                />
                <Input 
                  label="Phone" 
                  value={newClient.phone} 
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                />
                <Input 
                  label="Address" 
                  value={newClient.address} 
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                />
                <div className={styles.modalActions}>
                  <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                  <Button variant="primary" onClick={handleAddClient}>Save Client</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
