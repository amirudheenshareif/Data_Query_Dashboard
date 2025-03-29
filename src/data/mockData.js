// sales
export function generateMonthlySalesData() {
    return Array.from({ length: 30 }, (_, i) => ({
        name: `Day ${i + 1}`,
        value: Math.floor(Math.random() * 1000) + 100,
        chartType: "bar",
    }));
}

// revenue
export function generateRevenueTrendData() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((month, i) => ({
        name: month,
        value: Math.floor(Math.random() * 2000) + 500,
        chartType: "line",
    }));
}

// customer acquisition numbers
export function generateCustomerAcquisitionData() {
    const segments = ["New Customers", "Returning Customers", "VIP Customers", "Loyalty Members", "Guest Users", "Subscribers"];
    return segments.map(segment => ({
        name: segment,
        value: Math.floor(Math.random() * 300) + 50,
        chartType: "bar",
    }));
}

// product category sales 
export function generateProductCategoryData() {
    const categories = ['Electronics', 'Clothing', 'Groceries', 'Toys', 'Books'];
    return categories.map(category => ({
        name: category,
        value: Math.floor(Math.random() * 500) + 50,
        chartType: "pie",
    }));
}

// campaign performance data
export function generateCampaignPerformanceData() {
    const campaigns = ['Campaign A', 'Campaign B', 'Campaign C', 'Campaign D'];
    return campaigns.map(campaign => ({
        name: campaign,
        value: Math.floor(Math.random() * 700) + 100,
        chartType: "pie",
    }));
}

export const keywordsMapping = {
    sales: generateMonthlySalesData,
    revenue: generateRevenueTrendData,
    acquisition: generateCustomerAcquisitionData,
    category: generateProductCategoryData,
    campaign: generateCampaignPerformanceData,
}