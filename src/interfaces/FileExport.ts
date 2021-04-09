export interface FileExport {
  id: number;
  seller_id: number;
  supplier_id: number;
  file: string;
  path: string;
  report_path: string;
  report_path_filtered: string;
  export_status: string;
  report_url_filtered: string;
  udate: string;
  is_downloaded: boolean;
  export_progress?: string;
}
