'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MoreVertical, Key, Shield, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const supabase = createClient();

  // Modals state
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      if (!token) return;

      const roleQuery = roleFilter !== 'All' ? `&role=${roleFilter.toUpperCase()}` : '';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") || "http://localhost:4000"}/api/admin/users?page=${page}&limit=10&search=${search}${roleQuery}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.data || []);
        setTotalPages(data.meta?.totalPages || 1);
        setErrorMsg('');
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || 'Failed to load users from backend. Please restart backend.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, roleFilter, page, supabase.auth]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") || "http://localhost:4000"}/api/admin/users/${selectedUser.id}/reset-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ newPassword })
      });
      if (res.ok) {
        setResetModalOpen(false);
        setNewPassword('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") || "http://localhost:4000"}/api/admin/users/${selectedUser.id}/role`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        setRoleModalOpen(false);
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") || "http://localhost:4000"}/api/admin/users/${selectedUser.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session?.access_token}` }
      });
      if (res.ok) {
        setDeleteModalOpen(false);
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Verified Candidates Management</h1>
        <p className="text-zinc-400 text-sm">Manage candidate portfolios, recruiter access, and endorsements.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {['All', 'Student', 'College', 'Industry', 'Admin'].map(role => (
            <button
              key={role}
              onClick={() => { setRoleFilter(role); setPage(1); }}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                roleFilter === role ? 'bg-white text-black font-medium' : 'bg-white/5 text-zinc-400 hover:bg-white/10'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 border-b border-white/10 text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">Loading users...</td>
                </tr>
              ) : errorMsg ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-red-400">{errorMsg}</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">No users found. (Check backend terminal for errors)</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium">
                          {user.email?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div>
                          <div className="font-medium text-white">{user.name || 'Unnamed User'}</div>
                          <div className="text-zinc-500 text-xs">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                        user.role === 'ADMIN' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        user.role === 'STUDENT' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        user.role === 'COLLEGE' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => { setSelectedUser(user); setResetModalOpen(true); }} className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Reset Password">
                          <Key className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setSelectedUser(user); setNewRole(user.role); setRoleModalOpen(true); }} className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Change Role">
                          <Shield className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setSelectedUser(user); setDeleteModalOpen(true); }} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors" title="Delete User">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between text-sm">
          <span className="text-zinc-500">Page {page} of {totalPages || 1}</span>
          <div className="flex gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {resetModalOpen && (
          <Modal title="Reset Password" onClose={() => setResetModalOpen(false)}>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <p className="text-sm text-zinc-400">Reset password for <span className="text-white">{selectedUser?.email}</span></p>
              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">New Password</label>
                <input 
                  type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  className="w-full mt-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/30"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setResetModalOpen(false)} className="px-4 py-2 text-sm hover:bg-white/5 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:opacity-90">Save Password</button>
              </div>
            </form>
          </Modal>
        )}

        {roleModalOpen && (
          <Modal title="Change Role" onClose={() => setRoleModalOpen(false)}>
            <form onSubmit={handleChangeRole} className="space-y-4">
              <p className="text-sm text-zinc-400">Change role for <span className="text-white">{selectedUser?.email}</span></p>
              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Role</label>
                <select 
                  value={newRole} onChange={e => setNewRole(e.target.value)}
                  className="w-full mt-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/30 text-white"
                >
                  <option value="STUDENT">Student</option>
                  <option value="COLLEGE">College</option>
                  <option value="INDUSTRY">Industry</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setRoleModalOpen(false)} className="px-4 py-2 text-sm hover:bg-white/5 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:opacity-90">Save Role</button>
              </div>
            </form>
          </Modal>
        )}

        {deleteModalOpen && (
          <Modal title="Delete User" onClose={() => setDeleteModalOpen(false)}>
            <div className="space-y-4">
              <p className="text-sm text-zinc-400">Are you sure you want to delete <span className="text-white">{selectedUser?.email}</span>? This action cannot be undone.</p>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 text-sm hover:bg-white/5 rounded-lg">Cancel</button>
                <button onClick={handleDeleteUser} className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600">Delete User</button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="font-medium text-white">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-md text-zinc-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
