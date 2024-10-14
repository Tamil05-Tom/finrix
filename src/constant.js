import { Wallet } from 'lucide-react';

export const statsData = [
  {
    icon: (
      <img src='./img/wallet.png' className='w-5 h-5' alt="Wallet icon" />
    ),
    percentage: "10.32%",
    label: "Payable",
    value: "$788.9K",
    illustration: './img/Cash Payment-bro.png'
  },
  {
    icon: (
      <img src='./img/add.png' className='w-5 h-5' alt="Add icon" />
    ),
    percentage: "25.17%",
    label: "Receivable",
    value: "$1.2M",
    illustration: './img/receivable-illustration.png'
  },
  {
    icon: (
      <img src='./img/loss.png' className='w-5 h-5' alt="Loss icon" />
    ),
    percentage: "5.75%",
    label: "Investments",
    value: "$430K",
    illustration: './img/Investment data-rafiki.png'
  },
  {
    icon: (
      <img src='./img/loss.png' className='w-5 h-5' alt="Loss icon" />
    ),
    percentage: "15.00%",
    label: "Expenses",
    value: "$920K",
    illustration: './img/Money stress-rafiki.png'
  }
];


export const graphData = {
  incomes: [
    { date: '01 Sep', value: 1000 },
    { date: '02 Sep', value: 1500 },
    { date: '03 Sep', value: 1200 },
    { date: '04 Sep', value: 1800 },
    { date: '05 Sep', value: 2000 },
    { date: '06 Sep', value: 1700 },
    { date: '07 Sep', value: 1900 },
  ],
  expenses: [
    { date: '01 Sep', value: 500 },
    { date: '02 Sep', value: 1200 },
    { date: '03 Sep', value: 825 },
    { date: '04 Sep', value: 1100 },
    { date: '05 Sep', value: 1400 },
    { date: '06 Sep', value: 1500 },
    { date: '07 Sep', value: 1300 },
  ],
  savings: [
    { date: '01 Sep', value: 200 },
    { date: '02 Sep', value: 300 },
    { date: '03 Sep', value: 250 },
    { date: '04 Sep', value: 400 },
    { date: '05 Sep', value: 350 },
    { date: '06 Sep', value: 500 },
    { date: '07 Sep', value: 450 },
  ],
  investment: [
    { date: '01 Sep', value: 300 },
    { date: '02 Sep', value: 400 },
    { date: '03 Sep', value: 350 },
    { date: '04 Sep', value: 500 },
    { date: '05 Sep', value: 600 },
    { date: '06 Sep', value: 550 },
    { date: '07 Sep', value: 700 },
  ],
}

export const tabData = {
  incomes: { color: '#4cd964', amount: '$130,543.43', change: '20.32%' },
  expenses: { color: '#5e72e4', amount: '$120,543.43', change: '20.32%' },
  savings: { color: '#5ac8fa', amount: '$25,543.43', change: '5.32%' },
  investment: { color: '#ffcc00', amount: '$75,543.43', change: '15.32%' },
}

export const piedata = [
  { month: 'MAR', profit: 250, loss: 50 },
  { month: 'APR', profit: 30, loss: 20 },
  { month: 'MAY', profit: 10, loss: 50 },
  { month: 'JUNE', profit: 50, loss: 45 },
  { month: 'JULY', profit: 50, loss: 30 },
  { month: 'AUG', profit: 100, loss: 10 },
  { month: 'SEP', profit: 50, loss: 30 },
]

export const piecircledata = [
  { name: 'Group A', value: 600 },
  { name: 'Group B', value: 300 },
  // { name: 'Group C', value: 300 },
  // { name: 'Group D', value: 200 },
];

