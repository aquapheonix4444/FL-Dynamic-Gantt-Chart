// Gantt Chart Application - Main JavaScript File
class GanttChartApp {
    constructor() {
        this.gantt = null;
        this.currentTasks = [];
        this.currentViewMode = 'Week';
        this.editingTaskId = null;

        // Initial project data
        this.projectData = {
            title: "Federated Learning with Health IoT",
            setting: "Vertical FL and Cross-Silo Environment",
            credentials: {
                username: "SDLProject",
                password: "scrum"
            }
        };

        this.categoryColors = {
            "Analysis": "#3498db",
            "Documentation": "#e74c3c", 
            "Design": "#f39c12",
            "Presentation": "#9b59b6",
            "Development": "#2ecc71",
            "Testing": "#e67e22",
            "Integration": "#1abc9c",
            "Security": "#34495e"
        };

        this.initializeTasks();
        this.bindEvents();
        this.checkAuthState();
    }

    initializeTasks() {
        // Load tasks from localStorage or use default data
        const savedTasks = localStorage.getItem('gantt-tasks');
        if (savedTasks) {
            try {
                this.currentTasks = JSON.parse(savedTasks);
            } catch (error) {
                console.error('Error parsing saved tasks:', error);
                this.loadDefaultTasks();
            }
        } else {
            this.loadDefaultTasks();
        }
    }

    loadDefaultTasks() {
        this.currentTasks = [
            {
                id: "task1",
                name: "Requirement Analysis",
                start: "2025-09-01",
                end: "2025-09-07",
                progress: 0,
                category: "Analysis",
                month: "September",
                week: 1
            },
            {
                id: "task2", 
                name: "Feasibility Report",
                start: "2025-09-08",
                end: "2025-09-14",
                progress: 0,
                category: "Analysis",
                month: "September",
                week: 2
            },
            {
                id: "task3",
                name: "SRS Completion",
                start: "2025-09-15",
                end: "2025-09-21",
                progress: 0,
                category: "Documentation",
                month: "September",
                week: 3
            },
            {
                id: "task4",
                name: "Initial Architecture Design",
                start: "2025-09-22",
                end: "2025-09-28",
                progress: 0,
                category: "Design",
                month: "September",
                week: 4
            },
            {
                id: "task5",
                name: "Mid Semester Presentation",
                start: "2025-10-01",
                end: "2025-10-07",
                progress: 0,
                category: "Presentation",
                month: "October",
                week: 1
            },
            {
                id: "task6",
                name: "Prototype Development (Local FL setup)",
                start: "2025-10-08",
                end: "2025-10-14",
                progress: 0,
                category: "Development",
                month: "October",
                week: 2
            },
            {
                id: "task7",
                name: "Prototype Testing with Sample IoT Data",
                start: "2025-10-15",
                end: "2025-10-21",
                progress: 0,
                category: "Testing",
                month: "October",
                week: 3
            },
            {
                id: "task8",
                name: "Integration of Multiple Clients (Hospitals, Clinics, Labs, IoT Hubs)",
                start: "2025-10-22",
                end: "2025-10-28",
                progress: 0,
                category: "Integration",
                month: "October",
                week: 4
            },
            {
                id: "task9",
                name: "Secure Aggregation and Privacy Module Integration",
                start: "2025-11-01",
                end: "2025-11-07",
                progress: 0,
                category: "Security",
                month: "November",
                week: 1
            },
            {
                id: "task10",
                name: "Minimum Viable Product & System Testing",
                start: "2025-11-08",
                end: "2025-11-14",
                progress: 0,
                category: "Testing",
                month: "November",
                week: 2
            },
            {
                id: "task11",
                name: "Performance Evaluation + End Semester Presentation",
                start: "2025-11-15",
                end: "2025-11-21",
                progress: 0,
                category: "Presentation",
                month: "November",
                week: 3
            }
        ];

        // Save default tasks to localStorage
        this.saveTasks();
    }

