import React, {useState, useEffect} from 'react';
import Card from '../../components/ui/Card.tsx';
import Button from '../../components/ui/Button.tsx';
import Table, {type TableColumn} from '../../components/ui/Table.tsx';
import Modal from '../../components/ui/Modal.tsx';
import Input from '../../components/ui/Input.tsx';
import {useData} from '../../contexts/DataContext.tsx';
import type {Rule} from '../../types';

/**
 * @component RuleManagement
 * @description Page for managing security rules.
 * Allows viewing, adding, editing, and deleting rules through a table and modal forms.
 */
// Page for managing security rules.
// Allows viewing, adding, editing, and deleting rules through a table and modal forms.
const RuleManagement: React.FC = () => {
    const {rules, totalRules, isLoading, error, fetchRules, addRule, updateRule, deleteRule} = useData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRule, setEditingRule] = useState<Rule | null>(null);
    const [ruleForm, setRuleForm] = useState<Omit<Rule, 'id'>>({name: '', type: '', action: 'Block', enabled: true});
    const [formErrors, setFormErrors] = useState<{ name?: string; type?: string }>({});

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    // Fetch rules when pagination changes
    useEffect(() => {
        fetchRules({page: currentPage, limit: itemsPerPage});
    }, [currentPage, itemsPerPage, fetchRules]);

    /**
     * @function handleAddRuleClick
     * @description Opens the modal for adding a new rule.
     */
        // Opens the modal for adding a new rule.
    const handleAddRuleClick = () => {
            setEditingRule(null);
            setRuleForm({name: '', type: '', action: 'Block', enabled: true});
            setFormErrors({});
            setIsModalOpen(true);
        };

    /**
     * @function handleEditRuleClick
     * @description Opens the modal for editing an existing rule, pre-filling the form.
     * @param {Rule} rule - The rule object to be edited.
     */
        // Opens the modal for editing an existing rule, pre-filling the form.
    const handleEditRuleClick = (rule: Rule) => {
            setEditingRule(rule);
            setRuleForm({name: rule.name, type: rule.type, action: rule.action, enabled: rule.enabled});
            setFormErrors({});
            setIsModalOpen(true);
        };

    /**
     * @function handleDeleteRuleClick
     * @description Handles the deletion of a rule after user confirmation.
     * @param {string} id - The ID of the rule to delete.
     */
        // Handles the deletion of a rule after user confirmation.
    const handleDeleteRuleClick = async (id: string) => {
            if (window.confirm('Are you sure you want to delete this rule?')) {
                await deleteRule(id);
            }
        };

    /**
     * @function handleFormChange
     * @description Updates the form state as the user types.
     * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The change event.
     */
        // Updates the form state as the user types.
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const {name, value} = e.target;
            setRuleForm(prev => ({...prev, [name]: value}));
            setFormErrors(prev => ({...prev, [name]: undefined})); // Clear error on change
        };

    /**
     * @function validateForm
     * @description Validates the rule form fields.
     * @returns {boolean} True if the form is valid, false otherwise.
     */
        // Validates the rule form fields.
    const validateForm = () => {
            const errors: { name?: string; type?: string } = {};
            if (!ruleForm.name.trim()) {
                errors.name = 'Rule Name is required.';
            }
            if (!ruleForm.type.trim()) {
                errors.type = 'Rule Type is required.';
            }
            setFormErrors(errors);
            return Object.keys(errors).length === 0;
        };

    /**
     * @function handleSubmit
     * @description Handles form submission for adding or updating a rule.
     * @param {React.FormEvent} e - The form submission event.
     */
        // Handles form submission for adding or updating a rule.
    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!validateForm()) {
                return;
            }

            if (editingRule) {
                await updateRule({...editingRule, ...ruleForm});
            } else {
                await addRule(ruleForm);
            }
            setIsModalOpen(false);
        };

    // Define table columns
    const columns: TableColumn<Rule>[] = [
        {
            key: 'name',
            header: 'Rule Name',
            className: 'font-semibold',
        },
        {
            key: 'type',
            header: 'Type',
        },
        {
            key: 'action',
            header: 'Action',
            render: (row) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    row.action === 'Block' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                }`}>
          {row.action}
        </span>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
                <div className="space-x-2">
                    <Button variant="info" size="small" onClick={() => handleEditRuleClick(row)}>
                        Edit
                    </Button>
                    <Button variant="danger" size="small" onClick={() => handleDeleteRuleClick(row.id)}>
                        Delete
                    </Button>
                </div>
            ),
            className: 'w-px whitespace-nowrap', // Prevent actions column from wrapping
        },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-6">Rule Management</h2>

            <Card>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Security Rules</h3>
                {error && <p className="text-red-600 dark:text-red-400 mb-4">Error loading rules: {error}</p>}
                <Table<Rule>
                    columns={columns}
                    data={rules}
                    totalItems={totalRules}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(limit) => {
                        setItemsPerPage(limit);
                        setCurrentPage(1);
                    }}
                    isLoading={isLoading}
                    emptyMessage="No rules defined."
                />
                <div className="mt-6 flex justify-end">
                    <Button variant="success" onClick={handleAddRuleClick}>
                        Add Rule
                    </Button>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                   title={editingRule ? 'Edit Rule' : 'Add New Rule'}>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Rule Name"
                        name="name"
                        value={ruleForm.name}
                        onChange={handleFormChange}
                        placeholder="e.g., PII Data Filter"
                        error={formErrors.name}
                        required
                    />
                    <Input
                        label="Rule Type"
                        name="type"
                        value={ruleForm.type}
                        onChange={handleFormChange}
                        placeholder="e.g., Keyword Check"
                        error={formErrors.type}
                        required
                    />
                    <div className="mb-4">
                        <label htmlFor="action"
                               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Action
                        </label>
                        <select
                            id="action"
                            name="action"
                            value={ruleForm.action}
                            onChange={handleFormChange}
                            className="block w-full px-3 py-2 border rounded-md shadow-sm bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="Block">Block</option>
                            <option value="Mask">Mask</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" loading={isLoading}>
                            {editingRule ? 'Save Changes' : 'Add Rule'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default RuleManagement;