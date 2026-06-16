import fs from 'fs';
import path from 'path';

export function loadSiteJson<T>(filename: string): T {
  const filePath = path.join(process.cwd(), 'data', 'site', filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}
