import {container} from 'tsyringe'
import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiscStorageProvider from './StorageProvider/implemantations/DiscStorageProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiscStorageProvider)