export interface DataPoint {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

export interface SpendingData {
  week: DataPoint[];
  month: DataPoint[];
  year: DataPoint[];
}

export interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export class GraphDataService {
  private static instance: GraphDataService;
  
  private spendingData: SpendingData = {
    week: [
      { label: 'Mon', value: 930, color: '#3DB0C7' },
      { label: 'Tue', value: 450, color: '#3DB0C7' },
      { label: 'Wed', value: 800, color: '#3DB0C7' },
      { label: 'Thu', value: 1100, color: '#3DB0C7' },
      { label: 'Fri', value: 650, color: '#3DB0C7' },
      { label: 'Sat', value: 300, color: '#3DB0C7' },
      { label: 'Sun', value: 900, color: '#3DB0C7' },
    ],
    month: [
      { label: 'Week 1', value: 4200, color: '#3DB0C7' },
      { label: 'Week 2', value: 3800, color: '#3DB0C7' },
      { label: 'Week 3', value: 5100, color: '#3DB0C7' },
      { label: 'Week 4', value: 3600, color: '#3DB0C7' },
    ],
    year: [
      { label: 'Jan', value: 15800, color: '#3DB0C7' },
      { label: 'Feb', value: 14200, color: '#3DB0C7' },
      { label: 'Mar', value: 16800, color: '#3DB0C7' },
      { label: 'Apr', value: 13500, color: '#3DB0C7' },
      { label: 'May', value: 18900, color: '#3DB0C7' },
      { label: 'Jun', value: 16200, color: '#3DB0C7' },
      { label: 'Jul', value: 17500, color: '#3DB0C7' },
      { label: 'Aug', value: 14800, color: '#3DB0C7' },
      { label: 'Sep', value: 19300, color: '#3DB0C7' },
      { label: 'Oct', value: 16700, color: '#3DB0C7' },
      { label: 'Nov', value: 18100, color: '#3DB0C7' },
      { label: 'Dec', value: 20400, color: '#3DB0C7' },
    ],
  };

  private categoryData: CategoryData[] = [
    { category: 'Food & Dining', amount: 8500, percentage: 25, color: '#FF6B6B' },
    { category: 'Transportation', amount: 6800, percentage: 20, color: '#4ECDC4' },
    { category: 'Shopping', amount: 5100, percentage: 15, color: '#45B7D1' },
    { category: 'Entertainment', amount: 3400, percentage: 10, color: '#96CEB4' },
    { category: 'Utilities', amount: 2720, percentage: 8, color: '#FFEAA7' },
    { category: 'Healthcare', amount: 2040, percentage: 6, color: '#DDA0DD' },
    { category: 'Others', amount: 5440, percentage: 16, color: '#F8BBD9' },
  ];

  public static getInstance(): GraphDataService {
    if (!GraphDataService.instance) {
      GraphDataService.instance = new GraphDataService();
    }
    return GraphDataService.instance;
  }

  public getSpendingData(period: 'week' | 'month' | 'year'): DataPoint[] {
    return this.spendingData[period];
  }

  public getCategoryData(): CategoryData[] {
    return this.categoryData;
  }

  public getTotalSpending(period: 'week' | 'month' | 'year'): number {
    return this.spendingData[period].reduce((sum, item) => sum + item.value, 0);
  }

  public getAverageSpending(period: 'week' | 'month' | 'year'): number {
    const data = this.spendingData[period];
    return Math.round(this.getTotalSpending(period) / data.length);
  }

  public getMaxValue(period: 'week' | 'month' | 'year'): number {
    return Math.max(...this.spendingData[period].map(item => item.value));
  }

  public updateSpendingData(period: 'week' | 'month' | 'year', data: DataPoint[]): void {
    this.spendingData[period] = data;
  }

  public updateCategoryData(data: CategoryData[]): void {
    this.categoryData = data;
  }

  // Generate random data for demo purposes
  public generateRandomData(period: 'week' | 'month' | 'year'): DataPoint[] {
    const baseData = this.spendingData[period];
    return baseData.map(item => ({
      ...item,
      value: Math.floor(Math.random() * 2000) + 500, // Random value between 500-2500
    }));
  }
}

export default GraphDataService; 