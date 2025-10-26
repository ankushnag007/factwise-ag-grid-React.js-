export async function getEmployeePerformanceData(delay = 100) {
    return new Promise((resolve) => setTimeout(() => resolve(generateEmployeePerformanceData()), delay));
}

function generateEmployeePerformanceData() {
    return [
        { 
            period: 'Q1 2024', 
            engineering: 4.5, 
            marketing: 4.2, 
            sales: 4.1, 
            hr: 4.3, 
            finance: 4.4,
            projectsCompleted: 245,
            trainingHours: 320,
            employeeSatisfaction: 8.7
        },
        { 
            period: 'Q2 2024', 
            engineering: 4.6, 
            marketing: 4.3, 
            sales: 4.4, 
            hr: 4.5, 
            finance: 4.5,
            projectsCompleted: 268,
            trainingHours: 345,
            employeeSatisfaction: 8.9
        },
        { 
            period: 'Q3 2024', 
            engineering: 4.7, 
            marketing: 4.5, 
            sales: 4.6, 
            hr: 4.6, 
            finance: 4.6,
            projectsCompleted: 289,
            trainingHours: 378,
            employeeSatisfaction: 9.1
        },
        { 
            period: 'Q4 2024', 
            engineering: 4.8, 
            marketing: 4.6, 
            sales: 4.7, 
            hr: 4.7, 
            finance: 4.7,
            projectsCompleted: 312,
            trainingHours: 395,
            employeeSatisfaction: 9.3
        },
        // Q1 2025 Data
        { 
            period: 'Q1 2025', 
            engineering: 4.9, 
            marketing: 4.7, 
            sales: 4.8, 
            hr: 4.8, 
            finance: 4.8,
            projectsCompleted: 278,
            trainingHours: 365,
            employeeSatisfaction: 9.2
        },
        { 
            period: 'Q2 2025', 
            engineering: 4.8, 
            marketing: 4.8, 
            sales: 4.9, 
            hr: 4.9, 
            finance: 4.9,
            projectsCompleted: 295,
            trainingHours: 388,
            employeeSatisfaction: 9.4
        },
        { 
            period: 'Q3 2025', 
            engineering: 4.9, 
            marketing: 4.9, 
            sales: 4.8, 
            hr: 4.9, 
            finance: 4.9,
            projectsCompleted: 325,
            trainingHours: 412,
            employeeSatisfaction: 9.5
        },
        { 
            period: 'Q4 2025', 
            engineering: 5.0, 
            marketing: 4.9, 
            sales: 5.0, 
            hr: 5.0, 
            finance: 5.0,
            projectsCompleted: 348,
            trainingHours: 430,
            employeeSatisfaction: 9.6
        },
        // Historical Data for Trend Analysis
        { 
            period: 'Q1 2023', 
            engineering: 4.2, 
            marketing: 3.9, 
            sales: 3.8, 
            hr: 4.0, 
            finance: 4.1,
            projectsCompleted: 198,
            trainingHours: 285,
            employeeSatisfaction: 7.8
        },
        { 
            period: 'Q2 2023', 
            engineering: 4.3, 
            marketing: 4.0, 
            sales: 3.9, 
            hr: 4.1, 
            finance: 4.2,
            projectsCompleted: 215,
            trainingHours: 298,
            employeeSatisfaction: 8.1
        },
        { 
            period: 'Q3 2023', 
            engineering: 4.4, 
            marketing: 4.1, 
            sales: 4.0, 
            hr: 4.2, 
            finance: 4.3,
            projectsCompleted: 228,
            trainingHours: 305,
            employeeSatisfaction: 8.3
        },
        { 
            period: 'Q4 2023', 
            engineering: 4.4, 
            marketing: 4.1, 
            sales: 4.0, 
            hr: 4.3, 
            finance: 4.3,
            projectsCompleted: 236,
            trainingHours: 312,
            employeeSatisfaction: 8.5
        }
    ];
}

// Additional metrics data for different chart types
export async function getDepartmentMetricsData(delay = 100) {
    return new Promise((resolve) => setTimeout(() => resolve(generateDepartmentMetrics()), delay));
}

function generateDepartmentMetrics() {
    return [
        {
            department: 'Engineering',
            performance: 4.8,
            productivity: 92,
            satisfaction: 9.2,
            turnover: 8,
            headcount: 45,
            budgetUtilization: 88
        },
        {
            department: 'Marketing',
            performance: 4.6,
            productivity: 87,
            satisfaction: 8.9,
            turnover: 12,
            headcount: 28,
            budgetUtilization: 85
        },
        {
            department: 'Sales',
            performance: 4.7,
            productivity: 94,
            satisfaction: 9.1,
            turnover: 15,
            headcount: 35,
            budgetUtilization: 92
        },
        {
            department: 'HR',
            performance: 4.7,
            productivity: 89,
            satisfaction: 9.0,
            turnover: 6,
            headcount: 18,
            budgetUtilization: 83
        },
        {
            department: 'Finance',
            performance: 4.8,
            productivity: 91,
            satisfaction: 9.1,
            turnover: 5,
            headcount: 22,
            budgetUtilization: 90
        },
        {
            department: 'Operations',
            performance: 4.5,
            productivity: 85,
            satisfaction: 8.7,
            turnover: 10,
            headcount: 32,
            budgetUtilization: 87
        }
    ];
}

// Individual employee performance data
export async function getTopPerformersData(delay = 100) {
    return new Promise((resolve) => setTimeout(() => resolve(generateTopPerformers()), delay));
}

function generateTopPerformers() {
    return [
        {
            employee: 'John Smith',
            department: 'Engineering',
            performance: 4.9,
            projectsCompleted: 12,
            skills: ['JavaScript', 'React', 'Node.js'],
            tenure: '3 years',
            lastPromotion: '2024-06-15'
        },
        {
            employee: 'Emily Davis',
            department: 'Marketing',
            performance: 4.8,
            projectsCompleted: 8,
            skills: ['Digital Marketing', 'SEO', 'Analytics'],
            tenure: '2 years',
            lastPromotion: '2024-03-20'
        },
        {
            employee: 'Michael Brown',
            department: 'Sales',
            performance: 4.9,
            projectsCompleted: 15,
            skills: ['Sales Strategy', 'B2B Sales', 'CRM'],
            tenure: '4 years',
            lastPromotion: '2024-08-10'
        },
        {
            employee: 'Sarah Johnson',
            department: 'Engineering',
            performance: 4.8,
            projectsCompleted: 18,
            skills: ['Team Leadership', 'Architecture', 'Python'],
            tenure: '5 years',
            lastPromotion: '2024-01-15'
        },
        {
            employee: 'David Wilson',
            department: 'Finance',
            performance: 4.9,
            projectsCompleted: 25,
            skills: ['Financial Planning', 'Budget Management'],
            tenure: '6 years',
            lastPromotion: '2024-11-05'
        }
    ];
}