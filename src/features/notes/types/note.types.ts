export type SyncStatus =
  | 'synced'
  | 'pending'
  | 'failed';

export interface Note {
  id: string;
  title: string;
  content?: string;
  created_at: number;
  updated_at: number;
  sync_status: SyncStatus;
  is_deleted: number;
}