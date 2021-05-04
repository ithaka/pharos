export interface HistoryTable {
  columns: string[];
  rows: HistoryRow[];
}

export interface HistoryRow {
  info: string[];
  type: string;
  format: string;
  date: string;
}

export interface ScheduledTable {
  columns: string[];
  rows: ScheduledRow[];
}

export interface ScheduledRow {
  info: string[];
  frequency: string[];
  format: string;
  recipient: string;
}
