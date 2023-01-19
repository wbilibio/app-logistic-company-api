class StorageLocation {
  public id!: string;
  public name!: string;
  public stret?: string;
  public neighborhood?: string;
  public city?: string;
  public state?: string;
  public zipcode?: string;
  public number?: string;
  public lat?: string;
  public lng?: string;
  public limit_stock?: number;
  public current_stock?: number;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at?: Date;
}

export class ListStorageLocationOutput {
  public list!: StorageLocation[];
  public count!: number;
}
