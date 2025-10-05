// Custom Gantt Chart Application - Fixed Version
class GanttChartApp {
    constructor() {
        this.currentTasks = [];
        this.currentViewMode = 'weekly';
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

        // Initialize custom Gantt chart
        setTimeout(() => this.renderCustomGantt(), 100);
    }

    renderCustomGantt() {
        try {
            const container = document.getElementById('ganttTimeline');
            if (!container) {
                this.showMessage('Gantt container not found', 'error');
                return;
            }

            // Clear existing content
            container.innerHTML = '';

            // Create header
            const header = this.createGanttHeader();
            container.appendChild(header);

            // Create task rows
            this.currentTasks.forEach(task => {
                const row = this.createTaskRow(task);
                container.appendChild(row);
            });

            this.showMessage('Gantt chart loaded successfully!', 'success');

        } catch (error) {
            console.error('Error rendering Gantt chart:', error);
            this.showMessage('Error loading Gantt chart. Chart created with custom implementation.', 'error');
        }
    }

    createGanttHeader() {
        const header = document.createElement('div');
        header.className = 'gantt-header';

        const taskLabelHeader = document.createElement('div');
        taskLabelHeader.className = 'gantt-task-label';
        taskLabelHeader.textContent = 'Task Name';

        const timelineHeader = document.createElement('div');
        timelineHeader.className = 'gantt-timeline-header';

        // Create timeline columns based on view mode
        const dates = this.getTimelineDates();
        dates.forEach(date => {
            const dateCol = document.createElement('div');
            dateCol.style.flex = '1';
            dateCol.style.textAlign = 'center';
            dateCol.style.fontWeight = '600';
            dateCol.style.fontSize = '12px';
            dateCol.textContent = this.formatDateForHeader(date);
            timelineHeader.appendChild(dateCol);
        });

        header.appendChild(taskLabelHeader);
        header.appendChild(timelineHeader);

        return header;
    }

    createTaskRow(task) {
        const row = document.createElement('div');
        row.className = 'gantt-row';
        row.dataset.taskId = task.id;

        // Task name cell
        const nameCell = document.createElement('div');
        nameCell.className = 'task-name';
        nameCell.textContent = task.name;
        nameCell.title = `${task.category} | ${task.progress}% complete`;
        nameCell.addEventListener('click', () => this.editTask(task.id));

        // Timeline cell
        const timelineCell = document.createElement('div');
        timelineCell.className = 'task-timeline';

        // Create task bar
        const taskBar = this.createTaskBar(task);
        timelineCell.appendChild(taskBar);

        row.appendChild(nameCell);
        row.appendChild(timelineCell);

        return row;
    }

    createTaskBar(task) {
        const startDate = new Date(task.start);
        const endDate = new Date(task.end);
        const projectStart = new Date('2025-09-01');
        const projectEnd = new Date('2025-11-30');

        // Calculate position and width as percentages
        const totalDays = (projectEnd - projectStart) / (1000 * 60 * 60 * 24);
        const taskStartDays = (startDate - projectStart) / (1000 * 60 * 60 * 24);
        const taskDuration = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

        const leftPercent = (taskStartDays / totalDays) * 100;
        const widthPercent = (taskDuration / totalDays) * 100;

        const taskBar = document.createElement('div');
        taskBar.className = 'task-bar';
        taskBar.style.backgroundColor = this.categoryColors[task.category] || '#95a5a6';
        taskBar.style.position = 'absolute';
        taskBar.style.left = `${leftPercent}%`;
        taskBar.style.width = `${widthPercent}%`;
        taskBar.title = `${task.name}\n${task.start} to ${task.end}\n${task.progress}% complete`;

        // Task name in bar
        const taskText = document.createElement('span');
        taskText.textContent = task.name.length > 20 ? task.name.substring(0, 20) + '...' : task.name;
        taskText.style.fontSize = '11px';
        taskText.style.fontWeight = '500';

        // Progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'task-progress';
        progressBar.style.width = `${task.progress}%`;

        // Progress text
        const progressText = document.createElement('span');
        progressText.className = 'progress-text';
        progressText.textContent = `${task.progress}%`;

        taskBar.appendChild(progressBar);
        taskBar.appendChild(taskText);
        taskBar.appendChild(progressText);

        // Make task bar clickable
        taskBar.addEventListener('click', (e) => {
            e.stopPropagation();
            this.editTask(task.id);
        });

        return taskBar;
    }

    getTimelineDates() {
        const dates = [];
        const start = new Date('2025-09-01');
        const end = new Date('2025-11-30');

        if (this.currentViewMode === 'daily') {
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 7)) {
                dates.push(new Date(d));
            }
        } else if (this.currentViewMode === 'weekly') {
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 7)) {
                dates.push(new Date(d));
            }
        } else { // monthly
            for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
                dates.push(new Date(d));
            }
        }

        return dates;
    }

    formatDateForHeader(date) {
        if (this.currentViewMode === 'monthly') {
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    }

    changeViewMode(mode) {
        this.currentViewMode = mode;
        this.updateViewModeButtons();
        this.renderCustomGantt();
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
                this.renderCustomGantt();
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
            this.renderCustomGantt();
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
        this.renderCustomGantt();
        this.showMessage('New task added successfully!', 'success');

        // Edit the new task immediately
        setTimeout(() => this.editTask(newId), 500);
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
    console.log('Initializing Gantt Chart Application...');
    try {
        window.ganttApp = new GanttChartApp();
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});
