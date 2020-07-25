import IStorageProvider from "../models/IStorageProvider";


class FakeStoreProvider implements IStorageProvider {
    private storage: string[] = []
    public async saveFile(file: string): Promise<string> {
        this.storage.push(file);
        return file;

    }
    public async deleteFile(file: string): Promise<void> {
        const findIndex = this.storage.findIndex(storage => storage === file);
        this.storage.splice(findIndex, 1);
        return;
    }
}

export default FakeStoreProvider