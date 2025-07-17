import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import toast from 'react-hot-toast';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import SummaryCard from '../../components/Cards/SummaryCard';
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm'; 
import DeleteAlertContent from '../../components/DeleteAlertContent';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });

  const navigate = useNavigate();

  const fetchAllSessions = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data.sessions || []);
      setError(null);
    } catch (error) {
      setError('Failed to load sessions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData._id));
      toast.success('Session deleted successfully.');
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      // Do not toast here if axiosInstance handles it globally
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-6 pb-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Interview Sessions</h1>
          <button
            className="h-12 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus className="text-lg" />
            New Session
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
            <button
              onClick={fetchAllSessions}
              className="ml-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Retry
            </button>
          </div>
        ) : sessions.length === 0 ? (
          <div className="bg-gray-50 text-gray-500 p-8 rounded-xl text-center">
            <p className="mb-4">No interview sessions found</p>
            <button
              className="text-blue-600 hover:text-blue-800 font-medium"
              onClick={() => setOpenCreateModal(true)}
            >
              Create your first session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions?.map((data, index) => (
              <SummaryCard
                key={data?._id}
                id={data?._id}
                colors={index}
                role={data?.role || ''}
                topicsToFocus={data?.topicsToFocus || ''}
                experience={data?.experience || ''}
                questions={data?.questions?.length || '-'}
                description={data?.description || ''}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).format('Do MMM YYYY')
                    : ''
                }
                onSelect={() => navigate(`/interview-prep/${data._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data })}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <div>
          <CreateSessionForm onSuccess={() => {
            setOpenCreateModal(false);
            fetchAllSessions();
          }} />
        </div>
      </Modal>

      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Alert"
      >
        <div className="w-full">
          <DeleteAlertContent
            content="Are you sure you want to delete this session detail?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
