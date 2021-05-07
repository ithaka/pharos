const historyColumns = ['Report Info', 'Type', 'Format', 'Date', ''];

const historyRows = [
  {
    info: ['Platform Usage', 'University of Mainz', '2020-09-01 – 2020-11-30'],
    type: 'PR_P1',
    format: 'JSON',
    date: '12/17/2020, 9:51:18 AM',
  },
  {
    info: ['Platform Usage', 'University of Mainz', '2020-09-01 – 2020-11-30'],
    type: 'PR_P1',
    format: 'JSON',
    date: '12/17/2020, 9:51:18 AM',
  },
  {
    info: ['Platform Usage', 'University of Mainz', '2020-09-01 – 2020-11-30'],
    type: 'PR_P1',
    format: 'JSON',
    date: '12/17/2020, 9:51:18 AM',
  },
];

export const historyTable = {
  columns: historyColumns,
  rows: historyRows,
};

const scheduledColumns = ['Schedule Info', 'Frequency', 'Format', 'Recipient'];

const scheduledRows = [
  {
    info: ['PR', 'Platform Master Report', 'University of Mainz'],
    frequency: ['Monthly', 'Previous month usage'],
    format: 'XLSX',
    recipient: 'human@ithaka.org',
  },
  {
    info: ['PR_P1', 'Platform Master Report', 'University of Mainz'],
    frequency: ['Monthly', 'Previous month usage'],
    format: 'TSV',
    recipient: 'human@ithaka.org',
  },
  {
    info: ['PR', 'Platform Master Report', 'University of Mainz'],
    frequency: ['Monthly', 'Previous month usage'],
    format: 'XLSX',
    recipient: 'human@ithaka.org',
  },
];

export const scheduledTable = {
  columns: scheduledColumns,
  rows: scheduledRows,
};
