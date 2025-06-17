import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card.tsx';
import Button from '../../components/ui/Button.tsx';
import Table, {type TableColumn } from '../../components/ui/Table.tsx';
import Modal from '../../components/ui/Modal.tsx';
import Input from '../../components/ui/Input.tsx';
import Badge from '../../components/ui/Badge.tsx';
import { useData } from '../../contexts/DataContext.tsx';
import type {User} from '../../types';

/**
 * @component UserManagement
 * @description Page for managing system users.
 * Allows viewing, adding, editing, and deleting users through a table and modal forms.
 */
// Page for managing system users.
// Allows viewing, adding, editing, and deleting users through a table and modal forms.
const UserManagement: React.FC = () => {
    const { users, totalUsers, isLoading, error, fetchUsers, addUser, updateUser, deleteUser } = useData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [userForm, setUserForm] = useState<Omit<User, 'id'>>({ name: '', email: '', role: 'User', status: 'Active' });
    const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    // Fetch users when pagination changes
    useEffect(() => {
        fetchUsers({ page: currentPage, limit: itemsPerPage });
    }, [currentPage, itemsPerPage, fetchUsers]);

    /**
     * @function handleAddUserClick
     * @description Opens the modal for adding a new user.
     */
        // Opens the modal for adding a new user.
    const handleAddUserClick = () => {
            setEditingUser(null);
            setUserForm({ name: '', email: '', role: 'User', status: 'Active' });
            setFormErrors({});
            setIsModalOpen(true);
        };

    /**
     * @function handleEditUserClick
     * @description Opens the modal for editing an existing user, pre-filling the form.
     * @param {User} user - The user object to be edited.
     */
        // Opens the modal for editing an existing user, pre-filling the form.
    const handleEditUserClick = (user: User) => {
            setEditingUser(user);
            setUserForm({ name: user.name, email: user.email, role: user.role, status: user.status });
            setFormErrors({});
            setIsModalOpen(true);
        };

    /**
     * @function handleDeleteUserClick
     * @description Handles the deletion of a user after user confirmation.
     * @param {string} id - The ID of the user to delete.
     */
        // Handles the deletion of a user after user confirmation.
    const handleDeleteUserClick = async (id: string) => {
            if (window.confirm('Are you sure you want to delete this user?')) {
                await deleteUser(id);
            }
        };

    /**
     * @function handleFormChange
     * @description Updates the form state as the user types.
     * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The change event.
     */
        // Updates the form state as the user types.
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setUserForm(prev => ({ ...prev, [name]: value }));
            setFormErrors(prev => ({ ...prev, [name]: undefined })); // Clear error on change
        };

    /**
     * @function validateForm
     * @description Validates the user form fields.
     * @returns {boolean} True if the form is valid, false otherwise.
     */
        // Validates the user form fields.
    const validateForm = () => {
            const errors: { name?: string; email?: string } = {};
            if (!userForm.name.trim()) {
                errors.name = 'User Name is required.';
            }
            if (!userForm.email.trim()) {
                errors.email = 'Email is required.';
            } else if (!/\S+@\S+\.\S+/.test(userForm.email)) {
                errors.email = 'Email address is invalid.';
            }
            setFormErrors(errors);
            return Object.keys(errors).length === 0;
        };

    /**
     * @function handleSubmit
     * @description Handles form submission for adding or updating a user.
     * @param {React.FormEvent} e - The form submission event.
     */
        // Handles form submission for adding or updating a user.
    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!validateForm()) {
                return;
            }
            if (editingUser) {
                await updateUser({ ...editingUser, ...userForm });
            } else {
                await addUser(userForm);
            }
            setIsModalOpen(false);
        };

    /**
     * @function getStatusBadgeVariant
     * @description Returns the appropriate badge variant for a user status.
     * @param {User['status']} status - The status of the user.
     * @returns {'success' | 'danger' | 'warning' | 'info' | 'default'} The badge variant.
     */
        // Returns the appropriate badge variant for a user status.
    const getStatusBadgeVariant = (status: User['status']) => {
            switch (status) {
                case 'Active':
                    return 'success';
                case 'Inactive':
                    return 'danger';
                case 'Pending':
                    return 'warning';
                default:
                    return 'default';
            }
        };

    // Define table columns
    const columns: TableColumn<User>[] = [
        {
            key: 'name',
            header: 'User Name',
            className: 'font-semibold',
        },
        {
            key: 'email',
            header: 'Email',
        },
        {
            key: 'role',
            header: 'Role',
        },
        {
            key: 'status',
            header: 'Status',
            render: (row) => (
                <Badge variant={getStatusBadgeVariant(row.status)}>
                    {row.status}
                </Badge>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
                <div className="space-x-2">
                    <Button variant="info" size="small" onClick={() => handleEditUserClick(row)}>
                        Edit
                    </Button>
                    <Button variant="danger" size="small" onClick={() => handleDeleteUserClick(row.id)}>
                        Delete
                    </Button>
                </div>
            ),
            className: 'w-px whitespace-nowrap',
        },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">User Management</h2>

            <Card>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">System Users</h3>
                {error && <p className="text-red-600 dark:text-red-400 mb-4">Error loading users: {error}</p>}
                <Table<User>
                    columns={columns}
                    data={users}
                    totalItems={totalUsers}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(limit) => {
                        setItemsPerPage(limit);
                        setCurrentPage(1);
                    }}
                    isLoading={isLoading}
                    emptyMessage="No users found."
                />
                <div className="mt-6 flex justify-end">
                    <Button variant="success" onClick={handleAddUserClick}>
                        Add User
                    </Button>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingUser ? 'Edit User' : 'Add New User'}>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="User Name"
                        name="name"
                        value={userForm.name}
                        onChange={handleFormChange}
                        placeholder="e.g., Jane Doe"
                        error={formErrors.name}
                        required
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={userForm.email}
                        onChange={handleFormChange}
                        placeholder="e.g., jane@example.com"
                        error={formErrors.email}
                        required
                    />
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={userForm.role}
                            onChange={handleFormChange}
                            className="block w-full px-3 py-2 border rounded-md shadow-sm bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={userForm.status}
                            onChange={handleFormChange}
                            className="block w-full px-3 py-2 border rounded-md shadow-sm bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" loading={isLoading}>
                            {editingUser ? 'Save Changes' : 'Add User'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default UserManagement;