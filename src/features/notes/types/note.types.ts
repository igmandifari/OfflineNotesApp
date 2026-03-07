export type SyncStatus = 'pending' | 'synced' | 'failed';
export interface Note {
    id: string;
    title: string;
    content?: string;
    created_at: number;
    updated_at: number;
    is_deleted: number;
    sync_status: SyncStatus;
  }