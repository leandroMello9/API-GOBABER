import {container} from 'tsyringe';
import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptServiceProvider from './HashProvider/implementations/BCryptProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptServiceProvider);
