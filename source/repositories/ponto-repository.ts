import { Collection, Db } from "mongodb";

export class PontoRepository {

    public readonly collectionName = "ponto";
    public readonly _collection: Collection;

    constructor(db: Db, collectionName: string) {
        this._collection = db.collection(collectionName);
    }
}