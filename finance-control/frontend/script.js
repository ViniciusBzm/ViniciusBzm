// API Base URL - Change this to your backend URL
const API_URL = 'http://localhost:3000';

// State management
let transactions = [];
let editingId = null;

// DOM Elements
const form = document.getElementById('transaction-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const cancelBtn = document.getElementById('cancel-btn');
const tbody = document.getElementById('transactions-tbody');
const noTransactions = document.getElementById('no-transactions');
const loadingOverlay = document.getElementById('loading-overlay');
const toast = document.getElementById('toast');

// Form input elements
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    form.addEventListener('submit', handleSubmit);
    cancelBtn.addEventListener('click', resetForm);
}

// API Functions
async function fetchTransactions() {
    showLoading();
    try {
        const response = await fetch(`${API_URL}/transactions`);
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = await response.json();
        return data;
    } catch (error) {
        showToast('Erro ao carregar transações', 'error');
        console.error(error);
        return [];
    } finally {
        hideLoading();
    }
}

async function createTransaction(transaction) {
    showLoading();
    try {
        const response = await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction)
        });
        if (!response.ok) throw new Error('Failed to create transaction');
        return await response.json();
    } catch (error) {
        showToast('Erro ao criar transação', 'error');
        console.error(error);
        throw error;
    } finally {
        hideLoading();
    }
}

async function updateTransaction(id, transaction) {
    showLoading();
    try {
        const response = await fetch(`${API_URL}/transactions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction)
        });
        if (!response.ok) throw new Error('Failed to update transaction');
        return await response.json();
    } catch (error) {
        showToast('Erro ao atualizar transação', 'error');
        console.error(error);
        throw error;
    } finally {
        hideLoading();
    }
}

async function deleteTransaction(id) {
    // Confirmation dialog
    if (!confirm('Tem certeza que deseja excluir esta transação?')) {
        return;
    }

    showLoading();
    try {
        const response = await fetch(`${API_URL}/transactions/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete transaction');
        showToast('Transação excluída com sucesso!', 'success');
        await loadTransactions();
    } catch (error) {
        showToast('Erro ao excluir transação', 'error');
        console.error(error);
    } finally {
        hideLoading();
    }
}

// Load and display transactions
async function loadTransactions() {
    transactions = await fetchTransactions();
    renderTransactions();
    updateSummary();
}

// Render transactions in table
function renderTransactions() {
    tbody.innerHTML = '';

    if (transactions.length === 0) {
        noTransactions.style.display = 'block';
        document.querySelector('table').style.display = 'none';
        return;
    }

    noTransactions.style.display = 'none';
    document.querySelector('table').style.display = 'table';

    transactions.forEach(transaction => {
        const row = createTransactionRow(transaction);
        tbody.appendChild(row);
    });
}

// Create table row for transaction
function createTransactionRow(transaction) {
    const tr = document.createElement('tr');

    const typeText = transaction.type === 'income' ? 'Receita' : 'Despesa';
    const typeBadgeClass = transaction.type === 'income' ? 'type-income' : 'type-expense';
    const amountClass = transaction.type === 'income' ? 'amount-income' : 'amount-expense';
    const amountSign = transaction.type === 'income' ? '+' : '-';

    const date = new Date(transaction.createdAt);
    const formattedDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    tr.innerHTML = `
        <td>${transaction.title}</td>
        <td>${transaction.category}</td>
        <td><span class="type-badge ${typeBadgeClass}">${typeText}</span></td>
        <td class="${amountClass}">${amountSign} R$ ${formatCurrency(transaction.amount)}</td>
        <td>${formattedDate}</td>
        <td>
            <div class="actions">
                <button class="btn btn-edit" onclick="editTransaction(${transaction.id})">✏️ Editar</button>
                <button class="btn btn-delete" onclick="deleteTransaction(${transaction.id})">🗑️ Excluir</button>
            </div>
        </td>
    `;

    return tr;
}

// Update summary cards
function updateSummary() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    document.getElementById('total-income').textContent = `R$ ${formatCurrency(income)}`;
    document.getElementById('total-expense').textContent = `R$ ${formatCurrency(expense)}`;
    document.getElementById('total-balance').textContent = `R$ ${formatCurrency(balance)}`;
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();

    const transaction = {
        title: titleInput.value.trim(),
        amount: parseFloat(amountInput.value),
        type: typeInput.value,
        category: categoryInput.value.trim()
    };

    try {
        if (editingId) {
            // Update existing transaction
            await updateTransaction(editingId, transaction);
            showToast('Transação atualizada com sucesso!', 'success');
        } else {
            // Create new transaction
            await createTransaction(transaction);
            showToast('Transação adicionada com sucesso!', 'success');
        }
        
        resetForm();
        await loadTransactions();
    } catch (error) {
        // Error already handled in API functions
    }
}

// Edit transaction
function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    editingId = id;
    titleInput.value = transaction.title;
    amountInput.value = transaction.amount;
    typeInput.value = transaction.type;
    categoryInput.value = transaction.category;

    formTitle.textContent = '✏️ Editar Transação';
    submitText.textContent = 'Atualizar';
    cancelBtn.style.display = 'inline-block';

    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
}

// Reset form to initial state
function resetForm() {
    form.reset();
    editingId = null;
    formTitle.textContent = '➕ Adicionar Transação';
    submitText.textContent = 'Adicionar';
    cancelBtn.style.display = 'none';
}

// Utility functions
function formatCurrency(value) {
    return value.toFixed(2).replace('.', ',');
}

function showLoading() {
    loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    loadingOverlay.style.display = 'none';
}

function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Make functions globally available for inline onclick handlers
window.editTransaction = editTransaction;
window.deleteTransaction = deleteTransaction;
