import fs from 'fs';
import path from 'path';
import uploadConfig from 'config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiscStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    // Move um arquivo de uma pasta para outra
    await fs.promises.rename(
      path.resolve(uploadConfig.directory, file),
      // Movendo o arquivo para a pasta updaloads
      path.resolve(uploadConfig.uploadsFolder, file),
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);
    try {
      // Informações sobre o arquivo
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    // Deletando o arquivo
    await fs.promises.unlink(filePath);
  }
}

export default DiscStorageProvider;