export const alerts = [
  {
    title: 'Revenue Change Alert:',
    description: 'Significant decrease in revenue when compared to last two month figures.',
  },
  {
    title: 'Expense Variation:',
    description: 'Notable changes in expenses compared to budgeted amounts.',
  },
  {
    title: 'Inventory:',
    description: 'Inventory levels deviating from predefined thresholds.',
  },
  {
    title: 'Expense Variation:',
    description: 'Notable chants.',
  },
  {
    title: 'Inventory:',
    description: 'sample',
  },
]

export const summaryreport= [
  {
    title: 'Revenue',
    data: [
      { name: 'Total', deviation: '4.32%', thisMonth: '80.09', lastMonth: '80.09' },
      { name: 'Entity 1', deviation: '4.32%', thisMonth: '7.03', lastMonth: '7.03' },
      { name: 'Entity 2', deviation: '4.32%', thisMonth: '30.09', lastMonth: '30.09' },
      { name: 'Entity 3', deviation: '4.32%', thisMonth: '30.09', lastMonth: '30.09' },
    ],
    showExpand: true
  },
  {
    title: 'Expenses',
    data: [
      { name: 'Total', deviation: '1.32%', thisMonth: '80.09', lastMonth: '80.09' },
      { name: 'Entity 1', deviation: '4.32%', thisMonth: '7.03', lastMonth: '7.03' },
      { name: 'Entity 2', deviation: '2.32%', thisMonth: '30.09', lastMonth: '30.09' },
      { name: 'Entity 3', deviation: '4.32%', thisMonth: '30.09', lastMonth: '30.09' },
    ],
    showExpand: false
  },
  {
    title: 'Investments',
    data: [
      { name: 'Total', deviation: '2.32%', thisMonth: '80.09', lastMonth: '80.09' },
      { name: 'Entity 1', deviation: '4.32%', thisMonth: '7.03', lastMonth: '7.03' },
      { name: 'Entity 2', deviation: '1.32%', thisMonth: '30.09', lastMonth: '30.09' },
      { name: 'Entity 3', deviation: '4.32%', thisMonth: '30.09', lastMonth: '30.09' },
    ],
    showExpand: false
  },
  {
    title: 'Investments',
    data: [
      { name: 'Total', deviation: '4.32%', thisMonth: '80.09', lastMonth: '80.09' },
      { name: 'Entity 1', deviation: '4.32%', thisMonth: '7.03', lastMonth: '7.03' },
      { name: 'Entity 2', deviation: '4.32%', thisMonth: '30.09', lastMonth: '30.09' },
      { name: 'Entity 3', deviation: '4.32%', thisMonth: '30.09', lastMonth: '30.09' },
    ],
    showExpand: false
  },
];


 export const doughnutData = {
    labels: ['Entry 1', 'Entry 2', 'Entry 3','Entry 4'],
    datasets: [
      {
        data: [300, 50, 100,30],
        backgroundColor: ['#646be1', '#d9dcff', '#aee9c2','#ffe2c9'],
        hoverBackgroundColor: ['#646be1', '#d9dcff', '#aee9c2','#ffe2c9'],
      },
    ],
  };

export const doughnutoptions = {
    responsive: true,
    cutout: '50%',
    plugins: {
      legend: {
        display:false
      },
      title: {
        display: true,
        text: 'Doughnut Chart Example',
      },
      // cutout: '20%',
    },
  };

export const invoiceData = [
  { customer: "Customer...", invoiceNr: "10/10/2024", amount: "80.09", invoiceDate: "10/10/2024", aging: "60 days" },
  { customer: "Customer...", invoiceNr: "10/10/2024", amount: "80.09", invoiceDate: "10/10/2024", aging: "60 days" },
  { customer: "Customer...", invoiceNr: "10/10/2024", amount: "80.09", invoiceDate: "10/10/2024", aging: "60 days" },
  { customer: "Customer...", invoiceNr: "10/10/2024", amount: "80.09", invoiceDate: "10/10/2024", aging: "60 days" },
  { customer: "Customer...", invoiceNr: "10/10/2024", amount: "80.09", invoiceDate: "10/10/2024", aging: "60 days" },
];

  