    bindEvents() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // View mode buttons
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.changeViewMode(e.target.dataset.mode));
        });

        // Add task button
        const addTaskBtn = document.getElementById('addTaskBtn');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => this.addNewTask());
        }

        // Save progress button
        const saveProgressBtn = document.getElementById('saveProgressBtn');
        if (saveProgressBtn) {
            saveProgressBtn.addEventListener('click', () => this.saveProgress());
        }

        // Export button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }

        // Task form
        const taskForm = document.getElementById('taskForm');
        if (taskForm) {
            taskForm.addEventListener('submit', (e) => this.handleTaskSave(e));
        }

        // Delete task button
        const deleteTaskBtn = document.getElementById('deleteTaskBtn');
        if (deleteTaskBtn) {
            deleteTaskBtn.addEventListener('click', () => this.deleteTask());
        }
    }

    checkAuthState() {
        const isAuthenticated = sessionStorage.getItem('gantt-authenticated') === 'true';

        if (isAuthenticated) {
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    handleLogin(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorDiv = document.getElementById('loginError');
        const loginText = document.getElementById('loginText');
        const loginSpinner = document.getElementById('loginSpinner');

        // Show loading state
        loginText.classList.add('hidden');
        loginSpinner.classList.remove('hidden');

        // Simulate authentication delay for better UX
        setTimeout(() => {
            if (username === this.projectData.credentials.username && 
                password === this.projectData.credentials.password) {

                // Successful login
                sessionStorage.setItem('gantt-authenticated', 'true');
                sessionStorage.setItem('gantt-user', username);

                errorDiv.classList.add('hidden');
                this.showDashboard();
            } else {
                // Failed login
                errorDiv.textContent = 'Invalid credentials. Please try again.';
                errorDiv.classList.remove('hidden');

                // Clear password field
                document.getElementById('password').value = '';
            }

            // Reset loading state
            loginText.classList.remove('hidden');
            loginSpinner.classList.add('hidden');
        }, 1000);
    }

    handleLogout() {
        sessionStorage.removeItem('gantt-authenticated');
        sessionStorage.removeItem('gantt-user');
        this.showLogin();
    }

    showLogin() {
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('dashboard').classList.add('hidden');

        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('loginError').classList.add('hidden');
    }

    showDashboard() {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');

        // Initialize Gantt chart
        setTimeout(() => this.initializeGantt(), 100);
    }

    initializeGantt() {
        const ganttContainer = document.getElementById('gantt');

        if (!ganttContainer || !window.Gantt) {
            console.error('Gantt container or Frappe Gantt library not found');
            return;
        }

        try {
            // Prepare tasks for Frappe Gantt
            const ganttTasks = this.currentTasks.map(task => ({
                id: task.id,
                name: task.name,
                start: task.start,
                end: task.end,
                progress: task.progress,
                custom_class: task.category.toLowerCase()
            }));

            // Create Gantt chart
            this.gantt = new Gantt(ganttContainer, ganttTasks, {
                header_height: 50,
                column_width: 30,
                step: 24,
                view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
                bar_height: 20,
                bar_corner_radius: 3,
                arrow_curve: 5,
                padding: 18,
                view_mode: this.currentViewMode,
                date_format: 'YYYY-MM-DD',
                popup_trigger: 'click',
                custom_popup_html: (task) => {
                    const taskData = this.currentTasks.find(t => t.id === task.id);
                    return `
                        <div class="details-container">
                            <h5>${task.name}</h5>
                            <p><strong>Duration:</strong> ${task.start} to ${task.end}</p>
                            <p><strong>Progress:</strong> ${task.progress}%</p>
                            <p><strong>Category:</strong> ${taskData ? taskData.category : 'Unknown'}</p>
                            <button onclick="window.ganttApp.editTask('${task.id}')" class="btn btn--primary btn--sm">Edit Task</button>
                        </div>
                    `;
                },
                on_click: (task) => {
                    console.log('Task clicked:', task.name);
                },
                on_date_change: (task, start, end) => {
                    this.updateTaskDates(task.id, start, end);
                },
                on_progress_change: (task, progress) => {
                    this.updateTaskProgress(task.id, progress);
                },
                on_view_change: (mode) => {
                    this.currentViewMode = mode;
                    this.updateViewModeButtons();
                }
            });

            // Apply custom styling
            this.applyCustomStyling();

        } catch (error) {
            console.error('Error initializing Gantt chart:', error);
            this.showMessage('Error loading Gantt chart. Please refresh the page.', 'error');
        }
    }

    applyCustomStyling() {
        // Apply category-based colors to task bars
        setTimeout(() => {
            this.currentTasks.forEach(task => {
                const color = this.categoryColors[task.category] || '#95a5a6';
                const bars = document.querySelectorAll(`[data-id="${task.id}"] .bar`);
                bars.forEach(bar => {
                    bar.style.fill = color;
                });

                const progressBars = document.querySelectorAll(`[data-id="${task.id}"] .bar-progress`);
                progressBars.forEach(progressBar => {
                    progressBar.style.fill = this.darkenColor(color, 20);
                });
            });
        }, 500);
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    changeViewMode(mode) {
        this.currentViewMode = mode;
        if (this.gantt) {
            this.gantt.change_view_mode(mode);
        }
        this.updateViewModeButtons();
    }

    updateViewModeButtons() {
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === this.currentViewMode) {
                btn.classList.add('active');
            }
        });
    }

    updateTaskDates(taskId, start, end) {
        const task = this.currentTasks.find(t => t.id === taskId);
        if (task) {
            task.start = start.toISOString().split('T')[0];
            task.end = end.toISOString().split('T')[0];
            this.saveTasks();
            this.showMessage('Task dates updated successfully!', 'success');
        }
    }

    updateTaskProgress(taskId, progress) {
        const task = this.currentTasks.find(t => t.id === taskId);
        if (task) {
            task.progress = progress;
            this.saveTasks();
            this.showMessage(`Task progress updated to ${progress}%!`, 'success');
        }
    }

    editTask(taskId) {
        const task = this.currentTasks.find(t => t.id === taskId);
        if (!task) return;

        this.editingTaskId = taskId;

        // Populate form
        document.getElementById('taskName').value = task.name;
        document.getElementById('taskStart').value = task.start;
        document.getElementById('taskEnd').value = task.end;
        document.getElementById('taskProgress').value = task.progress;
        document.getElementById('taskCategory').value = task.category;

        // Show modal
        document.getElementById('taskModal').classList.remove('hidden');
    }

    handleTaskSave(e) {
        e.preventDefault();

        const name = document.getElementById('taskName').value.trim();
        const start = document.getElementById('taskStart').value;
        const end = document.getElementById('taskEnd').value;
        const progress = parseInt(document.getElementById('taskProgress').value);
        const category = document.getElementById('taskCategory').value;

        if (new Date(start) >= new Date(end)) {
            this.showMessage('End date must be after start date!', 'error');
            return;
        }

        if (this.editingTaskId) {
            // Update existing task
            const task = this.currentTasks.find(t => t.id === this.editingTaskId);
            if (task) {
                task.name = name;
                task.start = start;
                task.end = end;
                task.progress = progress;
                task.category = category;

                this.saveTasks();
                this.refreshGantt();
                this.showMessage('Task updated successfully!', 'success');
            }
        }

        this.closeTaskModal();
    }

    deleteTask() {
        if (!this.editingTaskId) return;

        if (confirm('Are you sure you want to delete this task?')) {
            this.currentTasks = this.currentTasks.filter(t => t.id !== this.editingTaskId);
            this.saveTasks();
            this.refreshGantt();
            this.showMessage('Task deleted successfully!', 'success');
            this.closeTaskModal();
        }
    }

    addNewTask() {
        // Generate new task ID
        const maxId = Math.max(...this.currentTasks.map(t => parseInt(t.id.replace('task', ''))));
        const newId = `task${maxId + 1}`;

        // Calculate next available date
        const lastTask = this.currentTasks[this.currentTasks.length - 1];
        const startDate = new Date(lastTask.end);
        startDate.setDate(startDate.getDate() + 1);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);

        const newTask = {
            id: newId,
            name: "New Task",
            start: startDate.toISOString().split('T')[0],
            end: endDate.toISOString().split('T')[0],
            progress: 0,
            category: "Development",
            month: "Extended",
            week: this.currentTasks.length + 1
        };

        this.currentTasks.push(newTask);
        this.saveTasks();
        this.refreshGantt();
        this.showMessage('New task added successfully!', 'success');

        // Edit the new task immediately
        setTimeout(() => this.editTask(newId), 500);
    }

    refreshGantt() {
        if (this.gantt) {
            // Re-initialize the Gantt chart with updated data
            this.initializeGantt();
        }
    }

    closeTaskModal() {
        document.getElementById('taskModal').classList.add('hidden');
        this.editingTaskId = null;
    }

    saveTasks() {
        localStorage.setItem('gantt-tasks', JSON.stringify(this.currentTasks));
    }

    saveProgress() {
        this.saveTasks();
        this.showMessage('Progress saved successfully!', 'success');
    }

    exportData() {
        const dataStr = JSON.stringify({
            project: this.projectData.title,
            setting: this.projectData.setting,
            tasks: this.currentTasks,
            exportDate: new Date().toISOString()
        }, null, 2);

        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'federated-learning-project-data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showMessage('Project data exported successfully!', 'success');
    }

    showMessage(message, type = 'info') {
        const container = document.getElementById('messageContainer');
        if (!container) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;

        container.appendChild(messageDiv);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 3000);
    }
}

// Global functions for popup actions
window.closeTaskModal = function() {
    document.getElementById('taskModal').classList.add('hidden');
    if (window.ganttApp) {
        window.ganttApp.editingTaskId = null;
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.ganttApp = new GanttChartApp();
});