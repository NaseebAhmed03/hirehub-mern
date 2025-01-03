import React, { useState, useEffect } from 'react';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setApplications([
      {
        id: 1,
        name: 'John Doe',
        position: 'Senior Developer',
        appliedDate: '2023-11-01',
        status: 'pending',
        experience: '5 years',
        resumeUrl: '#'
      },
      {
        id: 2,
        name: 'Jane Smith',
        position: 'UI Designer',
        appliedDate: '2023-11-02',
        status: 'shortlisted',
        experience: '3 years',
        resumeUrl: '#'
      }
    ]);
  }, []);

  const handleStatusChange = (applicationId, newStatus) => {
    setApplications(applications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: newStatus };
      }
      return app;
    }));
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Applications</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">All Applications</option>
          <option value="pending">Pending</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplications.map(application => (
              <tr key={application.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{application.name}</div>
                  <div className="text-sm text-gray-500">{application.experience} experience</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {application.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {application.appliedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${application.status === 'shortlisted' ? 'bg-green-100 text-green-800' : ''}
                    ${application.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {application.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="space-x-2">
                    <button
                      onClick={() => handleStatusChange(application.id, 'shortlisted')}
                      className="text-green-600 hover:text-green-900"
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => handleStatusChange(application.id, 'rejected')}
                      className="text-red-600 hover:text-red-900"
                    >
                      Reject
                    </button>
                    <a
                      href={application.resumeUrl}
                      className="text-blue-600 hover:text-blue-900"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Applications;